# Michelson integration tests

## Requirements

You will need python3.6 and pipenv (installed by `pip install pipenv`).  
And other required libs (see [pytezos doc](https://pytezos.org/quick_start.html))

You need the contract code, which can be compiled with this command
(from project's root): `yarn contracts:compile NFTS_contract.ligo text`

## Local testing

1.  Create your pipenv environnement  
    `pipenv install`
2.  Load your pipenv  
    `pipenv shell`
3.  Run the tests  
    `pytest -v .`

## Resources

-   https://pytezos.org/integration_tests.html?highlight=contractcallresult
