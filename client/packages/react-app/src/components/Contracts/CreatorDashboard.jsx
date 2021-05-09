import React from "react";
// Components
import { ContractAccordian } from "../";
import { BackButton } from "#GlobalSharedComponents";
import { CurrencyDisplay, Web3Connector } from "#ContractsSharedComponents";

const CreatorDashboard = (props) => {
  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <Web3Connector />
      <div className="row my-2">
        <span>
          <BackButton to="/contracts" />
          <CurrencyDisplay {...props} />
        </span>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 justify-content-center text-center">
          <h1 className="my-4">My Contracts</h1>
          <ContractAccordian {...props} />
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
