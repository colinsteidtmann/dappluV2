import React, { useState } from "react";
//Compointnets
import { BackButton } from "#GlobalSharedComponents";
import { CurrencyDisplay, Web3Connector } from "#ContractsSharedComponents";
import { CreateContract, ContractAccordian } from "../";

const BrandDashboard = (props) => {
  const [displayAgreementForm, setDisplayAgreementForm] = useState(false);
  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <Web3Connector />
      <div className="row my-2">
        <span>
          <BackButton to="/contracts" />
          <CurrencyDisplay {...props} />
        </span>
      </div>
      <div className="row justify-content-center my-5 my-sm-5">
        <div className="col-12 col-sm-8 justify-content-center text-center">
          <button
            className="btn btn-lg btn-primary"
            type="button"
            onClick={() => setDisplayAgreementForm(true)}
          >
            Create Contract
          </button>
          {displayAgreementForm && (
            <CreateContract {...props} setDisplayAgreementForm={setDisplayAgreementForm} />
          )}
          <hr />
          <h1>My Contracts</h1>
          <ContractAccordian {...props} />
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;
