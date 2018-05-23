const DataeumToken = artifacts.require('./DataeumToken.sol')
const DataeumCrowdsale = artifacts.require('./DataeumCrowdsale.sol')

module.exports = function (deployer) {
  deployer.deploy(
    DataeumCrowdsale,
    process.env.DATAEUM_WALLET,
    process.env.KYC_ADMIN,
    DataeumToken.address,
    process.env.HARD_CAP
  )
}
