pragma solidity ^0.4.23;

import "./lib/Owned.sol";
import "./lib/SafeMath.sol";
import "./DataeumToken.sol";

/**
 * @title DataeumCrowdsale
 * @notice DataeumCrowdsale is the smart-contract responsible for handling
 * the Dataeum crowdsale event.
 */
contract DataeumCrowdsale is Owned {
    // Adding safe calculation methods to uint/uint256
    using SafeMath for uint256;

    // Is the crowdsale enabled
    bool public enabled = false;

    // Current price for the token distribution
    uint256 public rate = 12000;

    // Maximum amount (in Wei) than can be received
    uint256 public hardCap;

    // Minimum contribution to be met
    uint256 public minContrib;

    // Total amount raised
    uint256 public totalRaised;

    // Link to the Dataeum Contract
    DataeumToken public dataeumToken;

    // Wallet that receives the ETH when transaction is made
    address public dataeumWallet;

    // The address allowed to broadcast transaction to whitelist another address
    address public kycAdmin;

    // The mapping maintaining who is allowed to contribute
    mapping(address => bool) public whitelist;

    /**
     * @notice Event for Whitelist Status Update
     * @param target The address where status has been update
     * @param newStatus The new status applied to the address
     */
    event WhitelistStatusChanged(
        address indexed target,
        bool newStatus
    );

    /**
     * @notice Event for Crowdsale status update
     * @param newStatus The new status applied to the contract
     * @param timestamp The timestamp of the change
     */
    event CrowdsaleStatusChanged(
        bool newStatus,
        uint256 timestamp
    );

    /**
     * @notice Event for crowdsale settings updated
     * @param rate The distribution rate
     * @param minContrib the minimum amount to meet for a contribution
     * @param timestamp The timestamp of of the change
     */
    event CrowdsaleSettingsChanged(
        uint256 rate,
        uint256 minContrib,
        uint256 timestamp
    );

    /**
     * @notice Contract constructor
     * @param _dataeumWallet Total supply of token wanted
     * @param _kycAdmin total Supply of token wanted
     * @param _dataeumToken Address of the Dataeum Token
     * @param _hardCap Crowdsale hardcap (in Wei)
     */
    constructor(
        address _dataeumWallet,
        address _kycAdmin,
        DataeumToken _dataeumToken,
        uint256 _hardCap
    )
        public 
    {
        dataeumWallet = _dataeumWallet;
        dataeumToken = _dataeumToken;
        kycAdmin = _kycAdmin;
        hardCap = _hardCap;
    }

    /**
     * @notice Modifier that checks if a transaction is acceptable. Raise otherwise.
     * @param value The amount sent
     * @param sender The sender of the amount
     */
    modifier acceptable(uint256 value, address sender) {
        require(
            value >= minContrib && // solium-disable-line operator-whitespace
            totalRaised.add(value) < hardCap &&
            whitelist[sender]
        );
        _;
    }

    /**
     * @notice Modifier that checks if the crowdsale is enabled. Raise otherwise.
     */
    modifier crowdsaleEnabled() {
        require(enabled);
        _;
    }

    /**
     * @notice Allows an address to contribute (whitelist status).
     * @param target The address concerned by the change
     * @param status Is this address allowed to contribute (true => can contribute)
     */
    function setWhitelistStatus(
        address target,
        bool status
    )
        public
    {
        require(msg.sender == kycAdmin);
        whitelist[target] = status;
        emit WhitelistStatusChanged(target, status);
    }

    /**
     * @notice Starts or stops the crowdsale
     * @param _enabled If the crowdsale is running or not
     */
    function setEnabled(
        bool _enabled
    )
        public onlyOwner
    {
        enabled = _enabled;
        emit CrowdsaleStatusChanged(_enabled, block.timestamp); // solium-disable-line security/no-block-members
    }

    /**
     * @notice Updates the current parameters of the crowdsale.
     * @param _rate Multiplication factor between ETH to XDT
     * @param _minContrib Minimum contribution amount
     */
    function setParameters(
        uint256 _rate,
        uint256 _minContrib
    )
        public onlyOwner
    {
        rate = _rate;
        minContrib = _minContrib;
        emit CrowdsaleSettingsChanged(_rate, _minContrib, block.timestamp); // solium-disable-line security/no-block-members
    }

    /**
     * @notice Change the hardcap
     * @param _hardCap New hardcap amount
     */
    function setHardCap(
        uint256 _hardCap
    )
        public onlyOwner
    {
        require(_hardCap < hardCap && _hardCap >= totalRaised);
        hardCap = _hardCap;
    }

    /**
     * @notice Public payment fallback method, move the funds then release the tokens.
     */
    function() public payable acceptable(msg.value, msg.sender) crowdsaleEnabled {
        dataeumWallet.transfer(msg.value);
        makeAllocation(msg.value, msg.sender);
    }

    function otherCurrencyPayment(
        uint256 etherValue,
        address tokenReceiver
    )
        public onlyOwner acceptable(etherValue, tokenReceiver) crowdsaleEnabled
    {
        makeAllocation(etherValue, tokenReceiver);
    }

    /**
     * @notice Method that allocates token based on an ETH value to a given address
     * @param value Amount sent (in Wei)
     * @param target The address that will receive the tokens
     */
    function makeAllocation(
        uint256 value,
        address target
    )
        private
    {
        totalRaised = totalRaised.add(value);
        dataeumToken.transfer(target, value.mul(rate));
    }

    /**
     * @notice Method that gives the remaining tokens from the contract to the Dataeum wallet.
     */
    function withdraw() public onlyOwner {
        enabled = false;
        emit CrowdsaleStatusChanged(false, block.timestamp); // solium-disable-line security/no-block-members
        dataeumToken.transfer(dataeumWallet, dataeumToken.balanceOf(address(this)));
    }
}
