"""
this script is adapter for migrating the shape files from the given database to output.
each class corresponds to the adapters to fetch the data from the given dataset. 
this will eventually be integrated to the well known data migration tools like airbyte etc.
"""

from utils.web3Storage import API
import logging
from subprocess import run

logger = logging.getLogger('data-migration')

logger.setLevel(logging.DEBUG)

class LidarHdFilesMigration():
    """
    migrates the data from the small version of lidar HD dataset for specific region (https://poc-flux-lidar.ign.fr) to the web3.storage  
    
    """
    
    w3: API
    baseURL = 'https://poc-flux-lidar.ign.fr/MQ/LHD_FMQ_0'
    
    def __init__(self, APIKey):
        self.w3 = API(token=APIKey)
        
    def migrate_datasets(self):
        """
        it fetches all of the regions of the given laz file which are not uploaded for now
        """
        
        lattitude_range = [736, 746]
        longitude_range = [6243, 6283]
    
        
        small_tile_lattitude = [756,785]
        small_tile_longitude = [6256,6283]
        #for longitude in range(lattitude_range[0]):
        for longitude in range(longitude_range[0] + 10, longitude_range[1],10):
                url_accessible = self.baseURL + str(lattitude_range[0]) + '_' + str(longitude) + '_PTS_C_LAMB93_IGN69.copc.laz'
                print('accessing laz tile {}'.format(url_accessible))    
                run(["wget",'-U Mozilla/5.0',  url_accessible, '-O', 'LHD_FMQ_0' + str(lattitude_range[0]) + '_'+ str(longitude) + '.laz'])
                file_uploaded = str(lattitude_range[0]) + '_' + str(longitude) + '.laz'
                self.w3.post_upload(file_uploaded)
        
        ## saving the next 4 tiles similarly
        for longitude in range(longitude_range[0], longitude_range[1],10):
                url_accessible = self.baseURL + str(lattitude_range[0]) + '_' + str(longitude) + '_PTS_C_LAMB93_IGN69.copc.laz'
                print('accessing laz tile {}'.format(url_accessible))    
                run(["wget",'-U Mozilla/5.0',  url_accessible, '-O', 'LHD_FMQ_0' + str(lattitude_range[0]) + '_'+ str(longitude) + '.laz'])
                file_uploaded = str(lattitude_range[0]) + '_' + str(longitude) + '.laz'
                self.w3.post_upload(file_uploaded)
        
        
        ## for other small tiles, given that there is no better tile 
        
        

                
                

def main():
    migrationObject = LidarHdFilesMigration(APIKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZENUE1NmQxYTFEZDAzYmFhZjkyQTUwOTA1NzIwQWJmMDdkOTQzQkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI1ODUzMDgxMzgsIm5hbWUiOiJleHRyYS1jb21tdW5pdHktQVBJIn0.CW_1s8nBQwb-GZF_R4SPI4NQsKP7KETuaGRssAkekTc')        
    migrationObject.migrate_datasets()
    
    
if __name__ == '__main__':
    main()
        
        
        
        