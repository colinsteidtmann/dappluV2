import React, { useState } from "react";
// Components
import OnboardingButton from "#Home/MetamaskOnboarding";
import { ENSDisplay } from "#ContractsSharedComponents";
import { FormInput, FormInputGroup, ValidationDisplay, Modal } from "#GlobalSharedComponents";
import {useValidation} from "#Hooks";
// Helper functions
const axios = require("axios");
const ipfs = window.IpfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const CreateContract = (props) => {
  const [formVars, setFormVars] = useState({
    brandAddress: "",
    influencerAddress: "",
    endDate: new Date(),
    payPerView: 0,
    budget: 0,
    stablecoin: 0,
  });
  const [fileBuffer, setFileBuffer] = useState(null);
  const [contractPending, setContractPending] = useState(false);
  const [hasError, addKeyToErrors, removeKeyFromErrors] = useValidation();

  //=========================Form Helper Functions==================================

  // Function to search address or name on ENS. If name is found, returns resolved address, otherwise, returns search
  const resolveAddress = async (search) => {
    try {
      var res = await axios.post("https://api.thegraph.com/subgraphs/name/ensdomains/ens", {
        query: `
        {
          domains(where: {name: "${search.toLowerCase()}"}) {
            resolvedAddress {
              id
            }
          }
        }
        `,
      });
      try {
        let addr = res.data.data.domains[0].resolvedAddress.id;
        return addr;
      } catch (err) {
        return search;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to convert uploaded file to file buffer for IPFS upload
  const getFileBuffer = (file) => {
    // get file buffer
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      return Buffer(reader.result);
    };
  };

  // Function to get IPFS hash to be sent to smart contract
  const getIPFSHash = async (fileBuffer) => {
    try {
      //IPFS upload
      const res = await ipfs.add(fileBuffer);
      const fileHash = res.path;
      return fileHash;
    } catch (err) {
      console.log(err);
    }
  };

  // ==================Validation Functions================================
  // Function that validates ethereum address input
  const validateAddress = (address, key) => {
    if (props.web3.utils.isAddress(address) === false) {
      // add key to errors array if its invalid and hasn't been added before
      addKeyToErrors(key);
    } else {
      // remove key if its now valid
      removeKeyFromErrors(key);
    }
  };

  // Validates contract end date input
  const validateEndDate = (endDate) => {
    // Fails validation if end date is earlier than time now + 2 minutes (120,000 ms)
    if (Math.round(new Date(endDate).getTime()) < Math.round(new Date().getTime()) + 120000) {
      addKeyToErrors("endDate");
    } else {
      removeKeyFromErrors("endDate");
    }
  };

  // Validates contract budget input
  const validateBudget = (payPerView, budget) => {
    // Pay per view must be < budget and both must be > 0
    payPerView = parseFloat(payPerView);
    budget = parseFloat(budget);
    if (payPerView > budget || payPerView <= 0 || budget <= 0) {
      addKeyToErrors("payPerView");
      addKeyToErrors("budget");
    } else if (payPerView < budget) {
      removeKeyFromErrors("payPerView");
      removeKeyFromErrors("budget");
    }
  };

  // ==================Smart Contract Functions=============================

  // Funtion to create new agreement using form input data
  const createAgreement = async () => {
    const { accounts, contract, currency, convertBetween } = props;
    //prep the form vars
    const fileHash = fileBuffer !== null ? await getIPFSHash(fileBuffer) : ""; //fileHash is empty string if no file uploaded
    const { brandAddress, influencerAddress, endDate, payPerView, budget, stablecoin } = formVars;
    const endDateUnix = Math.round(new Date(endDate).getTime() / 1000);
    // create agreement
    // address payable _brand, address payable _influencer, uint256 _endDateTime, uint256 _payPerView, uint256 _budget,
    //     string memory _fileHash,     struct TokenVars {
    //     uint128 tokenDecimals;
    //     TokenOption tokenOption;
    //     IERC20 TOKEN;
    //     IUniswapV2Router02 uniswapRouter;
    //     AggregatorV3Interface priceFeed;
    // }
    contract.methods
      .newInfluencerAgreement(
        brandAddress,
        influencerAddress,
        endDateUnix,
        convertBetween(payPerView, currency, 0), // convert from currency to wei
        convertBetween(budget, currency, 0),
        fileHash,
        [
          18, //token decimals
          stablecoin, //token option
          "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", //kovan ierc20 token
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", //uniswap router address
          "0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad", // price feed address
        ]
      )
      .send({ from: accounts[0], value: convertBetween(budget, currency, 0) })
      .catch(function (error) {
        console.log(error);
      });

    contract.once("influencerAgreementCreated", (error, event) => handleEvent(error, event));
  };

  //============================Form Submit functions==============================

  // Contract form calls this on submit. It initates create agreement and sets the contract UI status to pending
  const handleSubmit = (event) => {
    event.preventDefault();
    // Upload data to smart contract if web3 is working
    if (props.web3) {
      createAgreement();
      setContractPending(true);
    }
  };

  // One agreement created, this function closes the create agreement forn
  const handleEvent = (error, event) => {
    // close form
    props.setDisplayAgreementForm(false);

    // stop pending button loading symbol
    setContractPending(false);
  };

  //===========================UI Rendering Functions====================================

  // Constants to be used for rendering
  const currencySymbols = ["WEI", "ETH", "$", "£", "AU$"];
  const stablecoinSymbols = ["None", "USDT", "USDC", "DAI"];
  const currency = props.currency;
  const { brandAddress, influencerAddress, endDate, payPerView, budget, stablecoin } = formVars;
  return (
    <div>
      <form className="text-start py-3 px-3 my-5 border" noValidate onSubmit={handleSubmit}>
        <FormInput
          id="brandAddress"
          autoComplete="off"
          placeholder='try "alice.eth"'
          label="Brand Address"
          extras={<ENSDisplay address={brandAddress} id="brandENS" />}
          onChange={async (e) => {
            const resolvedAddress = await resolveAddress(e.target.value);
            setFormVars((prevState) => ({ ...prevState, brandAddress: resolvedAddress }));
            validateAddress(resolvedAddress, "brandAddress");
          }}
          hasError={brandAddress.length > 0 ? hasError("brandAddress") : null}
          required="required"
          validationText={
            <ValidationDisplay
              hasError={brandAddress.length > 0 ? hasError("brandAddress") : null}
              invalidFeedback="Invalid address entered"
            />
          }
        />

        <FormInput
          id="influencerAddress"
          autoComplete="off"
          label="Influencer Address"
          extras={<ENSDisplay address={influencerAddress} id="influencerENS" />}
          onChange={async (e) => {
            const resolvedAddress = await resolveAddress(e.target.value);
            setFormVars((prevState) => ({ ...prevState, influencerAddress: resolvedAddress }));
            validateAddress(resolvedAddress, "influencerAddress");
          }}
          hasError={influencerAddress.length > 0 ? hasError("influencerAddress") : null}
          required="required"
          validationText={
            <ValidationDisplay
              hasError={influencerAddress.length > 0 ? hasError("influencerAddress") : null}
              invalidFeedback="Invalid address entered"
            />
          }
        />

        <FormInput
          id="endDate"
          value={endDate}
          type="datetime-local"
          label="End Date"
          onChange={(e) => {
            setFormVars((prevState) => ({ ...prevState, endDate: e.target.value }));
            validateEndDate(e.target.value);
          }}
          hasError={endDate.length > 0 ? hasError("endDate") : null}
          required="required"
          validationText={
            <ValidationDisplay
              hasError={endDate.length > 0 ? hasError("endDate") : null}
              invalidFeedback="Invalid date. Must be after today"
            />
          }
        />

        <FormInputGroup
          id="payPerView"
          value={payPerView}
          label="Pay Per View"
          leftElement={currencySymbols[currency]}
          onChange={(e) => {
            setFormVars((prevState) => ({ ...prevState, payPerView: e.target.value }));
            validateBudget(e.target.value, budget);
          }}
          hasError={budget > 0 ? hasError("budget") : null}
          required="required"
          validationText={
            <ValidationDisplay
              hasError={budget > 0 ? hasError("budget") : null}
              invalidFeedback="Budget must be greater than pay per view amount. Both must be greater than 0."
            />
          }
        />

        <FormInputGroup
          id="budget"
          value={budget}
          label="Budget"
          leftElement={currencySymbols[currency]}
          onChange={(e) => {
            setFormVars((prevState) => ({ ...prevState, budget: e.target.value }));
            validateBudget(payPerView, e.target.value);
          }}
          hasError={budget > 0 ? hasError("budget") : null}
          required="required"
          validationText={
            <ValidationDisplay
              hasError={budget > 0 ? hasError("budget") : null}
              invalidFeedback="Budget must be greater than pay per view amount. Both must be greater than 0."
            />
          }
        />

        <FormInput
          id="writtenAgreement"
          label={
            <>
              Written Agreement Upload <small>(Optional)</small>
            </>
          }
          onChange={(e) => setFileBuffer(getFileBuffer(e.target.files[0]))}
          type="file"
          hasError={fileBuffer !== null ? false : null}
        />

        <div className="mb-3">
          <label htmlFor="stablecoin" className="form-label">
            Store money as a stablecoin? <small>(Optional)</small>
          </label>
          <br />
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">
              Stablecoin:
            </button>
            <button
              type="button"
              className="btn btn-light dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="px-3">{stablecoinSymbols[stablecoin]}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {stablecoinSymbols.map((symbol, index) => (
                <li>
                  <button
                    type="button"
                    onClick={(e) => setFormVars((prevState) => ({ ...prevState, stablecoin: index }))}
                    className="dropdown-item"
                  >
                    {symbol}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center py-3 py-sm-0">
          <button
            type="submit"
            className="btn btn-primary"
            data-bs-toggle={!props.web3 ? "modal" : ""}
            data-bs-target={!props.web3 ? "#noMetaMaskModal" : ""}
          >
            {contractPending ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>Propose</>
            )}
          </button>
        </div>
      </form>

      <Modal
        id="noMetaMaskModal"
        title="You need MetaMask or another Ethereum-compatible extension (and use Kovan)."
        body={<OnboardingButton />}
        dismissClass="btn btn-success mx-auto"
        dismissText="Ok"
      />
    </div>
  );
};

export default CreateContract;
