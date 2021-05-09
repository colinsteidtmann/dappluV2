import React, { useState, useEffect } from "react";
// Components
import { AgreeItem, ENSDisplay } from "#ContractsSharedComponents";
// Helper Functions
import { abis } from "@project/contracts";
const axios = require("axios");

const IndividualContract = (props) => {
  const [agreementValues, setAgreementValues] = useState({
    agreementContract: null,
    brandAddress: "",
    influencerAddress: "",
    endDate: null,
    budget: 0,
    payPerView: 0,
    agreementStatus: null,
    mediaLink: "",
    viewCount: 0,
    accumilatedPay: 0,
    fileHash: "",
    stablecoin: null,
    payForWithdraw: 0,
    budgetRemaining: 0,
  });
  const [displayAddresses, setDisplayAddresses] = useState({
    brandDisplayAddress: "",
    influencerDisplayAddress: "",
  });

  // ====================================Continuing to set state ================================================
  const updatePayVars = (budget, payPerView, accumilatedPay, viewCount) => {
    // set extra values that require some calculations
    const budgetRemaining = budget - accumilatedPay; // budget - accumilatedPay
    const maxPayForWithdraw = (payPerView * viewCount) - accumilatedPay; // (payPerView * viewCount) - accumilatedPay
    const actualPayForWithdraw = maxPayForWithdraw > budgetRemaining ? budgetRemaining : maxPayForWithdraw;
    setAgreementValues((prevState) => ({
      ...prevState,
      budget: (budget / 10 ** 18).toLocaleString(),
      budgetRemaining: (budgetRemaining / 10 ** 18).toLocaleString(),
      payForWithdraw: (actualPayForWithdraw / 10 ** 18).toLocaleString(),
      payPerView: (payPerView / 10 ** 18).toLocaleString(),
      accumilatedPay: (accumilatedPay / 10 ** 18).toLocaleString(),
      viewCount: viewCount.toLocaleString(),
    }));
  }

  const updateAddressDisplays = async(brandAddress, influencerAddress) => {
    const brandDisplayAddress = await reverseResolveAddress(brandAddress);
    const influencerDisplayAddress = await reverseResolveAddress(influencerAddress);
    setDisplayAddresses({
      brandDisplayAddress: brandDisplayAddress,
      influencerDisplayAddress: influencerDisplayAddress,
    });
  }

  // ====================================Smart Contract Interaction Functions=====================================

  const getAgreementDatails = async () => {
    try {      
      const agreementContract = new props.web3.eth.Contract(abis.InfluencerAgreement, props.agreement);
      // Returns (addess brand, address influencer, int endDate, int budget, int payPerView, enum agreementStatus, int viewCount, int accumuiatedPay, enum tokenOption, string mediaLink, string fileHash)
      const details = await props.contract.methods.getInfluencerContract(props.agreement).call();
      const brandAddress = details[0];
      const influencerAddress = details[1];
      const endDate = details[2];
      const budget = details[3];
      const payPerView = details[4];
      const agreementStatus = details[5];
      let viewCount = details[6];
      const accumilatedPay = details[7];
      const stablecoin = details[8];
      const mediaLink = details[9];
      const fileHash = details[10];

      // setAgreementValues
      setAgreementValues({
        agreementContract: agreementContract,
        brandAddress: brandAddress,
        influencerAddress: influencerAddress,
        endDate: endDate,
        budget: budget,
        payPerView: payPerView,
        agreementStatus: agreementStatus,
        viewCount: viewCount,
        accumilatedPay: accumilatedPay,
        stablecoin: stablecoin,
        mediaLink: mediaLink,
        fileHash: fileHash,
      })
      
      //get view count from YouTube API
      if (mediaLink.length > 0) {
        try {
          const viewCountReq = await axios({
              method: "post",
              url: "http://localhost:9000/getYoutubeViews",
              data: {
                id: mediaLink
              }
            });
          viewCount = viewCountReq.data; 
        } catch (err) {
          console.log(err)
        }
      }

      // set address displays
      updateAddressDisplays(brandAddress, influencerAddress)

      //format pay vars
      updatePayVars(budget, payPerView, accumilatedPay, viewCount);

    } catch (err) {
      console.log(err);
    }
  };

  const withdrawPay = async () => {
    const accounts = props.accounts;
    try {
      await agreementValues.agreementContract.methods
        .withdraw()
        .send({ from: accounts[0] })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const approveAgreement = async () => {
    const accounts = props.accounts;
    try {
      await agreementValues.agreementContract.methods
        .approveContract(agreementValues.mediaLink)
        .send({ from: accounts[0] })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================Display Helper funcions==========================

  const reverseResolveAddress = async (search) => {
    try {
      var res = await axios.post("https://api.thegraph.com/subgraphs/name/ensdomains/ens", {
        query: `
        {
          domains(where: {name: "${search}"}) {
            resolvedAddress {
              id
            }
          }
        }
        `,
      });
      try {
        let name = res.data.data.resolvers[0].domain.name;
        return name;
      } catch (err) {
        return search;
      }
    } catch (err) {
      console.log(err);
    }
  };



  const unixToDateString = (unixTime) => {
    const d = new Date(parseInt(unixTime) * 1000);
    const formattedDate = d.toLocaleString();
    return formattedDate;
  };

  // =======================================Display Components========================================

  const MediaLinkDisplay = () => {
    const accountType = props.accountType;
    if (accountType === 0) {
      //Infuencer case
      return (
        <form
          onSubmit={(event) => {
            approveAgreement();
            event.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control-plaintext"
                id="mediaLink"
                value={agreementValues.mediaLink}
                onChange={(e) => {
                  setAgreementValues((prevState) => ({ ...prevState, mediaLink: e.target.value }));
                }}
                placeholder="eg. 6wgFliyJ4Bk"
              />
              <small>(click text to edit)</small>
            </div>
            <div className="col-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      // Brand case
      if (agreementValues.mediaLink.length === 0) {
        return "Waiting for influencer to add it";
      } else {
        return agreementValues.mediaLink;
      }
    }
  };

  const WithdrawDisplay = () => {
    const { accountType, currency } = props;
    if (accountType === 0) {
      //influencer case
      return (
        <div className="row">
          <div className="col-6">
            <span className="mx-2">
              <b>{currencySymbols[currency]}</b>
            </span>
            {payForWithdraw}
          </div>
          <div className="col-3">
            <button
              type="button"
              onClick={() => {
                withdrawPay();
              }}
              className="btn btn-success"
            >
              Withdraw
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span className="mx-2">
            <b>{currencySymbols[currency]}</b>
          </span>
          {payForWithdraw}
        </div>
        
      );
    }
  };

  // ================================Rendering Functions====================================

  // get contract vars first
  useEffect(() => {
    getAgreementDatails();
    return () => {
      setAgreementValues({}); // silence memory leak warning
      setDisplayAddresses({}); // silence memory leak warning
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    brandAddress,
    influencerAddress,
    endDate,
    budget,
    budgetRemaining,
    payForWithdraw,
    payPerView,
    agreementStatus,
    viewCount,
    accumilatedPay,
    fileHash,
    stablecoin,
  } = agreementValues;
  const { brandDisplayAddress, influencerDisplayAddress } = displayAddresses;
  const { currency } = props;
  const currencySymbols = ["WEI", "ETH", "$", "£", "AU$"];
  const stablecoinSymbols = ["WETH", "USDT", "USDC", "DAI"];
  const statuses = ["Proposed", "Rejected", "Active", "Completed", "Ended in error"];
  const heading = `heading${props.index}`;
  const collapse = `collapse${props.index}`;


  return (
    <div className="accordion-item my-2 border-bottom">
      <h2 className="accordion-header" id={heading}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + collapse}
          aria-expanded="false"
          aria-controls={collapse}
        >
          <div className="row text-start w-100">
            <div className="col-3">{statuses[agreementStatus]}</div>
            <div className="col-8 overflow-scroll">
              {
                <>
                  {
                    props.accountType === 0
                      ? brandDisplayAddress // influencer account case
                      : influencerDisplayAddress // influencer account case
                  }
                </>
              }
            </div>
          </div>
        </button>
      </h2>
      <div
        id={collapse}
        className="accordion-collapse collapse"
        aria-labelledby={heading}
        data-bs-parent={"#" + heading}
      >
        <div className="accordion-body text-start">
          <AgreeItem label="Agreement Status" description={statuses[agreementStatus]} />
          <AgreeItem
            label="Brand Address"
            description={
              <>
                {brandDisplayAddress}
                {<ENSDisplay address={brandAddress} id="brandENS" />}
              </>
            }
          />
          <AgreeItem
            label="Influencer Address"
            description={
              <>
                {influencerDisplayAddress}
                {<ENSDisplay address={influencerAddress} id="influencerENS" />}
              </>
            }
          />
          <AgreeItem label="End Date" description={unixToDateString(endDate)} />
          <AgreeItem
            label="Budget"
            description={
              <>
                <span className="mx-2">
                  <b>{currencySymbols[currency]}</b>
                </span>
                {budget}
              </>
            }
          />
          <AgreeItem
            label="Budget Remaining"
            description={
              <>
                <span className="mx-2">
                  <b>{currencySymbols[currency]}</b>
                </span>
                {budgetRemaining}
              </>
            }
          />
          <AgreeItem
            label="Pay Per View"
            description={
              <>
                <span className="mx-2">
                  <b>{currencySymbols[currency]}</b>
                </span>
                {payPerView}
              </>
            }
          />
          <AgreeItem label="YouTube Tag" description={<MediaLinkDisplay />} />
          <AgreeItem label="View Count" description={viewCount} />
          <AgreeItem
            label="Accumilated Pay"
            description={
              <>
                <span className="mx-2">
                  <b>{currencySymbols[currency]}</b>
                </span>
                {accumilatedPay}
              </>
            }
          />
          <AgreeItem label="Money Available for Withdraw" description={<WithdrawDisplay />} />
          <AgreeItem label="Money Stored As" description={stablecoinSymbols[stablecoin]} />
          <AgreeItem
            label="Written Agreement"
            description={
              <>
                {fileHash === "" ? (
                  <p>The brand didn't upload one</p>
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://ipfs.infura.io/ipfs/${fileHash}`}
                  >
                    view written agreement <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualContract;
