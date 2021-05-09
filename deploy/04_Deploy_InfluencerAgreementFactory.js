const fs = require('fs');
let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let oracle
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    MockOracle = await get('MockOracle')
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    oracle = networkConfig[chainId]['oracle']
  }
  const bytesJobId = networkConfig[chainId]['bytesJobId']
  const uintJobId = networkConfig[chainId]['uintJobId']
  const fee = networkConfig[chainId]['fee']

  const influencerAgreements = await deploy('InfluencerAgreementFactory', {
    from: deployer,
    args: [oracle, bytesJobId, uintJobId, fee, linkTokenAddress],
    log: true
  })

  log("Run the following command to fund contract with LINK:")
  log("npx hardhat fund-link --contract " + influencerAgreements.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  log("Then run influencerAgreements contract with following command:")
  log("npx hardhat request-data --contract " + influencerAgreements.address + " --network " + networkConfig[chainId]['name'])
}

module.exports.tags = ['all', 'factory']
