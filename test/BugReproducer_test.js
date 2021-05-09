// const { expect } = require('chai');
// const {utils, Contract} = require('ethers');
// const {waffle} = require('hardhat');


// const LinkTokenInterface = require('../client/packages/contracts/src/deployments/artifacts/@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');
// const BugReproducer = require('../client/packages/contracts/src/deployments/artifacts/contracts/test/BugReproducer.sol/BugReproducer.json');


// describe('BugReproducer', () => {
//   let mockToken, bugContract;
//   [primary, secondary] = waffle.provider.getWallets();

//   beforeEach(async () => {
//     mockToken = await waffle.deployMockContract(primary, LinkTokenInterface.abi);
//     bugContract = await waffle.deployContract(primary, BugReproducer, [mockToken.address]);
//   });

//   it('gets an error', async() => {
//     await mockToken.mock.transferAndCall.returns(true);
//     bugContract.getError();
//   })

// });
