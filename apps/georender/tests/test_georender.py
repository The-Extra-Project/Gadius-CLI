"""Hello unit test module."""

from src.georender import get_tile_details_point, generate_pdal_pipeline, run_georender_pipeline_point
import os

username = 'toto'
filename = 'TA_diff_pkk_lidarhd.shp'


def test_get_tile_informations_point():
    """
    for  testing the tile_url and the given 3Dtile format are correctly generated for given input
    """
    
    ipfsCid = "bafybeih4m6x6oxaojzfr27czxjbyhivduqlwj35jfczdvmawr2y6gsgonu"
    
    coordX = '34'
    coordY = '42'
    
    username = 'toto'
    filename = 'TA_diff_pkk_lidarhd.shp'

    [laz_path, fname, dirname] = get_tile_details_point(coordX=coordX, coordY= coordY, username= username,filename= filename,ipfsCid= ipfsCid)
    
    assert laz_path != None
    assert fname != None
    assert  dirname != None
    
    assert laz_path != None 



def test_generate_pdal_pipeline():
    dirname = os.path.dirname(os.getcwd() + '/datas' + username)
    filename = 'TA_diff_pkk_lidarhd'
    laz_path = os.path.join(dirname, 'datas' + filename)
    ipfs_template_ipfs = "bafybeibbtseqjgu72lmehn2y2b772wvr36othnc4rpzu6z3v2gfsjy3ew4"
    
    FILE_CONTENTS = generate_pdal_pipeline(dirname, ipfs_template_ipfs,username)
    assert FILE_CONTENTS != None    
    

# def test_running_fully_pipeline():
#     dirname = os.path.dirname(os.getcwd() + '/datas' + username)
#     filename
    
    
#     run_georender_pipeline_point() 