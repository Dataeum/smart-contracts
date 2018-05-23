const DataeumToken = artifacts.require('./DataeumToken.sol')
const DataeumCrowdsale = artifacts.require('./DataeumCrowdsale.sol')

module.exports = function (deployer) {
  deployer.then(function () {
    return DataeumToken.deployed()
  }).then(token => {
    return token.distribute(DataeumCrowdsale.address, parseInt(process.env.CROWDSALE_SUPPLY) * 10 ** 18)
  })
}
