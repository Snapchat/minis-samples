#!/bin/bash
# Creates a new mini
#
# Usage:
#   1. Run ./new_mini.sh -n hello-world -p 3888e26d-3c96-45da-8428-47f05c4c7dbf

while getopts n:p: flag
do
    case "${flag}" in
        n) name=${OPTARG};;
        p) appId=${OPTARG};;
    esac
done

mkdir minis/"$name"
cp -r minis/sample/{public,src,package.json,tsconfig.json} minis/"$name"
echo "REACT_APP_APP_ID=${appId}" > minis/"$name"/.env.development
sed "s/sample-mini/${name}/g; s/ee556332-8b38-4f7c-8b2c-04d77c23cc10/${appId}_default_md/g;" minis/sample/package.json > minis/"$name"/package.json
sed "s/Example/${name}/g" minis/sample/public/index.html > minis/"$name"/public/index.html
