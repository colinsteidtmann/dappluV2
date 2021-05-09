const { expect } = require('chai');
const {utils, Contract} = require('ethers');
const {waffle} = require('hardhat');

const InfluencerAgreementFactory = require('../client/packages/contracts/src/deployments/artifacts/contracts/InfluencerAgreementFactory.sol/InfluencerAgreementFactory.json');
const InfluencerAgreement = require('../client/packages/contracts/src/deployments/artifacts/contracts/InfluencerAgreementFactory.sol/InfluencerAgreement.json');
const IERC20 = require('../client/packages/contracts/src/deployments/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json');
const LinkTokenInterface = require('../client/packages/contracts/src/deployments/artifacts/@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');
const AggregatorV3Interface = require('../client/packages/contracts/src/deployments/artifacts/@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol/AggregatorV3Interface.json');
const Oracle = require('../client/packages/contracts/src/deployments/artifacts/contracts/test/MockOracle.sol/MockOracle.json');
const IUniswapV2Router02 = require('../client/packages/contracts/src/deployments/artifacts/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol/IUniswapV2Router02.json');



describe('InfluencerAgreementFactory', () => {
  let mockERC20, mockLink, mockAggregator, mockIUniswap, mockOracle, factoryContract, brand, influencer, influencerAgreements;
  [brand, influencer] = waffle.provider.getWallets();

  beforeEach(async () => {
    mockERC20 = await waffle.deployMockContract(brand, IERC20.abi);
    mockLink = await waffle.deployMockContract(brand, LinkTokenInterface.abi);
    mockAggregator = await waffle.deployMockContract(brand, AggregatorV3Interface.abi);
    mockOracle = await waffle.deployMockContract(brand, Oracle.abi);
    mockIUniswap = await waffle.deployMockContract(brand, IUniswapV2Router02.abi);
    factoryContract = await waffle.deployContract(brand, InfluencerAgreementFactory, ['0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b', 'b7285d4859da4b289c7861db971baf0a', mockOracle.address, mockLink.address, '100000000000000000']);

    // mock function calls before creating new agreement
    await mockLink.mock.transferAndCall.returns(true);
    await mockERC20.mock.transfer.returns(100)

  });

  it('deploys new contract', async() => {
    let budget = 100;
    let payPerView = 1;
    await mockLink.mock.balanceOf.returns(utils.parseEther('5')); // give the factory contract 5 ether
    await mockLink.mock.approve.returns(true);
    await mockIUniswap.mock.WETH.returns('0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b'); // return random address for WETH
    await mockIUniswap.mock.swapExactETHForTokens.returns([budget,50]); // tell uniswap router to turn 100 wei into 50 tokens
    await factoryContract.newInfluencerAgreement(brand.address, influencer.address, (Date.now()+24*60*60), payPerView, budget, "", [18, 0, mockERC20.address, mockIUniswap.address, mockAggregator.address], {value: '100'});
    influencerAgreements = await factoryContract['getInfluencerContracts()']();
  });

  describe('InfluencerAgreement', () => {
    let agreementContract, details;

    // beforeEach(async () => {
    //   agreementContract = await ethers.getContractAt(InfluencerAgreement.abi, influencerAgreements[0]);
    //   // approve contract 
    //   //await agreementContract.connect(influencer).approveContract('6wgFliyJ4Bk');
    // })

    // it('has correct state', async() => {
    //   // details should be [brand, influencer, endDateTime, budget, payPerView, agreementStatus, mediaLink, viewCount, accumulatedPay]
    //   details = await agreementContract.getAgreementDetails();
    //   assert.equal(details[0], brand.address, "brand is correct")
    //   assert.equal(details[1], influencer.address, "influencer is correct")
    //   assert.closeTo(details[2].toNumber(), Math.round(Date.now()+24*60*60), 10000, "End date is correct")
    //   assert.equal(details[3].toNumber(), 50, "budget in swapped tokens is correct")
    //   assert.equal(details[4].toNumber(), 1, "pay per view is correct")
    //   assert.equal(details[5], 2, "status is correct, active")
    //   assert.equal(details[6], '6wgFliyJ4Bk', "media link is correct")
    // }) 

    // it('withdraws', async() => {
    //   await mockLink.mock.transferFrom.returns(utils.parseEther('2'));
    //   await agreementContract.connect(influencer).withdraw();
    //   //await agreementContract.viewCountFallback('0x313131', '0x64')
    // })

  })

});



// describe('InfluencerAgreementFactory', async function () {
//   let influencerAgreementFactory, mockOracle, mockContract, mockUniswapRouter, linkToken, brand, influencer, agreements, influencerAgreement

//   beforeEach(async () => {
//     await deployments.fixture(['mocks', 'factory'])

//     // Then, we can get the contracts like normal
//     const LinkToken = await deployments.get('LinkToken')
//     linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
//     const InfluencerAgreementFactory = await deployments.get('InfluencerAgreementFactory')
//     influencerAgreementFactory = await ethers.getContractAt('InfluencerAgreementFactory', InfluencerAgreementFactory.address)
//     // const InfluencerAgreementFactory = await ethers.getContractFactory("InfluencerAgreementFactory");
//     // influencerAgreementFactory = await upgrades.deployProxy(InfluencerAgreementFactory, ['0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b', 'b7285d4859da4b289c7861db971baf0a', '982105d690504c5d9ce374d040c08654', '100000000000000000', '0xa36085F69e2889c224210F603D836748e7dC0088']);

//     // influencerAgreementFactory = await InfluencerAgreementFactory.deploy('0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b', 'b7285d4859da4b289c7861db971baf0a', '982105d690504c5d9ce374d040c08654', '100000000000000000', '0xa36085F69e2889c224210F603D836748e7dC0088');
//     const MockOracle = await deployments.get('MockOracle');
//     mockOracle = await ethers.getContractAt('MockOracle', MockOracle.address);
    // const MockContract = await deployments.get('MockContract');
    // mockContract = await ethers.getContractAt('MockContract', MockContract.address);
//     [brand, influencer] = await ethers.getSigners()
//   })

//   it("Should throw error if creates contact without LINK", async function () {
//     // try {
//     //   await influencerAgreementFactory.newInfluencerAgreement(brand.address, influencer.address, (Date.now()+24*60*60), 1, 100, "", [18,0,'0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', '0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad'], {value: '100'});
//     //   assert.fail("The transaction should have thrown an error");
//     // }
//     // catch (err) {
//     //     assert.include(err.message, "revert", "The error message should contain 'revert'");
//     // }
//   })

//   // it("Should throw error if budget != msg.value", async function () {
//   //   try {
//   //     await linkToken.transfer(influencerAgreementFactory.address, '5000000000000000000')
//   //     await influencerAgreementFactory.newInfluencerAgreement(brand.address, influencer.address, (Date.now()+24*60*60), 1, 100, "", [18,0,'0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', '0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad'], {value: '10'});
//   //     assert.fail("The transaction should have thrown an error");
//   //   }
//   //   catch (err) {
//   //       assert.include(err.message, "revert", "The error message should contain 'revert'");
//   //   }
//   // })

//   // it("Should throw error if budget < pay per view", async function () {
//   //   try {
//   //     await linkToken.transfer(influencerAgreementFactory.address, '5000000000000000000')
//   //     await influencerAgreementFactory.newInfluencerAgreement(brand.address, influencer.address, (Date.now()+24*60*60), 101, 100, "", 0, {value: '100'});
//   //     assert.fail("The transaction should have thrown an error");
//   //   }
//   //   catch (err) {
//   //       assert.include(err.message, "revert", "The error message should contain 'revert'");
//   //   }
//   // })

//   // it("Should throw error if brand == influencer", async function () {
//   //   try {
//   //     await linkToken.transfer(influencerAgreementFactory.address, '5000000000000000000')
//   //     await influencerAgreementFactory.newInfluencerAgreement(brand.address, brand.address, Math.round((Date.now()/1000)+24*60*60), 1, 100, "", 0, {value: '100'});
//   //     assert.fail("The transaction should have thrown an error");
//   //   }
//   //   catch (err) {
//   //       assert.include(err.message, "revert", "The error message should contain 'revert'");
//   //   }
//   // })

//   // it("Should throw error if end date is in the past", async function () {
//   //   try {
//   //     await linkToken.transfer(influencerAgreementFactory.address, '5000000000000000000')
//   //     await influencerAgreementFactory.newInfluencerAgreement(brand.address, influencer.address, Math.round((Date.now()/1000)-24*60*60), 1, 100, "", 0, {value: '100'});
//   //     assert.fail("The transaction should have thrown an error");
//   //   }
//   //   catch (err) {
//   //       assert.include(err.message, "revert", "The error message should contain 'revert'");
//   //   }
//   // })




//   describe('InfluencerAgreement', async function () {
//     beforeEach(async () => {
//       await linkToken.transfer(influencerAgreementFactory.address, '5000000000000000000')
//       await mockContract.givenAnyReturnBool(true);
//       await mockContract.givenAnyReturnAddress('0x0000000000000000000000000000000000000000');
//     })

//     it("Should not throw error if creates contact with LINK", async function () {
//       await influencerAgreementFactory.newInfluencerAgreement(brand.address, influencer.address, (Date.now()+24*60*60), 1, 100, "", [18,0,mockContract.address, mockContract.address, mockContract.address], {value: '100'});
//     })

//     it('Should not approve contract if brand', async () => {
//       // try {
//       //   await influencerAgreement.connect(brand).approveContract("6wgFliyJ4Bk")
//       //   assert.fail("The transaction should have thrown an error");
//       // }
//       // catch (err) {
//       //     assert.include(err.message, "revert", "The error message should contain 'revert'");
//       // }
//     })


//     // describe('InfluencerAgreement Approved', async function () {
//     //   beforeEach(async () => {
//     //     await influencerAgreement.connect(influencer).approveContract("6wgFliyJ4Bk")   
//     //   })

//     //   it('Should get contract details', async () => {
//     //     var details = await influencerAgreement.getAgreementDetails()
        // assert.equal(details[0], brand.address, "brand is correct")
        // assert.equal(details[1], influencer.address, "influencer is correct")
        // assert.closeTo(details[2].toNumber(), Math.round((Date.now()/1000)+24*60*60), 10, "End date is correct")
        // assert.equal(details[3].toNumber(), 100, "budget is correct")
        // assert.equal(details[4].toNumber(), 1, "pay per view is correct")
        // assert.equal(details[5], 3, "status is correct")
        // assert.equal(details[6], '6wgFliyJ4Bk', "media link is correct")
//     //   })

//     // })


//   })


// })



