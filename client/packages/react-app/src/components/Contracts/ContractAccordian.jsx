import React, { useState, useEffect } from "react";
//Components
import { IndividualContract } from "../";

const ContractAccordion = (props) => {
  const [individualContracts, setIndividualContracts] = useState([]);

  const { accountType, accounts, contract } = props;
  
  useEffect(() => {
    const init = async() => {
      // get influencer agreements by calling factory contract for addresses and rendering agreements
      if (contract !== undefined) {
        try {
          let agreements = await contract.methods.getInfluencerContracts(accountType, accounts[0]).call();
          const agreementsUI = ([...agreements].reverse()).map((agreement, index) => (
                              <IndividualContract {...props} key={index} index={index} agreement={agreement}  />
                            ));
          setIndividualContracts(agreementsUI);
        } catch (err) {
          console.log(err)
        }

      }
    }
    init()
    return () => {
      setIndividualContracts({}); // silence memory leak warning
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, accounts]);

  return (
    <>
      {!(individualContracts.length > 0) 
        ? (
          accountType === 0 ? (
            <p className="my-5">Bummer. You have no contracts. Go find a brand to make you one.</p>
          ) : (
            <p className="my-5">
              Looks like you haven't made a contract yet. Click "Create Contract" to make one.
            </p>
          )
        ) : (
          <div className="accordion" id="accordionExample">
            <div className="row overflow-scroll text-start w-100">
              <div className="col-3">Status</div>
              <div className="col-8">{accountType === 0 ? "Brand's" : "Content creator's"} address</div>
            </div>
            {individualContracts}
          </div>
      )}
    </>
  );
};

export default ContractAccordion;
