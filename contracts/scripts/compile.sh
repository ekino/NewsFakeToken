#!/bin/bash

set -e

source="$1"
format="$2"

usage ()
{
    echo "usage: compile.sh counter.ligo"
    exit 1
}

if [ -z "$source" ]
then
    usage
    exit 1
fi

if [ -z "$format" ]
then
    format="json"
fi

if [ "$format" == "json" ]
then
    ext="json"
else
    ext="tz"
fi

LIGO_IMAGE=ligolang/ligo:0.22.0
SOURCE_DIR=$(pwd)/src
OUTPUT_DIR=$(pwd)/build

run() {
    if [ ! -d "${OUTPUT_DIR}" ];
        then mkdir -p "${OUTPUT_DIR}";
    fi ;

    name=$(basename "$source" | cut -d. -f1)
    output_file="${name}.${ext}"

    docker run --rm -v "${SOURCE_DIR}:/project" -v "${OUTPUT_DIR}:/output" -w /project \
        ${LIGO_IMAGE} compile-contract "${source}" fa2_main --michelson-format="${format}" --output-file="/output/${output_file}"

    echo "[OK] ${OUTPUT_DIR}/${output_file}"
}

run
