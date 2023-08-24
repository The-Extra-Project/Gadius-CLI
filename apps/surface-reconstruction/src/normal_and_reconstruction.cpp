// === Normal orientation includes ===
#include <CGAL/Simple_cartesian.h>
#include <CGAL/IO/read_las_points.h>
#include <CGAL/IO/write_ply_points.h>
#include <CGAL/jet_estimate_normals.h>
#include <CGAL/scanline_orient_normals.h>

// === Surface reconstruction includes ===
#include <CGAL/Shape_detection/Efficient_RANSAC.h>
#include <CGAL/structure_point_set.h>
#include <CGAL/Delaunay_triangulation_3.h>
#include <CGAL/Triangulation_vertex_base_with_info_3.h>
#include <CGAL/Advancing_front_surface_reconstruction.h>
#include <CGAL/IO/read_points.h>
#include <CGAL/disable_warnings.h>
#include <boost/lexical_cast.hpp>

// === Poisson
#include <CGAL/poisson_surface_reconstruction.h>
#include <CGAL/Surface_mesh.h>
#include <CGAL/Point_set_3.h>
#include <CGAL/Point_set_3/IO.h>
#include <CGAL/grid_simplify_point_set.h>
#include <CGAL/jet_smooth_point_set.h>

// === Structured surface recpresentation ===
#include <CGAL/IO/write_points.h>

// === Normal orientation typedef ===
using Kernel = CGAL::Simple_cartesian<double>;
using Point_3 = Kernel::Point_3;
using Vector_3 = Kernel::Vector_3;
using Point_with_info = std::tuple<Point_3, Vector_3, float, unsigned char>;
using Point_map = CGAL::Nth_of_tuple_property_map<0, Point_with_info>;
using Normal_map = CGAL::Nth_of_tuple_property_map<1, Point_with_info>;
using Scan_angle_map = CGAL::Nth_of_tuple_property_map<2, Point_with_info>;
using Scanline_id_map = CGAL::Nth_of_tuple_property_map<3, Point_with_info>;


// === Surface reconstruction typedef ===
typedef Kernel::Point_3  Point;
typedef std::pair<Point_3, Vector_3>         Point_with_normal;
typedef std::vector<Point_with_normal>                       Pwn_vector;
typedef std::vector<Point_with_info>                       Pwi_vector;
//typedef std::vector<Point_with_info> Pwn_vector;
//typedef CGAL::First_of_pair_property_map<Point_with_normal>  Point_map_sr;
//typedef CGAL::Second_of_pair_property_map<Point_with_normal> Normal_map_sr;


typedef CGAL::Shape_detection::Efficient_RANSAC_traits
<Kernel, Pwi_vector, Point_map, Normal_map>              RANSAC_Traits;
typedef CGAL::Shape_detection::Efficient_RANSAC<RANSAC_Traits>    Efficient_ransac;
typedef CGAL::Shape_detection::Plane<RANSAC_Traits>               Plane;
typedef CGAL::Point_set_with_structure<Kernel>               Structure;
// Advancing front types
typedef CGAL::Advancing_front_surface_reconstruction_vertex_base_3<Kernel> LVb;
typedef CGAL::Advancing_front_surface_reconstruction_cell_base_3<Kernel> LCb;
typedef CGAL::Triangulation_data_structure_3<LVb,LCb> Tds;
typedef CGAL::Delaunay_triangulation_3<Kernel,Tds> Triangulation_3;
typedef Triangulation_3::Vertex_handle Vertex_handle;

typedef std::array<std::size_t,3> Facet;

// Poisson
typedef CGAL::Point_set_3<Point_3, Vector_3> Point_set;


// === Surface reconstruction fun ===
struct On_the_fly_pair{
    const Pwn_vector& points;
    typedef std::pair<Point, std::size_t> result_type;

    On_the_fly_pair(const Pwn_vector& points) : points(points) {}

    result_type
    operator()(std::size_t i) const
    {
	//return result_type(std::get<0>(points[i]),i);
	return result_type(points[i].first,i);
    }
};
template <typename Structure>
struct Priority_with_structure_coherence {

    Structure& structure;
    double bound;

    Priority_with_structure_coherence(Structure& structure,
				      double bound)
	: structure (structure), bound (bound)
    {}

    template <typename AdvancingFront, typename Cell_handle>
    double operator() (AdvancingFront& adv, Cell_handle& c,
		       const int& index) const
    {
	// If perimeter > bound, return infinity so that facet is not used
	if (bound != 0)
	    {
		double d  = 0;
		d = sqrt(squared_distance(c->vertex((index+1)%4)->point(),
					  c->vertex((index+2)%4)->point()));
		if(d>bound) return adv.infinity();
		d += sqrt(squared_distance(c->vertex((index+2)%4)->point(),
					   c->vertex((index+3)%4)->point()));
		if(d>bound) return adv.infinity();
		d += sqrt(squared_distance(c->vertex((index+1)%4)->point(),
					   c->vertex((index+3)%4)->point()));
		if(d>bound) return adv.infinity();
	    }

	Facet f = {{ c->vertex ((index + 1) % 4)->info (),
		c->vertex ((index + 2) % 4)->info (),
		c->vertex ((index + 3) % 4)->info () }};

	// facet_coherence takes values between -1 and 3, 3 being the most
	// coherent and -1 being incoherent. Smaller weight means higher
	// priority.
	double weight = 100. * (5 - structure.facet_coherence (f));

	return weight * adv.smallest_radius_delaunay_sphere (c, index);
    }

};

typedef CGAL::Advancing_front_surface_reconstruction
<Triangulation_3,
 Priority_with_structure_coherence<Structure> >
Reconstruction;

// === Normal orientation fun ===
void dump (const char* filename, const std::vector<Point_with_info>& points)
{
    std::ofstream ofile (filename, std::ios::binary);
    CGAL::IO::set_binary_mode(ofile);
    CGAL::IO::write_PLY
	(ofile, points,
	 CGAL::parameters::point_map (Point_map()).
	 normal_map (Normal_map()));
}


// === Main ===
int main (int argc, char** argv)
{
    std::string fname (argc > 1 ? argv[1] : "data/urban.las");
    std::vector<Point_with_info> points;
    std::cerr << "Reading input file " << fname << std::endl;
    std::ifstream ifile (fname, std::ios::binary);
    if (!ifile ||
	!CGAL::IO::read_LAS_with_properties
	(ifile, std::back_inserter (points),
	 CGAL::IO::make_las_point_reader (Point_map()),
	 std::make_pair (Scan_angle_map(),
			 CGAL::IO::LAS_property::Scan_angle()),
	 std::make_pair (Scanline_id_map(),
			 CGAL::IO::LAS_property::Scan_direction_flag())))
	{
	    std::cerr << "Can't read " << fname << std::endl;
	    return EXIT_FAILURE;
	}


    // ==== Normal orientation  =====
    std::cerr << "Estimating normals" << std::endl;
    CGAL::jet_estimate_normals<CGAL::Parallel_if_available_tag>
	(points, 12,
	 CGAL::parameters::point_map (Point_map()).
	 normal_map (Normal_map()));
    std::cerr << "Orienting normals using scan angle and direction flag" << std::endl;
    CGAL::scanline_orient_normals
    (points,
     CGAL::parameters::point_map (Point_map()).
     normal_map (Normal_map()).
     scan_angle_map (Scan_angle_map()).
     scanline_id_map (Scanline_id_map()));


    // ==== Surface reconstruction ====
    Efficient_ransac ransac;
    ransac.set_input(points);
    ransac.add_shape_factory<Plane>(); // Only planes are useful for stucturing

    // Default RANSAC parameters
    Efficient_ransac::Parameters op;
    op.probability = 0.05;
    op.min_points = 10;
    op.epsilon =  0.002;
    op.cluster_epsilon = 0.02;
    op.normal_threshold = 0.05;

    ransac.detect(op); // Plane detection

    Efficient_ransac::Plane_range planes = ransac.planes();
    Pwn_vector structured_pts;

    int reconstruction_choice
      = argc==1? 0 : (argc < 3 ? 0 : atoi(argv[2]));
    
    if(reconstruction_choice == 1){
	std::cerr << "done\nPoint set structuring... ";


	Structure pss (points,
		       planes,
		       op.cluster_epsilon,  // Same parameter as RANSAC
		       CGAL::parameters::point_map (Point_map()).
		       normal_map (Normal_map()).
		       plane_map (CGAL::Shape_detection::Plane_map<RANSAC_Traits>()).
		       plane_index_map(CGAL::Shape_detection::Point_to_shape_index_map<RANSAC_Traits>(points, planes)));


	for (std::size_t i = 0; i < pss.size(); ++ i)
	    structured_pts.push_back (pss[i]);

	std::cerr << "done\nAdvancing front... ";

	std::vector<std::size_t> point_indices(boost::counting_iterator<std::size_t>(0),
					       boost::counting_iterator<std::size_t>(structured_pts.size()));

	Triangulation_3 dt (boost::make_transform_iterator(point_indices.begin(), On_the_fly_pair(structured_pts)),
			    boost::make_transform_iterator(point_indices.end(), On_the_fly_pair(structured_pts)));


	Priority_with_structure_coherence<Structure> priority (pss,
							       1000. * op.cluster_epsilon); // Avoid too large facets
	Reconstruction R(dt, priority);
	R.run ();

	std::cerr << "done\nWriting result... ";

	std::vector<Facet> output;
	const Reconstruction::TDS_2& tds = R.triangulation_data_structure_2();

	for(Reconstruction::TDS_2::Face_iterator fit = tds.faces_begin(); fit != tds.faces_end(); ++fit)
	    if(fit->is_on_surface())
		output.push_back (CGAL::make_array(fit->vertex(0)->vertex_3()->id(),
						   fit->vertex(1)->vertex_3()->id(),
						   fit->vertex(2)->vertex_3()->id()));

	std::cout << "dumping result..." << std::endl;
	std::ofstream f ("out_advancing.off");
	f << "OFF\n" << structured_pts.size () << " " << output.size() << " 0\n"; // Header
	for (std::size_t i = 0; i < structured_pts.size (); ++ i)
	    f << structured_pts[i].first << std::endl;
	for (std::size_t i = 0; i < output.size (); ++ i)
	    f << "3 "
	      << output[i][0] << " "
	      << output[i][1] << " "
	      << output[i][2] << std::endl;
	std::cerr << "all done\n" << std::endl;

	f.close();
    }else if(reconstruction_choice == 0){
      std::cerr << "Starting surface reconstruction" << std::endl;
	Point_set pts_set;
	pts_set.add_normal_map();
	for(auto p : points){
	  auto pp = std::get<0>(p);
	  Point_set::iterator new_item = pts_set.insert(pp);
	  pts_set.normal(*new_item) = std::get<1>(p);

	}
        double spacing = CGAL::compute_average_spacing<CGAL::Sequential_tag> (pts_set, 1.0);
	CGAL::Surface_mesh<Point_3> output_mesh;
	CGAL::poisson_surface_reconstruction_delaunay
	  (pts_set.begin(), pts_set.end(),
	   pts_set.point_map(), pts_set.normal_map(),
	   output_mesh, spacing);
	std::cout << "poisson ok" << std::endl;
	std::ofstream f ("out_poisson.ply", std::ios_base::binary);
	// CGAL::IO::set_binary_mode (f);
	CGAL::IO::write_PLY(f, output_mesh);
	f.close ();

    }
  
    return EXIT_SUCCESS;
}