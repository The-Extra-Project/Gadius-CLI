#!/bin/bash
name = 'lxet/las_processing_bacalau'


## enter the type of function (rendering for polygon or based on the point). 

#param = "point" # for the point , by default its for the point , and "polygon" for defining the shp file for the polygon 

params = ()

while read arg; do
    params+=("$arg")
done < filedetails

#if $param = 0
# then
bacalhau run $name $params{0} $params{1} 
