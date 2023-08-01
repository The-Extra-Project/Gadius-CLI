"""georender package script."""
import argparse
import geopandas as gpd
import json
from shapely.geometry import Polygon, Point
from shapely.ops import transform
from utils.web3Storage import API
import os
import requests
from subprocess import run
import logging

from pathlib import Path

## for standardization of the coordinates (https://pyproj4.github.io/pyproj/stable/examples.html)
from pyproj import Transformer, Proj
from functools import partial



from dotenv import load_dotenv
from subprocess import check_call
import shutil
from osgeo import gdal

## for handling the SHP files that are streamed / downloaded
gdal.SetConfigOption('SHAPE_RESTORE_SHX', 'YES')

load_dotenv()

## api to access the w3 storage.
w3 = API(os.getenv("W3_API_KEY"))


def fetch_shp_file(ipfs_cid, _filename, username) -> str:
    """
    gets the file that needs to be used for the rendering the resulting surface reconstruction of the given portion
    
    params:
    
    :ipfs_cid: is the CID hash where the file is stored on IPFS
    :_filename: is the name of the file to be downloaded (with the extension)
    :username: is for storing the file corresponding to the given user
    """
    
    # create a directory for the user for the first time (to be done eventually )
    path_datas = os.path.join(os.getcwd() + "/datas")
    userdir = (path_datas + "/" + username)

    ## check if the given userdir is created first time
    if os.path.isdir(userdir) == False:
        os.mkdir(path=userdir)
    os.chdir(userdir)    
    
    print("Running with ipfs_cid={}, filename={}".format( ipfs_cid,_filename ) )
    url = 'https://' + ipfs_cid + '.ipfs.w3s.link/' + _filename 
    out_file = run(['wget', '-U "Mozilla/5.0', url , '-O', _filename])
        
    print("output status" + str(out_file.returncode))
    if out_file.returncode!= 0:
        print("error in downloading the file")

    else:
        print("file downloaded in {}{}".format(os.getcwd() + '/' +"datas/",_filename))
    
    return (os.getcwd() + "/" +_filename)
  
 
#  def fetch_pipeline_template(ipfs_cid, _filename, username):
#      """
#      gets the template file corresponding to the given rendering job
     
     
#      """
 
 
 
def create_bounding_box(latitude_max: int, lattitude_min: int, longitude_max: int, longitude_min: int):
    """
    Create a bounding box from 4 coordinates
    """
    return Polygon([(longitude_min, lattitude_min), (longitude_max, lattitude_min), (longitude_max, latitude_max), (longitude_min, latitude_max), (longitude_min, lattitude_min)])




def get_tile_details_polygon(pointargs: list(str), ipfs_cid: str, username: str, filename: str, epsg_standard: list(str) = ['EPSG:4326', 'EPSG:2154']):
    """
    utility function for generating the tile standard based on the specific boundation defined by the user on the given shp file
    :pointargs: list of inputs in the format (lattitude_max, lattitude_min, longitude_max, longitude_min)
    :ipfs_cid: cid of the corresponding shp file to be presented.
    :username: identifier for the given shp file that is storing the file.
    
    :epsg_standard: defines the coordinate standards for which the given given coordinate values are to be transformed
        - by default the coordinates will be taken for french standard, but can be defined based on specific regions standard.
    Returns:
    
    laz file url which is to be downloaded
    fname: corresponding file that is to be downloaded
    dirname: resulting access path to the directory in the given container envionment
    """
    print( "Running tiling with the parameters lat_max={}, lat_min={}, long_max={}, long_min={}, for the user={}".format( pointargs[0], pointargs[1], pointargs[2], pointargs[3], username))

    # this is the docker path of file, will be changed to the w3storagea
    print("reading the shp file")
    
    path = fetch_shp_file(ipfs_cid, filename, username)
    data = gpd.read_file(path)
    
    
    polygonRegion = create_bounding_box(pointargs[0], pointargs[1], pointargs[2], pointargs[3])

    # transformer = Transformer.from_crs( epsg_standard )
    # coordX, coordY = transformer.transform( coordX, coordY )

    projection = partial(
        transform, Proj(epsg_standard[0]), Proj(epsg_standard[1])
    )
    
    polygonTransform = transform(projection)
    
    out = data.intersects(polygonTransform)
    res = data.loc[out]
   
    laz_path = res["url_telech"].to_numpy()[0]
    dirname = res["nom_pkk"].to_numpy()[0]
   
    fname = dirname + ".7z"

    print("returning the cooridnates of given polygon boundation{}:{}{}{}".append(pointargs,laz_path, dirname,dirname))

    return laz_path, fname, dirname


def get_tile_details_point(coordX, coordY,username, filename, ipfsCid, epsg_standards: list(str) = ['EPSG:4326', 'EPSG:2154'] ):
    """
    utility function to get the tile information for the given boundation
    :coordX: X coordinate of the given region
    :coordY: Y coordinate of the given region
    :username: username of the user profile
    :ipfsCid: reference of the CID file that is already stored in the IPFS network.
    :filename: name of the given input
    :epsg_standards: coordinate standard defined as [input cooridnate standard to destination]
        - normally set for the input as EPSG:4326 (WGS) and destination as EPSG:2154 (french standard).
    """
    print( "Running with X={}, Y={}".format( coordX, coordY ) )

    ## function  to download file from ipfs to given path in the docker.
    fp = fetch_shp_file(ipfs_cid=ipfsCid, _filename= filename, username= username)
    
    data = gpd.read_file(fp)

    # todo : how to avoid rewriting too much code between bounding box mode and center mode ?
    # todo : Document input format and pyproj conversion
    # see link 1 ( to epsg codes ), link 2 ( to pyproj doc )
    transformer = Transformer.from_crs( epsg_standards[0], epsg_standards[1] )
    
    coordX, coordY = transformer.transform( coordX, coordY )

    center = Point( float(coordX), float(coordY) )

    out = data.intersects(center)
    res = data.loc[out]
    laz_path = res["url_telech"].to_numpy()[0]
    dirname = res["nom_pkk"].to_numpy()[0]
    fname = dirname + ".7z"

    print("returning the details of corresponding coorindate{},{}:{}{}{}".append(coordX,coordY,laz_path, dirname,dirname))
    
    return laz_path, fname, dirname



def generate_pdal_pipeline( dirname: str,pipeline_template_ipfs: str, username: str, epsg_srs:str =  "EPSG:2154" ):
    """
    generates the pipeline json for the given tile structure in the pipeline based on the given template stored on ipfs.
    :dirname: is the directory where the user pipeline files are stored 
    :pipeline_template_ipfs: is the reference of the pipeline template is stored.  
    :epsg_srs: is the coordinate standard corresponding to the given template position.
    """
    ## fetch the file
    
    
    pipeline_filedir = fetch_shp_file(pipeline_template_ipfs, 'pipeline_template.json', username)
    
    # Pdal pipeline is specified by a json
    # basically it's a list of filters which can specify actions to perform
    # each filter is a dict
    # Open template file to get the pipeline struct 
    
    with open( pipeline_filedir, 'r' ) as file_pipe_in:
        file_str = file_pipe_in.read()
    
    pdal_pipeline = json.loads( file_str )

    # List files extracted
    # Now we don't check extension and validity
    file_list = os.listdir( dirname )

    # Builds the list of dicts and filetags ( fname without ext )
    ftags = []
    las_readers = []
    for fname in file_list:
        tag = fname[:-4]
        ftags.append( tag )
        las_readers.append( { "type": "readers.las", "filename": fname, "tag": tag, "default_srs":epsg_srs } )
    
    # Insert file tags in the list of inputs to merge
    # Must be done before next insertion because we know the place of merge filter in the list at this moment
    for ftag in ftags:
        pdal_pipeline['pipeline'][0]['inputs'].insert( 0, ftag )

    # Insert the list of las file readers dicts
    for las_reader in las_readers:
        pdal_pipeline['pipeline'].insert( 0, las_reader )
    
    pipeline_generated = "pipeline_gen_" + username + ".json"
    
    with open( pipeline_generated, "w" ) as file_pipe_out:
        json.dump( pdal_pipeline, file_pipe_out )

    if os.path.isfile(pipeline_generated):
        print(" pdal pipeline file is stored in the given directory  as {}".format(pipeline_generated))

    return pdal_pipeline


## cli functions:
""" functions to seting up the input and then georender pipeline. 

python georender.py <<function-name>> parameters

"""

def upload_files():
    """
    uploads the  along with all the shp files into the given web3 storage provider (pipeline and shp files).
    
    georender.py  upload_files -l  testfile.json test.las, test2.las, ..... 
    """
    parser=argparse.ArgumentParser(description="takes the name of files (pipeline.json / shp files) and stores to the given storage provider")
    parser.add_argument('-l',nargs='+', help='<Required> Set -l flag', required=True)
    
    loaded_files_cid = []
    args = parser.parse_args
    filecounter = 0
    for fileIter in args:
       if os.path.exists(fileIter):
            filecounter += 1          
            loaded_files_cid.append(w3.post_upload(fileIter))
            print("File {} uploaded successfully on cid: {} ".format(fileIter, loaded_files_cid[filecounter]))
    return loaded_files_cid

## Pipeline creation
def run_georender_pipeline_point():
    """
    this function the rendering data pipeline of various .laz file and generate the final 3Dtile format.
    :coordinateX: lattitude coordinate 
    :coordinateY: longitude coordinate 
    username: username of the user profile
    ipfs_cid:  ipfs addresses of the files that you need to run the operation, its the list of the following parameters
    - pipeline temlate file address
    - shp files address that you want to process
    
    filename: name of the file  stored on the given ipfs.
    """
    # Uses geopanda and shapely to intersect gps coord with available laz tiles files
    # Returns corresponding download url and filename
    
    args = argparse.ArgumentParser(description="runs the georender pipeline based on the given geometric point")
    args.add_argument("coordinateX", help="write lattitude in source coordinate system")
    args.add_argument("coordinateY")
    args.add_argument("username")
    args.add_argument("ipfs_cid",nargs='+',help="compulsory: set the address via comma between them", required=True)
    args.add_argument("filename")
    parameters = args.parse_args()
    
    laz_path, fname, dirname = get_tile_details_point(parameters.coordinateX, parameters.coordinateY, parameters.userprofile, parameters.filename, parameters.ipfs_cid)

    os.chdir( os.getcwd() + "/data") 
    os.mkdir(parameters.userprofile)
    
    # Causes in case if the file has the interrupted downoad.
    if not os.path.isfile( fname ): 
        check_call( ["wget", "--user-agent=Mozilla/5.0", laz_path])
    # Extract it
    check_call( ["7z", "-y", "x", fname] ) 
    pipeline_ipfs = parameters["ipfs_cid"][0]
    generate_pdal_pipeline( dirname, pipeline_ipfs, parameters["username"] )

    # run pdal pipeline with the generated json :
    os.chdir( dirname )
    # todo : There should be further doc and conditions on this part
    #        Like understanding why some ign files have it and some don't
    # In case the WKT flag is not set :
    # need to handle the edge cases with different EPSG coordinate standards
    for laz_fname in os.listdir( '.' ):
        f = open( laz_fname, 'rb+' )
        f.seek( 6 )
        f.write( bytes( [17, 0, 0, 0] ) )
        f.close()
    check_call( ["pdal", "pipeline", "../pipeline_gen.json"] )
    
    shutil.move( 'result.las', '../result.las' )
    print('resulting rendering successfully generated, now uploading the files to ipfs')
    w3.post_upload('result.las')
    w3.post_upload()




def run_georender_pipeline_polygon():
    """
    This function allows to run pipeline for the given bounded location and gives back the rendered 3D tileset
    :coordinates: a list of 4 coordinates [lattitude_max, lattitude_min, longitude_max, longitude_min ]
    ::    
    """
    pass

def las_to_tiles_conversion(las_file: str, username: str):
    pass    




def main():
    run_georender_pipeline_point()


if __name__ == "__main__":
    main()