const DataeumToken = artifacts.require('./DataeumToken.sol')

module.exports = function (deployer) {
  deployer.deploy(
    DataeumToken,
    parseInt(process.env.TOTAL_SUPPLY) * 10 ** 18
  )
}
