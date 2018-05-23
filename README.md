# Dataeum Smart Contracts

[![Travis integration](https://travis-ci.org/Dataeum/smart-contracts.svg?branch=master)](https://travis-ci.org/Dataeum/smart-contracts) [![Codecov](https://codecov.io/gh/Dataeum/smart-contracts/branch/master/graph/badge.svg)](https://codecov.io/gh/Dataeum/smart-contracts/)

## Setup

```
npm install -g yarn
yarn install
```

## Launch tests

```
yarn run test
yarn run test-coverage # lancer avec coverage checks
```

## Deploy contracts on test network rinkeby

```
cp .env.dist .env
edit .env
truffle migrate --network rinkeby
```

## Deploy contracts on main network

```
cp .env.dist .env
edit .env
truffle migrate --network mainnet
```

## Dotenv variables

 - `PRIVATE_KEY` : Deployment private key
 - `TOTAL_SUPPLY` : Token total supply
 - `DATAEUM_WALLET` : Wallet that receives ICO funds
 - `KYC_ADMIN` : Allowed wallet to whitelist addresses in crowdsale smart contract
 - `HARD_CAP` : Crowdsale contract hard cap
 - `CROWDSALE_SUPPLY` : Crowdsale contract total supply

## Methods - Documentation

[Full contracts documentation](docs.md)
