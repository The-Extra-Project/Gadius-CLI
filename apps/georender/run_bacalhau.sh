#!/bin/bash
## this dockerfile is useful for testing the deployment on traditional bacalau system.


 
name = "lxet/lidar_geocoordinate"


## enter the type of function (rendering for polygon or based on the point). 

#param = "point" # for the point , by default its for the point , and "polygon" for defining the shp file for the polygon 

params = ()

for str in  ${params[@]}; do
    params+=("$str")
done 

#if $param = 0
# then
bacalhau run $name $params{0} $params{1} 
