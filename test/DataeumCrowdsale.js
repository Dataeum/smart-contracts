const {assertReverts, assertEq, tokenValue} = require('./lib')

const DataeumToken = artifacts.require('DataeumToken')
const DataeumCrowdsale = artifacts.require('DataeumCrowdsale')

const DEFAULT_TOKEN_RATE = 12000
const DEFAULT_MIN_CONTRIBUTION = '0'
const HARD_CAP = tokenValue('300000')

contract('DataeumCrowdsale', ([admin, dataeumWallet, user1, user2, user3]) => {
  let dataeumToken
  let dataeumCrowdsale

  beforeEach('redeploy', async function () {
    dataeumToken = await DataeumToken.new(tokenValue('2000000000'), {from: admin})

    dataeumCrowdsale = await DataeumCrowdsale.new(
      dataeumWallet,
      admin,
      dataeumToken.address,
      HARD_CAP,
      {from: admin}
    )

    dataeumToken.distribute(dataeumCrowdsale.address, tokenValue('1000000000'), {from: admin})
    dataeumToken.setBypassStatus(dataeumCrowdsale.address, true, {from: admin})
  })

  it('permits to change crowdsale status only for owner', async function () {
    assertEq(await dataeumCrowdsale.enabled(), false)

    await assertReverts(
      dataeumCrowdsale.setEnabled(true, {from: user1})
    )

    assertEq(await dataeumCrowdsale.enabled(), false)
    await dataeumCrowdsale.setEnabled(true, {from: admin})
    assertEq(await dataeumCrowdsale.enabled(), true)
  })

  it('permits to change crowdsale parameters only for owner', async function () {
    assertEq(await dataeumCrowdsale.rate(), DEFAULT_TOKEN_RATE)
    assertEq(await dataeumCrowdsale.minContrib(), DEFAULT_MIN_CONTRIBUTION)

    await assertReverts(
      dataeumCrowdsale.setParameters(
        '24000',
        tokenValue('1'),
        {from: user1}
      )
    )

    assertEq(await dataeumCrowdsale.rate(), DEFAULT_TOKEN_RATE)
    assertEq(await dataeumCrowdsale.minContrib(), DEFAULT_MIN_CONTRIBUTION)

    await dataeumCrowdsale.setParameters('24000', tokenValue('1'), {from: admin})
    assertEq(await dataeumCrowdsale.rate(), '24000')
    assertEq(await dataeumCrowdsale.minContrib(), tokenValue('1'))
  })

  it('permits to whitelist an user only for owner', async function () {
    await assertReverts(
      dataeumCrowdsale.setWhitelistStatus(user1, true, {from: user1})
    )
    assertEq(await dataeumCrowdsale.whitelist(user1), false)
    await dataeumCrowdsale.setWhitelistStatus(user1, true, {from: admin})
    assertEq(await dataeumCrowdsale.whitelist(user1), true)
  })

  it('refuses a transaction if the crowdsale is closed', async function () {
    await dataeumCrowdsale.setEnabled(false, {from: admin})
    await dataeumCrowdsale.setParameters('12000', tokenValue('0.01'), {from: admin})
    await dataeumCrowdsale.setWhitelistStatus(user1, true, {from: admin})

    await assertReverts(
      dataeumCrowdsale.sendTransaction({from: user1, value: tokenValue('1')})
    )
  })

  it('refuses a transaction if the minimum amount is not met', async function () {
    await dataeumCrowdsale.setEnabled(true, {from: admin})
    await dataeumCrowdsale.setParameters('12000', tokenValue('0.01'), {from: admin})
    await dataeumCrowdsale.setWhitelistStatus(user1, true, {from: admin})

    await assertReverts(
      dataeumCrowdsale.sendTransaction({from: user1, value: tokenValue('0.001')})
    )
  })

  it('refuses a transaction if the KYC is not clear', async function () {
    await dataeumCrowdsale.setEnabled(true, {from: admin})
    await dataeumCrowdsale.setWhitelistStatus(user1, false, {from: admin})

    await assertReverts(
      dataeumCrowdsale.sendTransaction({from: user1, value: tokenValue('1')})
    )
  })

  it('makes the allocation after a successful payment', async function () {
    await dataeumCrowdsale.setEnabled(true, {from: admin})
    await dataeumCrowdsale.setWhitelistStatus(user1, true, {from: admin})
    await dataeumCrowdsale.sendTransaction({from: user1, value: tokenValue('1')})

    assertEq(await dataeumToken.balanceOf(user1), tokenValue('12000'))
  })

  it('permits to owner to withdraw remaining tokens to the Dataeum Wallet', async function () {
    await dataeumCrowdsale.setEnabled(true, {from: admin})

    await assertReverts(
      dataeumCrowdsale.withdraw({from: user1})
    )

    assertEq(await dataeumToken.balanceOf(dataeumCrowdsale.address), tokenValue('1000000000'))
    await dataeumCrowdsale.withdraw({from: admin})
    assertEq(await dataeumToken.balanceOf(dataeumCrowdsale.address), 0)
    assertEq(await dataeumToken.balanceOf(dataeumWallet), tokenValue('1000000000'))
  })

  it('allows only the owner to make a custom contribution from another payment medium', async function () {
    // Crowdsale disabled
    await assertReverts(
      dataeumCrowdsale.otherCurrencyPayment(tokenValue('0.1'), user2, {from: admin})
    )

    // Enabling crowdsale
    await dataeumCrowdsale.setEnabled(true, {from: admin})

    // Whitelisting target
    await dataeumCrowdsale.setWhitelistStatus(user2, true, {from: admin})

    // Not the right sender
    await assertReverts(
      dataeumCrowdsale.otherCurrencyPayment(tokenValue('0.1'), user2, {from: user1})
    )

    // Right case
    assertEq(await dataeumToken.balanceOf(user2), 0)
    await dataeumCrowdsale.otherCurrencyPayment(tokenValue('1'), user2, {from: admin})
    assertEq(await dataeumToken.balanceOf(user2), tokenValue('12000'))
  })

  it('permits to change the hardcap, only by reducing it to a level above the currently raised amount', async function () {
    // Enabling crowdsale
    await dataeumCrowdsale.setEnabled(true, {from: admin})
    // Whitelisting target
    await dataeumCrowdsale.setWhitelistStatus(user1, true, {from: admin})
    // Contribute of 50 ETH
    await dataeumCrowdsale.sendTransaction({from: user1, value: tokenValue('50')})
    // Check if the values are correct
    assertEq(await dataeumCrowdsale.totalRaised(), tokenValue('50'))
    assertEq(await dataeumCrowdsale.hardCap(), HARD_CAP)
    //
    let totalRaised = await dataeumCrowdsale.totalRaised()
    // Refuses to increase it
    await assertReverts(
      dataeumCrowdsale.setHardCap(HARD_CAP.add(tokenValue('1')))
    )
    // Refuses to set it lower than the currently raised ammount
    await assertReverts(
      dataeumCrowdsale.setHardCap(totalRaised.sub(tokenValue('1')))
    )
    // Accepts a correct update
    await dataeumCrowdsale.setHardCap(HARD_CAP.sub(tokenValue('10')))
    assertEq(await dataeumCrowdsale.hardCap(), HARD_CAP.sub(tokenValue('10')))
  })
})
