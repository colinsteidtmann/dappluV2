// import erc20Abi from "./abis/erc20.json";
// import ownableAbi from "./abis/ownable.json";
import influencerAgreementFactory from "./deployments/kovan/InfluencerAgreementFactory"
import influencerAgreement from "./deployments/artifacts/contracts/InfluencerAgreementFactory.sol/InfluencerAgreement"
import aggregatorV3Interface from "./deployments/artifacts/@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol/AggregatorV3Interface"

const abis = {
  // erc20: erc20Abi,
  // ownable: ownableAbi,
  InfluencerAgreementFactory: influencerAgreementFactory.abi,
  InfluencerAgreement: influencerAgreement.abi,
  AggregatorV3Interface: aggregatorV3Interface.abi
};

export default abis;
