#!/bin/bash

regex='require.*'

COUNTER=0
# Find all lines starting with "require"
while read line
do
    if [[ $line =~ $regex ]]
    then
        # Extract content within "require('...')"
        require_content=`echo "${BASH_REMATCH}" | grep -Po "'.*?'"`
        package_name="${require_content:1:${#require_content}-2}"
        # Save all package names within an array
        package_names[$COUNTER]=$package_name
        let COUNTER=COUNTER+1
    fi
done < gulpfile.js

# Run "npm install" on the contents of the array
npm install "${package_names[@]}" --save-dev
