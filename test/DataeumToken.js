const {assertReverts, assertLog, assertEq, tokenValue, sleep} = require('./lib')

const DataeumToken = artifacts.require('DataeumToken')
const ApproveAndCallFallBackTest = artifacts.require('ApproveAndCallFallBackTest')

const TOTAL_SUPPLY = tokenValue(2000000000)
const DEFAULT_BALANCE = tokenValue(2000)

contract('DataeumToken', ([admin, user1, user2, user3, user4]) => {
  let dataeumToken

  beforeEach('redeploy', async function () {
    dataeumToken = await DataeumToken.new(TOTAL_SUPPLY, {from: admin})

    // User 1 : Has supply, has freeze bypass
    await dataeumToken.distribute(user1, DEFAULT_BALANCE, {from: admin})
    await dataeumToken.setBypassStatus(user1, true, {from: admin})

    // User 2 : Has supply, does not have freeze bypass
    await dataeumToken.distribute(user2, DEFAULT_BALANCE, {from: admin})

    // User 3 : Has no supply, has freeze bypass
    await dataeumToken.setBypassStatus(user3, true, {from: admin})

    // User 4 : Has no supply nor freeze bypass (default state)
  })

  it('sets the parameters correctly when admin calls distribution and freeze methods', async function () {
    assertEq(await dataeumToken.balanceOf(user1), DEFAULT_BALANCE)
    assertEq(await dataeumToken.balanceOf(user2), DEFAULT_BALANCE)
    assertEq(await dataeumToken.freezeBypassing(user1), true)
    assertEq(await dataeumToken.freezeBypassing(user3), true)
  })

  it('returns the right amount in the totalSupply() method', async function () {
    assertEq(await dataeumToken.totalSupply(), TOTAL_SUPPLY)
  })

  it('refuses to give more token than the totalSupply', async function () {
    await assertReverts(
      dataeumToken.distribute(user4, TOTAL_SUPPLY.add(1), {from: admin})
    )
  })

  it('adds to distribute correctly', async function () {
    await dataeumToken.distribute(user1, DEFAULT_BALANCE, {from: admin})
    assertEq(await dataeumToken.balanceOf(user1), DEFAULT_BALANCE.mul(2))
  })

  it('permits to a freeze-bypasser to send tokens', async function () {
    const amount = DEFAULT_BALANCE.div(2)
    const remaining = amount

    assertEq(await dataeumToken.tradingLive(), false)
    await dataeumToken.transfer(user4, amount, {from: user1})
    assertEq(await dataeumToken.balanceOf(user1), remaining)
    assertEq(await dataeumToken.balanceOf(user4), amount)
  })

  it('does not permit to a non-freeze-bypasser to send tokens if trading is not live', async function () {
    const amount = DEFAULT_BALANCE.div(2)

    assertEq(await dataeumToken.tradingLive(), false)
    await assertReverts(dataeumToken.transfer(user4, amount, {from: user2}))
    assertEq(await dataeumToken.balanceOf(user2), DEFAULT_BALANCE)
    assertEq(await dataeumToken.balanceOf(user4), 0)
  })

  it('permits to a non-freeze-bypasser to send tokens if trading is live', async function () {
    const amount = DEFAULT_BALANCE.div(2)
    await dataeumToken.setTradingLive({from: admin})
    assertEq(await dataeumToken.tradingLive(), true)

    assertLog(await dataeumToken.transfer(user4, amount, {from: user2}), 'Transfer', {
      from: user2,
      to: user4,
      tokens: amount
    })

    assertEq(await dataeumToken.balanceOf(user2), amount)
    assertEq(await dataeumToken.balanceOf(user4), amount)
  })

  it('creates and returns approvals correctly', async function () {
    const amount = tokenValue(100)
    assertLog(await dataeumToken.approve(user4, amount, {from: user1}), 'Approval', {
      tokenOwner: user1,
      spender: user4,
      tokens: amount
    })
    assertEq(await dataeumToken.allowance(user1, user4), amount)
  })

  it('creates an allowance and permit to spend the token, if trading is live', async function () {
    const amount = tokenValue(100)
    await dataeumToken.setTradingLive({from: admin})
    assertEq(await dataeumToken.tradingLive(), true)

    assertLog(await dataeumToken.approve(user4, amount, {from: user1}), 'Approval', {
      tokenOwner: user1,
      spender: user4,
      tokens: amount
    })
    assertEq(await dataeumToken.allowance(user1, user4), amount)
    assertLog(await dataeumToken.transferFrom(user1, user3, amount, {from: user4}), 'Transfer', {
      from: user1,
      to: user3,
      tokens: amount
    })
    assertEq(await dataeumToken.balanceOf(user3), amount)
  })

  it('creates an allowance and permit to spend the token, if trading is not live but tokenOwner is a freeze-bypasser', async function () {
    const amount = tokenValue(100)
    assertLog(await dataeumToken.approve(user4, amount, {from: user1}), 'Approval', {
      tokenOwner: user1,
      spender: user4,
      tokens: amount
    })
    assertEq(await dataeumToken.allowance(user1, user4), amount)
    assertLog(await dataeumToken.transferFrom(user1, user3, amount, {from: user4}), 'Transfer', {
      from: user1,
      to: user3,
      tokens: amount
    })
    assertEq(await dataeumToken.balanceOf(user3), amount)
  })

  it('handles token transfer approval to a contract', async function () {
    const destinationContract = await ApproveAndCallFallBackTest.new()
    const tokenAmount = tokenValue(100)
    await dataeumToken.setTradingLive({from: admin})

    assertLog(await dataeumToken.approveAndCall(destinationContract.address, tokenAmount, 'Hello World !', {from: user1}), 'Approval', {
      tokenOwner: user1,
      spender: destinationContract.address,
      tokens: tokenAmount
    })

    assertEq(await destinationContract.from(), user1)
    assertEq(await destinationContract.token(), dataeumToken.address)
    assertEq(await destinationContract.tokens(), tokenAmount)
    assertEq(await destinationContract.data(), web3.fromAscii('Hello World !'))
  })

  it('permits to withdraw any lost ERC20 token from the contract', async function () {
    const amount = tokenValue(100)
    const otherDataeumToken = await DataeumToken.new(TOTAL_SUPPLY, {from: admin})
    await otherDataeumToken.setTradingLive({from: admin})

    await otherDataeumToken.distribute(dataeumToken.address, amount, {from: admin})
    assertEq(await otherDataeumToken.balanceOf(dataeumToken.address), amount)

    await dataeumToken.withdrawERC20Token(otherDataeumToken.address, amount, {from: admin})
    assertEq(await otherDataeumToken.balanceOf(dataeumToken.address), 0)
    assertEq(await otherDataeumToken.balanceOf(admin), amount)
  })

  it('permits to transfert its ownership', async function () {
    assertEq(await dataeumToken.owner(), admin)
    await dataeumToken.transferOwnership(user4, {from: admin})
    assertEq(await dataeumToken.owner(), admin)
    await dataeumToken.acceptOwnership({from: user4})
    assertEq(await dataeumToken.owner(), user4)
  })

  it('permits to lockup the tokens of a user for a given time', async function () {
    await dataeumToken.setTradingLive({from: admin})
    await dataeumToken.distribute(user3, tokenValue(1000), {from: admin})
    await dataeumToken.lockup(user3, 5, {from: admin})

    await assertReverts(
      dataeumToken.transfer(user4, tokenValue(500), {from: user3})
    )

    await sleep(5000)

    await dataeumToken.transfer(user4, tokenValue(500), {from: user3})
    assertEq(await dataeumToken.balanceOf(user3), tokenValue(500))
    assertEq(await dataeumToken.balanceOf(user4), tokenValue(500))
  })

  it('permits to the new owner to accept it', async function () {
    assertEq(await dataeumToken.owner(), admin)
    await dataeumToken.transferOwnership(user4, {from: admin})
    assertEq(await dataeumToken.owner(), admin)
    await assertReverts(
      dataeumToken.acceptOwnership({from: user3})
    )
    assertEq(await dataeumToken.owner(), admin)
  })
})
