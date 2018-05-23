const DataeumToken = artifacts.require('./DataeumToken.sol')
const DataeumCrowdsale = artifacts.require('./DataeumCrowdsale.sol')

module.exports = function (deployer) {
  deployer.then(function () {
    return DataeumToken.deployed()
  }).then(token => {
    return token.setBypassStatus(DataeumCrowdsale.address, true)
  })
}
