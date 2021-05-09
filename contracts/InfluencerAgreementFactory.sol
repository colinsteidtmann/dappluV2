// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

//Truffle Imports
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/vendor/Ownable.sol";
import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";
import "@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "hardhat/console.sol";

//Remix Imports
// import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";
// import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/vendor/Ownable.sol";
// import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/vendor/SafeMathChainlink.sol";
// import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/interfaces/LinkTokenInterface.sol";
// import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
// import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";
// import "./IERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/proxy/Initializable.sol";


contract InfluencerAgreementFactory  {

    using SafeMathChainlink
    for uint256;

    // passed to individual agreement
    struct ChainlinkVars {
        bytes32 bytes32JobId;
        bytes32 uintJobId;
        address oracle;
        LinkTokenInterface link;
        uint256 oraclePayment;
    }

    ChainlinkVars private chainlinkVars;
    InfluencerAgreement[] private influencerAgreements;

    // wallet of contract creator
    address payable private platformWallet;

    modifier onlyOwner() {
        require(platformWallet == msg.sender, 'Only Provider');
        _;
    }

    event influencerAgreementCreated(address _newAgreement);

    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Bytes Job ID: 50fc4215f89443d185b061e5d7af9490
     * Uint Job ID: b6602d14e4734c49a5e1ce19d45a4632
     * Fee: 0.1 LINK
     * LINK: 0xa36085F69e2889c224210F603D836748e7dC0088
     */

    constructor(address _oracle, string memory _bytesJobId, string memory _uintJobId, uint256 _fee, LinkTokenInterface _link) public {
        chainlinkVars = ChainlinkVars(stringToBytes32(_bytesJobId), stringToBytes32(_uintJobId), _oracle, _link, _fee);
        platformWallet = msg.sender;
    }

    // remix constructor
    // constructor() public {
    //     bytes32 bytesJobId = '50fc4215f89443d185b061e5d7af9490';
    //     bytes32 uintJobId = 'b6602d14e4734c49a5e1ce19d45a4632';
    //     LinkTokenInterface LINK = LinkTokenInterface(0xa36085F69e2889c224210F603D836748e7dC0088);
    //     address oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
    //     uint linkFee = 0.1 * 10 ** 18;
    //     chainlinkVars = ChainlinkVars(bytesJobId, uintJobId, oracle, LINK, linkFee);
    //     platformWallet = msg.sender;
    // }


    /**
     * @dev Create a new Influencer Agreement. Once it's created, all logic & flow is handled from within the InfluencerAgreement Contract
     */
    // Kovan WETH
    // uint128 tokenDecimals: 18
    // TokenOption tokenOption: 0
    // address tokenAddress: 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa // dai
    // address uniswapRouter: 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    // address tokenPriceFeed: 0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad
    // Remix [18, 0, 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa, 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D, 0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad]
    // Remix InfluencerAgreement.TokenVars(18, InfluencerAgreement.TokenOption.NONE, 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa, 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D, 0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad)
    function newInfluencerAgreement(address payable _brand, address payable _influencer, uint256 _endDateTime, uint256 _payPerView, uint256 _budget,
        string memory _fileHash, InfluencerAgreement.TokenVars memory _tokenVars) external payable returns(address) {
        //require brand must be different than influencer
        require(_brand != _influencer, 'Brand cannot = influencer');

        //require budget equals money sent to contract
        require(_budget == msg.value, "budget must = msg.value");

        //require budget is greater than or equal to the pay per view amount
        require(_budget >= _payPerView, "budget must be >= ppv");

        //require end date is not in past
        require(_endDateTime >= now, "end date >= now");

        //create new Influencer Agreement
        InfluencerAgreement a = new InfluencerAgreement {
            value: _budget
        }(_brand, _influencer, _endDateTime, _payPerView, _budget, _fileHash, chainlinkVars, _tokenVars);

        //store new agreement in array of agreements
        influencerAgreements.push(a);

        // emit influencer agreement created event
        emit influencerAgreementCreated(address(a));

        //now that contract has been created, we need to fund it with enough LINK tokens to fulfil 1 Oracle request (submit one Youtube Media ID)
        // Let the influencer contract request as much link as it needs
        chainlinkVars.link.approve(address(a), chainlinkVars.link.balanceOf(address(this)));

        return address(a);
    }

    //remix newInfluencerAgreement
    // function newInfluencerAgreement() external payable returns(address) {
    //     address payable _brand = 0x181af5Fc47b5c276BE283B40AFD5A1b0219e8312;
    //     address payable _influencer = 0xCDa3D794F33aDAccEe25d3CDA26977927377e4b4;
    //     uint256 _endDateTime = now + 360;
    //     uint256 _payPerView = 1;
    //     uint256 _budget = 100;
    //     string memory _fileHash = "";
    //     InfluencerAgreement.TokenVars memory _tokenVars = InfluencerAgreement.TokenVars(18, InfluencerAgreement.TokenOption.NONE, IERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa), IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D), AggregatorV3Interface(0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad));
    //     //require brand must be different than influencer
    //     require(_brand != _influencer, 'Brand cannot = influencer');

    //     //require budget equals money sent to contract
    //     require(_budget == msg.value, "budget must = msg.value");

    //     //require budget is greater than or equal to the pay per view amount
    //     require(_budget >= _payPerView, "budget must be >= ppv");

    //     //require end date is not in past
    //     require(_endDateTime >= now, "end date >= now");

    //     //create new Influencer Agreement
    //     InfluencerAgreement a = new InfluencerAgreement {
    //         value: _budget
    //     }(_brand, _influencer, _endDateTime, _payPerView, _budget, _fileHash, chainlinkVars, _tokenVars);

    //     //store new agreement in array of agreements
    //     influencerAgreements.push(a);

    //     // emit influencer agreement created event
    //     emit influencerAgreementCreated(address(a));

    //     //now that contract has been created, we need to fund it with enough LINK tokens to fulfil 1 Oracle request (submit one Youtube Media ID)
    //     // Let the influencer contract request as much link as it needs
    //     chainlinkVars.link.approve(address(a), chainlinkVars.link.balanceOf(address(this)));

    //     return address(a);
    // }

    /**
     * @dev Return all influencer contract addresses
     */
    function getInfluencerContracts() external view returns(InfluencerAgreement[] memory) {
        return influencerAgreements;
    }

    /**
     * @dev Return a particular Influencer Contract based on a influencer contract address
     * Returns (addess brand, address influencer, int endDate, int budget, int payPerView, enum agreementStatus, int viewCount, int accumulatedPay, enum tokenOption, string mediaLink, string fileHash)
     */
    function getInfluencerContract(address _influencerContract) external view returns(address, address, uint256, uint256, uint256, InfluencerAgreement.Status,
        uint256, uint256, InfluencerAgreement.TokenOption, string memory, string memory) {
        //loop through list of contracts, and find any belonging to the address
        for (uint256 i = 0; i < influencerAgreements.length; i++) {
            if (address(influencerAgreements[i]) == _influencerContract) {
                return influencerAgreements[i].getAgreementDetails();
            }
        }

    }

    /**
     * @dev Return a list of influencer contract addresses belonging to a particular brand or influencer
     *      _owner = 0 means influencer, 1 = brand
     */
    function getInfluencerContracts(uint256 _owner, address _address) external view returns(address[] memory) {
        //loop through list of contracts, and find any belonging to the address & type (influencer or brand)
        //_owner variable determines if were searching for agreements for the brand or influencer
        //0 = influencer & 1 = brand
        uint256 finalResultCount = 0;

        //because we need to know exact size of final memory array, first we need to iterate and count how many will be in the final result
        for (uint256 i = 0; i < influencerAgreements.length; i++) {
            if (_owner == 1) { //brand scenario
                if (influencerAgreements[i].getBrand() == _address) {
                    finalResultCount = finalResultCount + 1;
                }
            } else { //influencer scenario
                if (influencerAgreements[i].getInfluencer() == _address) {
                    finalResultCount = finalResultCount + 1;
                }
            }
        }

        //now we have the total count, we can create a memory array with the right size and then populate it
        address[] memory addresses = new address[](finalResultCount);
        uint256 addrCountInserted = 0;

        for (uint256 j = 0; j < influencerAgreements.length; j++) {
            if (_owner == 1) { //brand scenario
                if (influencerAgreements[j].getBrand() == _address) {
                    addresses[addrCountInserted] = address(influencerAgreements[j]);
                    addrCountInserted = addrCountInserted + 1;
                }
            } else { //influencer scenario
                if (influencerAgreements[j].getInfluencer() == _address) {
                    addresses[addrCountInserted] = address(influencerAgreements[j]);
                    addrCountInserted = addrCountInserted + 1;
                }
            }
        }

        return addresses;
    }

    /**
     * @dev Emergancy termination sending all contracts funds back to contract creator
     */
    function emergencyTermination() external onlyOwner() {
        platformWallet.call.value(address(this).balance)("");
        require(chainlinkVars.link.transfer(platformWallet, chainlinkVars.link.balanceOf(address(this))), "Unable to transfer");
    }

    
    /**
     * @dev helper function to turn string to bytes32
     */
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    /**
     * @dev receive Ether function
     */
    receive() external payable {}

}

contract InfluencerAgreement is ChainlinkClient, Ownable {

    using SafeMathChainlink
    for uint256;

    // Agreement status
    enum Status {
        PROPOSED,
        REJECTED,
        ACTIVE,
        COMPLETED,
        ENDED_ERROR
    }
    Status private agreementStatus;

    // currencies agreement can store funds in
    enum TokenOption {
        NONE,
        USDT,
        USDC,
        DAI
    }

    //token variables to work with agreement's funds
    struct TokenVars {
        uint128 tokenDecimals;
        TokenOption tokenOption;
        IERC20 TOKEN;
        IUniswapV2Router02 uniswapRouter;
        AggregatorV3Interface priceFeed;
    }
    TokenVars private tokenVars;

    //chainlink variables
    InfluencerAgreementFactory.ChainlinkVars private chainlinkVars;
    
    // contract variables
    address payable private dappWallet = msg.sender; //influencer agreement factory address
    address payable private brand;
    address payable private influencer;
    uint256 private endDateTime;
    uint256 private payPerView;
    uint256 private budget;
    string private mediaLink;
    string private fileHash;
    string private API_KEY = "&key=AIzaSyB8UEknqf0DmdJW5Ow6rGP8co7I_dZEhwo";
    string private BASE_URL = "https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=";


    //variables for calulating final 
    uint256 private viewCount; //how many views their content's gathered
    uint256 private accumulatedPay; //how much they've already withdrawn
    uint256 constant private PLATFORM_FEE = 1; //What percentage of the withdrawn amount goes to the Platform.

    //List of events
    event influencerAgreementCreated(Status agreementStatus);
    event influencerAgreementAccepted(string mediaLink);
    event influencerPaid(address influencer, uint256 amount);


    /**
     * @dev Modifier to check if the brand is calling the transaction
     */
    modifier onlyBrand() {
        require(brand == msg.sender, 'Must be Brand');
        _;
    }

    /**
     * @dev Modifier to check if the influncer is calling the transaction
     */
    modifier onlyInfluencer() {
        require(influencer == msg.sender, 'Must be Influencer');
        _;
    }


    /**
     * @dev Prevents a function being run unless contract is proposed
     */
    modifier onlyContractProposed() {
        require(agreementStatus == Status.PROPOSED, 'Contract must be PROPOSED');
        _;
    }

    /**
     * @dev Prevents a function being run unless contract is still active
     */
    modifier onlyContractActive() {
        require(agreementStatus == Status.ACTIVE, 'Contract must be ACTIVE');
        _;
    }

    /**
     * @dev Prevents a function being run unless contract is proposed or still active
     */
    modifier onlyContractProposedOrActive() {
        require(agreementStatus == Status.PROPOSED || agreementStatus == Status.ACTIVE, 'Contract must be PROPOSED or ACTIVE');
        _;
    }


    /**
     * @dev Step 01: Generate a contract in PROPOSED status
     * params(address brand, address influencer, int endDate, int payPerView, int budget, string fileHash, struct chainlinkVars{bytes32 bytes32JobId, bytes32 uintJobId, address oracle, address link, int oraclePayment}, struct tokenInitVars{int tokenDecimals, TokenOption tokenOption(NONE, USDT, USDC, DAI), address tokenAddress, address uniswapRouter, address tokenPriceFeed}){value: budget}
     */
    constructor(
        address payable _brand, address payable _influencer, uint256 _endDateTime, uint256 _payPerView, uint256 _budget, string memory _fileHash, InfluencerAgreementFactory.ChainlinkVars memory _chainlinkVars, 
        TokenVars memory _tokenVars
    ) payable Ownable() public {
        // initialize variables required for Chainlink Node interaction
        chainlinkVars = _chainlinkVars;
        setChainlinkToken(address(chainlinkVars.link));
        setChainlinkOracle(chainlinkVars.oracle);

        // now initialize values for the contract
        brand = _brand;
        influencer = _influencer;
        endDateTime = _endDateTime;
        budget = _budget;
        payPerView = _payPerView;
        agreementStatus = Status.PROPOSED;
        fileHash = _fileHash;
        // now initialize values for the token and convert contract's eth to token
        tokenVars = _tokenVars;
        convertEthToToken(budget);

        emit influencerAgreementCreated(agreementStatus);
    }

    /**
     * @dev Step 02a: Influencer ACCEPTS proposal, contract becomes ACTIVE
     */
    function approveContract(string memory _mediaLink) external onlyInfluencer() onlyContractProposedOrActive() {
        //Influencer looks at proposed agreement & either approves or denies it.
        //To accept it, the influencer must upload a link to their media.
        // Only influencer can run this, contract must be in PROPOSED status
        mediaLink = _mediaLink;

        //In this case, we approve. Contract becomes Active 
        agreementStatus = Status.ACTIVE;

        //finally, schedule contract termination date
        requestTermination(endDateTime);

        emit influencerAgreementAccepted(mediaLink);
    }

    /**
     * @dev Step 02b: Influencer REJECTS proposal, contract becomes REJECTED. This is the end of the line for the Contract
     */
    function rejectContract() external onlyInfluencer() onlyContractProposed() {
        //Influencer looks at proposed agreement & either approves or denies it.
        //Only influencer can call this function
        //In this case, we approve. Contract becomes Rejected. No more actions should be possible on the contract in this status
        //return money to brand
        require(tokenVars.TOKEN.transfer(brand, tokenVars.TOKEN.balanceOf(address(this))), "Unable to transfer");


        //return any LINK tokens in here back to the DAPP wallet
        require(chainlinkVars.link.transfer(dappWallet, chainlinkVars.link.balanceOf(address(this))), "Unable to transfer");

        //Set status to rejected. This is the end of the line for this agreement
        agreementStatus = Status.REJECTED;

    }

    /**
     * @dev Step 03: Contract ends. Transfers out remaining funds to brand and dappWallet
     */
    function endContract() internal {
        //prevent re-entrency
        uint contractFunds = tokenVars.TOKEN.balanceOf(address(this));

        //Total to go to platform = base fee / platform fee %
        uint totalPlatformFee = (contractFunds.mul(PLATFORM_FEE)).div(100);

        //Transfer remaining balnce to brand
        require(tokenVars.TOKEN.transfer(brand, contractFunds - totalPlatformFee), "Unable to transfer");
        require(tokenVars.TOKEN.transfer(dappWallet, totalPlatformFee), "Unable to transfer");

        //return any LINK tokens in here back to the DAPP wallet
        require(chainlinkVars.link.transfer(dappWallet, chainlinkVars.link.balanceOf(address(this))), "Unable to transfer");

    }


    /**
     * @dev Get view count on a video. Ensure its not past the contract deadline and contract is active
     */
    function getViewCount() internal onlyContractActive() returns(bytes32 requestId) {
        // check Link in this contract to see if we need to request more before proceeding
        checkLINK();

        // Get video view count
        Chainlink.Request memory req = buildChainlinkRequest(chainlinkVars.bytes32JobId, address(this), this.withdrawFallback.selector);
        bytes memory url_bytes = abi.encodePacked(BASE_URL, mediaLink, API_KEY);
        req.add("get", string(url_bytes));
        // Set the path to find the desired data in the API response, where the response format is:
        //  {
        //   "kind": "youtube#videoListResponse",
        //   "etag": "ZmcX3BsmhS9iLumLv4kaVxnfeZ8",
        //   "items": [
        //     {
        //       "kind": "youtube#video",
        //       "etag": "oW3as3wjv-heYr4pGVlHnmFRgKw",
        //       "id": "Ks-_Mh1QhMc",
        //       "statistics": {
        //         "viewCount": "19255415",
        //         "likeCount": "285037",
        //         "dislikeCount": "5512",
        //         "favoriteCount": "0",
        //         "commentCount": "8580"
        //       }
        //     }
        //   ],
        //   "pageInfo": {
        //     "totalResults": 1,
        //     "resultsPerPage": 1
        //   }
        // }
        req.add("path", "items.0.statistics.viewCount");
        return sendChainlinkRequestTo(chainlinkOracleAddress(), req, chainlinkVars.oraclePayment);
    }

    /**
     * @dev Callback function for getting the view count on a video, then transfers funds to influencer and ends contract if needed
     */
    function withdrawFallback(bytes32 _requestId, bytes32 _viewCount) public recordChainlinkFulfillment(_requestId) {
        //Set contract variables to start the agreement
        string memory _viewCountString = bytes32ToString(_viewCount);
        viewCount = uint256(parseInt(_viewCountString, 0));

        //Turn string total view count into an int and calculate pay for influencer
        uint256 budgetRmaining = tokenVars.TOKEN.balanceOf(address(this));
        uint256 pay = (payPerView * viewCount) - accumulatedPay;
        if (pay > budgetRmaining) {
            pay = budgetRmaining;
        }

        //Total to go to platform = base fee / platform fee %
        uint totalPlatformFee = (pay.mul(PLATFORM_FEE)).div(100);

        // transfer and update accumulatedPay and remaining budget
        require(tokenVars.TOKEN.transfer(influencer, pay - totalPlatformFee), "Unable to transfer");
        require(tokenVars.TOKEN.transfer(dappWallet, totalPlatformFee), "Unable to transfer");

        accumulatedPay += pay;

        // emit influencer paid event
        emit influencerPaid(influencer, pay);

        //Now if contract completed, keep transferring out money
        if (agreementStatus == Status.COMPLETED) {
            endContract();
        }

    }

    /**
     * Create a Chainlink request to schedule the termination 
     * of this contract and make the final function calls
     * 
     */
    function requestTermination(uint256 date) internal returns(bytes32 requestId) {
        // check Link in this contract to see if we need to request more before proceeding
        checkLINK();

        Chainlink.Request memory req = buildChainlinkRequest(chainlinkVars.uintJobId, address(this), this.fulfillTermination.selector);
        req.addUint("until", date);
        return sendChainlinkRequestTo(chainlinkOracleAddress(), req, chainlinkVars.oraclePayment);
    }

    /**
     * Receive the termnation response in the form of uint256
     */
    function fulfillTermination(bytes32 _requestId) public recordChainlinkFulfillment(_requestId) {
        //end contract
        agreementStatus = Status.COMPLETED;
        getViewCount();
    }

    /**
     * @dev convert wei to stable coin
     */
    function convertEthToToken(uint _weiAmount) internal {
        uint256 deadline = block.timestamp + 15; 

        //uniswap required path. First element is input token, second is output token
        // set input token as wei and output as token
        address[] memory path = new address[](2);
        path[0] = tokenVars.uniswapRouter.WETH();
        path[1] = address(tokenVars.TOKEN);

        // get minimum amount of stable coin we'll accept for this conversion
        // ensure we don't get ripped off
        uint256 amountOutMin;
        uint256 tokenEthPrice = getLatestTokenEthPrice();
        if (tokenVars.tokenOption == TokenOption.NONE) {
            amountOutMin = _weiAmount;
        } else {
            amountOutMin = (_weiAmount.mul(99).mul(10**tokenVars.tokenDecimals)).div(tokenEthPrice.mul(100));
        }
        

        // swaps = The input token amount and all subsequent output token amounts.
        uint256[] memory swaps = tokenVars.uniswapRouter.swapExactETHForTokens {
            value: _weiAmount
        }(amountOutMin, path, address(this), deadline);

        // refund leftover ETH to the brand
        (bool success, ) = (brand).call {
            value: (address(this)).balance
        }("");
        require(success, "refund failed");

        // set budget to token amount
        budget = swaps[1];
        payPerView = (payPerView.mul(10**tokenVars.tokenDecimals)).div(tokenEthPrice);
    }

    /**
     * @dev convert stable coin to stable wei
     */
    function convertTokenToEth(uint _tokenAmount) internal {
        //first appprove the router to withdraw the token
        require(tokenVars.TOKEN.approve(address(tokenVars.uniswapRouter), _tokenAmount), 'approve failed.');
        
        //thencontinue as normal
        uint256 deadline = block.timestamp + 15; 

        //uniswap required path. First element is input token, second is output token
        // set input token as wei and output as token
        address[] memory path = new address[](2);
        path[0] = address(tokenVars.TOKEN);
        path[1] = tokenVars.uniswapRouter.WETH();

        // get minimum amount of wei we'll accept for this conversion
        // ensure we don't get ripped off
        uint256 amountOutMin;
        if (tokenVars.tokenOption == TokenOption.NONE) {
            amountOutMin = _tokenAmount;
        } else {
            amountOutMin = (_tokenAmount.mul(getLatestTokenEthPrice()).mul(99)).div(100*(10**tokenVars.tokenDecimals));
        }
        

        // swaps = The input token amount and all subsequent output token amounts.
        uint256[] memory swaps = tokenVars.uniswapRouter.swapExactTokensForETH(_tokenAmount, amountOutMin, path, address(this), deadline);
    }


    /**
     * @dev get wei/token. eg. returns 353420000000000 wei per tether
     */
    function getLatestTokenEthPrice() internal view returns(uint256) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = tokenVars.priceFeed.latestRoundData();

        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return uint256(price);
    }


    /**
     * @dev withdraw money
     */
    function withdraw() external onlyInfluencer() {
        // call getViewCount() transfer funds to influencer
        getViewCount();

    }


    /**
     * @dev Checks how much LINK is in the contract and requests more from the factory if necessary. Returns link remaining at the end.
     *      Only this contrac can call it
     */
    function checkLINK() internal returns(uint256) {
        uint256 linkRemaining = chainlinkVars.link.balanceOf(address(this));

        // Request another LINK token if the contract's remaining link gets too low
        if (linkRemaining < 1 ether) {
            require(chainlinkVars.link.transferFrom(dappWallet, address(this), 1 ether), "Unable to transfer");
        }

        return (chainlinkVars.link.balanceOf(address(this)));
    }

    /**
     * @dev Get address of the chainlink token
     */
    function getChainlinkToken() public view returns(address) {
        return chainlinkTokenAddress();
    }


    /**
     * @dev Return All Details about a Influencer Agreement
     * Returns (addess brand, address influencer, int endDate, int budget, int payPerView, enum agreementStatus, int viewCount, int accumulatedPay, enum tokenOption, string mediaLink, string fileHash)
     */
    function getAgreementDetails() external view returns(address, address, uint256, uint256, uint256, Status,
        uint256, uint256, TokenOption, string memory, string memory) {
        return (brand, influencer, endDateTime, budget, payPerView, agreementStatus, viewCount, accumulatedPay, tokenVars.tokenOption, mediaLink, fileHash);
    }
    
    /**
     * @dev Get brand address
     */
    function getBrand() external view returns(address) {
        return brand;
    }
    
    /**
     * @dev Get influencer address
     */
    function getInfluencer() external view returns(address) {
        return influencer;
    }

    /**
     * @dev Emergancy termination sending all contracts funds back to contract creator
     */
    function emergencyTermination() external onlyOwner() { 
        // transfer link       
        require(chainlinkVars.link.transfer(dappWallet, chainlinkVars.link.balanceOf(address(this))), "Unable to transfer");
        // convert token to eth and transfer
        convertTokenToEth(tokenVars.TOKEN.balanceOf(address(this)));
        dappWallet.call.value(address(this).balance)("");
    }


    /**
     * @dev converts bytes32 to string
     */
    function bytes32ToString(bytes32 _bytes32) internal pure returns(string memory) {
        uint256 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }



    /**
     * @dev converts a string to an int. _b is the power of 10 to multiply it by.
     */
    function parseInt(string memory _a, uint _b) internal pure returns(int) {
        bytes memory bresult = bytes(_a);
        int mint = 0;
        bool decimals = false;
        bool negative = false;
        for (uint i = 0; i < bresult.length; i++) {
            if ((i == 0) && (bresult[i] == '-')) {
                negative = true;
            }
            if ((uint8(bresult[i]) >= 48) && (uint8(bresult[i]) <= 57)) {
                if (decimals) {
                    if (_b == 0) break;
                    else _b--;
                }
                mint *= 10;
                mint += uint8(bresult[i]) - 48;
            } else if (uint8(bresult[i]) == 46) decimals = true;
        }
        if (_b > 0) mint *= int(10 ** _b);
        if (negative) mint *= -1;
        return mint;
    }

    /**
     * @dev fallback function
     */
    receive() payable external {}



}