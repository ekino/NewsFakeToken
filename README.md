# NewsFakeToken

An NFT for tracing Fake News

## Packages

yarn workspaces are used in order to be able to import contract addresses in the dapp.  
There are 2 packages:

- minter: React app
- contracts: Custom scripts with taquito, test with mocha/chai, contract with ligo

## Dev

- yarn minter:start / starts the minter dapp from the minter package
- yarn sandox:start / starts the flextesa sandbox
- yarn contracts:compile Example / compiles a contract with ligo
- yarn contracts:migrate / deploy contracts

To compile, deploy and launch tests in a row, run `yarn contracts:compile token.ligo && yarn contracts:deploy dev 1 && yarn contracts:test`

## Sandbox

You can enter the sandbox with `sandbox:shell`.  
To import keys, run:

- `tezos-client import secret key alice unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq`
- `tezos-client import secret key bob unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt`
