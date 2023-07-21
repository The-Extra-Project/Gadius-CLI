#!/bin/bash
# reading the parameters from the file 

params = ()

while read arg; do
    params+=("$arg")
done < filedetails

# a 2D geographic position
echo "run the script with X=$params[0] Y=$params[1]"

POS="$params[0] $params[1]"

python /usr/src/app/georender/src/main.py $POS

