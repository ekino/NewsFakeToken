#!/bin/bash

set -e

testnet() {
    sed -i -e '/^NETWORK=/s/=.*/=testnet/' contracts/.env
    sed -i -e '/^REACT_APP_NETWORK=/s/=.*/=FLORENCENET/' minter/.env
    sed -i -e '/^REACT_APP_RPC_URL=/s/=.*/=http:\/\/52.47.113.94:8732/' minter/.env
}

local() {
    sed -i -e '/^NETWORK=/s/=.*/=local/' contracts/.env
    sed -i -e '/^REACT_APP_NETWORK=/s/=.*/=CUSTOM/' minter/.env
    sed -i -e '/^REACT_APP_RPC_URL=/s/=.*/=http:\/\/localhost:8732/' minter/.env
}

cleanup() {
    rm contracts/.env-e
    rm minter/.env-e
}

echo 'Configuration updated!'

PS3='Choose node :'
options=("local" "testnet" "abort")
select opt in "${options[@]}"
do
    case $opt in
        "local")
            local
            cleanup
            break
            ;;
        "testnet")
            testnet
            cleanup
            break
            ;;
        "abort")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
