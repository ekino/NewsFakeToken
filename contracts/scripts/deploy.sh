#!/bin/bash

set -e

env="$1"
num="$2"

usage ()
{
    echo "usage: deploy.sh env num"
    exit 1
}

if [ -z "$env" ]
then
    usage
    exit 1
fi

if [ -n "$num" ] && [[ ! "$num" =~ ^[0-9]+$ ]]
then
    echo "invalid number."
    exit 1
fi

MIGRATIONS_DIR=./migrations

run() {

    migrations=$(find "${MIGRATIONS_DIR}" -type f | sort)

    for file in $migrations; do
        f=$(basename "$file")
        cur=${f:0:1}
        if [ -n "$num" ] && [ "$num" != "$cur" ]; then continue ; fi
        echo "$f"
        yarn ts-node "${MIGRATIONS_DIR}/${f}" "${env}"
    done
}

run
