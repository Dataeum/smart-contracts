* [DataeumCrowdsale](#dataeumcrowdsale)
  * [dataeumWallet](#function-dataeumwallet)
  * [setWhitelistStatus](#function-setwhiteliststatus)
  * [enabled](#function-enabled)
  * [rate](#function-rate)
  * [setEnabled](#function-setenabled)
  * [withdraw](#function-withdraw)
  * [otherCurrencyPayment](#function-othercurrencypayment)
  * [dataeumToken](#function-dataeumtoken)
  * [acceptOwnership](#function-acceptownership)
  * [setParameters](#function-setparameters)
  * [owner](#function-owner)
  * [whitelist](#function-whitelist)
  * [totalRaised](#function-totalraised)
  * [newOwner](#function-newowner)
  * [minContrib](#function-mincontrib)
  * [kycAdmin](#function-kycadmin)
  * [transferOwnership](#function-transferownership)
  * [hardCap](#function-hardcap)
  * [WhitelistStatusChanged](#event-whiteliststatuschanged)
  * [CrowdsaleStatusChanged](#event-crowdsalestatuschanged)
  * [CrowdsaleSettingsChanged](#event-crowdsalesettingschanged)
  * [OwnershipTransferred](#event-ownershiptransferred)
* [DataeumToken](#dataeumtoken)
  * [name](#function-name)
  * [approve](#function-approve)
  * [tradingLive](#function-tradinglive)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [decimals](#function-decimals)
  * [setBypassStatus](#function-setbypassstatus)
  * [lockupExpirations](#function-lockupexpirations)
  * [balanceOf](#function-balanceof)
  * [acceptOwnership](#function-acceptownership)
  * [freezeBypassing](#function-freezebypassing)
  * [owner](#function-owner)
  * [withdrawERC20Token](#function-withdrawerc20token)
  * [circulatingSupply](#function-circulatingsupply)
  * [setTradingLive](#function-settradinglive)
  * [symbol](#function-symbol)
  * [lockup](#function-lockup)
  * [transfer](#function-transfer)
  * [approveAndCall](#function-approveandcall)
  * [newOwner](#function-newowner)
  * [allowance](#function-allowance)
  * [transferOwnership](#function-transferownership)
  * [distribute](#function-distribute)
  * [LockupApplied](#event-lockupapplied)
  * [Transfer](#event-transfer)
  * [Approval](#event-approval)
  * [OwnershipTransferred](#event-ownershiptransferred)
* [ApproveAndCallFallBack](#approveandcallfallback)
  * [receiveApproval](#function-receiveapproval)
* [ERC20Interface](#erc20interface)
  * [approve](#function-approve)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [balanceOf](#function-balanceof)
  * [transfer](#function-transfer)
  * [allowance](#function-allowance)
  * [Transfer](#event-transfer)
  * [Approval](#event-approval)
* [Owned](#owned)
  * [acceptOwnership](#function-acceptownership)
  * [owner](#function-owner)
  * [newOwner](#function-newowner)
  * [transferOwnership](#function-transferownership)
  * [OwnershipTransferred](#event-ownershiptransferred)
* [SafeMath](#safemath)

# DataeumCrowdsale


## *function* dataeumWallet

DataeumCrowdsale.dataeumWallet() `view` `0bd6cc1d`





## *function* setWhitelistStatus

DataeumCrowdsale.setWhitelistStatus(target, status) `nonpayable` `0c424284`

**Allows an address to contribute (whitelist status).**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | target | The address concerned by the change |
| *bool* | status | Is this address allowed to contribute (true => can contribute) |


## *function* enabled

DataeumCrowdsale.enabled() `view` `238dafe0`





## *function* rate

DataeumCrowdsale.rate() `view` `2c4e722e`





## *function* setEnabled

DataeumCrowdsale.setEnabled(_enabled) `nonpayable` `328d8f72`

**Starts or stops the crowdsale**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | _enabled | If the crowdsale is running or not |


## *function* withdraw

DataeumCrowdsale.withdraw() `nonpayable` `3ccfd60b`

**Method that gives the remaining tokens from the contract to the Dataeum wallet.**





## *function* otherCurrencyPayment

DataeumCrowdsale.otherCurrencyPayment(etherValue, tokenReceiver) `nonpayable` `47b97156`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | etherValue | undefined |
| *address* | tokenReceiver | undefined |


## *function* dataeumToken

DataeumCrowdsale.dataeumToken() `view` `51ba0691`





## *function* acceptOwnership

DataeumCrowdsale.acceptOwnership() `nonpayable` `79ba5097`





## *function* setParameters

DataeumCrowdsale.setParameters(_rate, _minContrib) `nonpayable` `884870c7`

**Updates the current parameters of the crowdsale.**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _rate | Multiplication factor between ETH to XDT |
| *uint256* | _minContrib | Minimum contribution amount |


## *function* owner

DataeumCrowdsale.owner() `view` `8da5cb5b`





## *function* whitelist

DataeumCrowdsale.whitelist() `view` `9b19251a`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* totalRaised

DataeumCrowdsale.totalRaised() `view` `c5c4744c`





## *function* newOwner

DataeumCrowdsale.newOwner() `view` `d4ee1d90`





## *function* minContrib

DataeumCrowdsale.minContrib() `view` `ebc33c51`





## *function* kycAdmin

DataeumCrowdsale.kycAdmin() `view` `ec9e7971`





## *function* transferOwnership

DataeumCrowdsale.transferOwnership(_newOwner) `nonpayable` `f2fde38b`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _newOwner | undefined |


## *function* hardCap

DataeumCrowdsale.hardCap() `view` `fb86a404`






## *event* WhitelistStatusChanged

DataeumCrowdsale.WhitelistStatusChanged(target, newStatus) `8daaf060`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | target | indexed |
| *bool* | newStatus | not indexed |

## *event* CrowdsaleStatusChanged

DataeumCrowdsale.CrowdsaleStatusChanged(newStatus, timestamp) `cef2158d`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *bool* | newStatus | not indexed |
| *uint256* | timestamp | not indexed |

## *event* CrowdsaleSettingsChanged

DataeumCrowdsale.CrowdsaleSettingsChanged(rate, minContrib, timestamp) `9ab0528b`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | rate | not indexed |
| *uint256* | minContrib | not indexed |
| *uint256* | timestamp | not indexed |

## *event* OwnershipTransferred

DataeumCrowdsale.OwnershipTransferred(_from, _to) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | _from | indexed |
| *address* | _to | indexed |


---
# DataeumToken


## *function* name

DataeumToken.name() `view` `06fdde03`





## *function* approve

DataeumToken.approve(spender, tokenAmount) `nonpayable` `095ea7b3`

**Approve an address to send `tokenAmount` tokens to `msg.sender` (make an allowance)**

> This function is part of the ERC20 standard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | The allowed address |
| *uint256* | tokenAmount | The maximum amount allowed to spend |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | success | If the operation completed successfuly |

## *function* tradingLive

DataeumToken.tradingLive() `view` `11704f52`





## *function* totalSupply

DataeumToken.totalSupply() `view` `18160ddd`

**Return the total supply of the token**

> This function is part of the ERC20 standard 



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | supply | The token supply |

## *function* transferFrom

DataeumToken.transferFrom(from, to, tokenAmount) `nonpayable` `23b872dd`

**Transfer tokens from an address to another one through an allowance made before**

> This function is part of the ERC20 standard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | The address that sends the tokens |
| *address* | to | The address that receives the tokens |
| *uint256* | tokenAmount | Token amount to transfer |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | success | If the operation completed successfuly |

## *function* decimals

DataeumToken.decimals() `view` `313ce567`





## *function* setBypassStatus

DataeumToken.setBypassStatus(to, status) `nonpayable` `4fa88720`

**choose if an address is allowed to bypass the global freeze**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | Target of the freeze bypass status update |
| *bool* | status | New status (if true will bypass) |


## *function* lockupExpirations

DataeumToken.lockupExpirations() `view` `5312ebba`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* balanceOf

DataeumToken.balanceOf(owner) `view` `70a08231`

**Get the token balance of `owner`**

> This function is part of the ERC20 standard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | The wallet to get the balance of |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | balance | The balance of `owner` |

## *function* acceptOwnership

DataeumToken.acceptOwnership() `nonpayable` `79ba5097`





## *function* freezeBypassing

DataeumToken.freezeBypassing() `view` `8c564ebf`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* owner

DataeumToken.owner() `view` `8da5cb5b`





## *function* withdrawERC20Token

DataeumToken.withdrawERC20Token(tokenAddress, tokenAmount) `nonpayable` `928d81c1`

**Permits to withdraw any ERC20 tokens that have been mistakingly sent to this contract**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | tokenAddress | The received ERC20 token address |
| *uint256* | tokenAmount | The amount of ERC20 tokens to withdraw from this contract |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | success | If the operation completed successfuly |

## *function* circulatingSupply

DataeumToken.circulatingSupply() `view` `9358928b`





## *function* setTradingLive

DataeumToken.setTradingLive() `nonpayable` `9561f0d8`

**One-way toggle to allow trading (remove global freeze)**





## *function* symbol

DataeumToken.symbol() `view` `95d89b41`





## *function* lockup

DataeumToken.lockup(wallet, duration) `nonpayable` `a7b86824`

**Prevents the given wallet to transfer its token for the given duration.     This methods resets the lock duration if one is already in place.**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | wallet | The wallet address to lock |
| *uint256* | duration | How much time is the token locked from now (in sec) |


## *function* transfer

DataeumToken.transfer(destination, amount) `nonpayable` `a9059cbb`

**Transfers `amount` from msg.sender to `destination`**

> This function is part of the ERC20 standard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | destination | The address that receives the tokens |
| *uint256* | amount | Token amount to transfer |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | success | If the operation completed successfuly |

## *function* approveAndCall

DataeumToken.approveAndCall(spender, tokenAmount, data) `nonpayable` `cae9ca51`

**Permits to create an approval on a contract and then call a method on the approved contract right away.**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | The allowed address |
| *uint256* | tokenAmount | The maximum amount allowed to spend |
| *bytes* | data | The data sent back as parameter to the contract (bytes array) |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | success | If the operation completed successfuly |

## *function* newOwner

DataeumToken.newOwner() `view` `d4ee1d90`





## *function* allowance

DataeumToken.allowance(tokenOwner, spender) `view` `dd62ed3e`

**Get the remaining allowance for a spender on a given address**

> This function is part of the ERC20 standard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | tokenOwner | The address that owns the tokens |
| *address* | spender | The spender |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | remaining | The amount of tokens remaining in the allowance |

## *function* transferOwnership

DataeumToken.transferOwnership(_newOwner) `nonpayable` `f2fde38b`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _newOwner | undefined |


## *function* distribute

DataeumToken.distribute(to, tokens) `nonpayable` `fb932108`

**distribute tokens to an address**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | Who will receive the token |
| *uint256* | tokens | How much token will be sent |


## *event* LockupApplied

DataeumToken.LockupApplied(owner, until) `fc68ae6b`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | until | not indexed |

## *event* Transfer

DataeumToken.Transfer(from, to, tokens) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | tokens | not indexed |

## *event* Approval

DataeumToken.Approval(tokenOwner, spender, tokens) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | tokenOwner | indexed |
| *address* | spender | indexed |
| *uint256* | tokens | not indexed |

## *event* OwnershipTransferred

DataeumToken.OwnershipTransferred(_from, _to) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | _from | indexed |
| *address* | _to | indexed |


---
# ApproveAndCallFallBack


## *function* receiveApproval

ApproveAndCallFallBack.receiveApproval(from, tokens, token, data) `nonpayable` `8f4ffcb1`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | undefined |
| *uint256* | tokens | undefined |
| *address* | token | undefined |
| *bytes* | data | undefined |


---
# ERC20Interface


## *function* approve

ERC20Interface.approve(spender, tokens) `nonpayable` `095ea7b3`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | undefined |
| *uint256* | tokens | undefined |


## *function* totalSupply

ERC20Interface.totalSupply() `view` `18160ddd`





## *function* transferFrom

ERC20Interface.transferFrom(from, to, tokens) `nonpayable` `23b872dd`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | undefined |
| *address* | to | undefined |
| *uint256* | tokens | undefined |


## *function* balanceOf

ERC20Interface.balanceOf(tokenOwner) `view` `70a08231`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | tokenOwner | undefined |


## *function* transfer

ERC20Interface.transfer(to, tokens) `nonpayable` `a9059cbb`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | undefined |
| *uint256* | tokens | undefined |


## *function* allowance

ERC20Interface.allowance(tokenOwner, spender) `view` `dd62ed3e`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | tokenOwner | undefined |
| *address* | spender | undefined |

## *event* Transfer

ERC20Interface.Transfer(from, to, tokens) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | tokens | not indexed |

## *event* Approval

ERC20Interface.Approval(tokenOwner, spender, tokens) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | tokenOwner | indexed |
| *address* | spender | indexed |
| *uint256* | tokens | not indexed |


---
# Owned


## *function* acceptOwnership

Owned.acceptOwnership() `nonpayable` `79ba5097`





## *function* owner

Owned.owner() `view` `8da5cb5b`





## *function* newOwner

Owned.newOwner() `view` `d4ee1d90`





## *function* transferOwnership

Owned.transferOwnership(_newOwner) `nonpayable` `f2fde38b`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _newOwner | undefined |


## *event* OwnershipTransferred

Owned.OwnershipTransferred(_from, _to) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | _from | indexed |
| *address* | _to | indexed |


---
# SafeMath


---