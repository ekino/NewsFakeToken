# NewsFakeToken

An NFT for tracing Fake News

## Packages

yarn workspaces are used in order to be able to import contract addresses in the dapp.  
There are 3 packages:

- backend: Express API
- contracts: Custom scripts with taquito, test with mocha/chai, contract with ligo
- minter: React app

## Dev

- make backend-start / start the API
- make minter-start / start the minter dapp
- make contracts-compile / compile contracts
- make contracts-deploy dev / deploy contracts

## Sandbox

You can enter the sandbox with `docker compose exec sandbox ash`.  
To import keys, run: (TODO fix config)

- `tezos-client import secret key alice unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq`
- `tezos-client import secret key bob unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt`

## Resources

- https://github.com/KStasi/fa2-deployer
- https://medium.com/ecad-labs-inc/how-to-mint-nfts-on-tezos-using-taquito-and-pinata-15a407078495
- https://github.com/claudebarde/taquito-pinata-tezos-nft/
