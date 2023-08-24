#!/bin/bash

# reading the parameters from the file 

params = ()

while read arg; do
    params+=("$arg")
done 

if [$params[0] = 0]
# a 2D geographic position
    echo "run the script with X=$params[1] Y=$params[2] username=$params[3], file_cid = $params[4], filename=$params[5]"
    POS="$params[0] $params[1] $params[2] $params[3] $params[4]"

elif [$params[1] = 1]
    echo "running the algorithm with polygon boundation between lattitude($params[1] to $params[2]) and  longitude ($params[3] to $params[4] ) username=$params[5], file_cid = $params[6], filename=$params[7])"
    POS="$params[0] $params[1] $params[2] $params[3] $params[4] $params[5] $params[6] $params[7] $params[8] "

# elif [$params[1] = 2]
#     echo "data migration test from lidar"
#     POS ""
python /usr/src/app/georender/src/main.py $POS

##echo "then finally running the 3Dtiles coversion operation"
