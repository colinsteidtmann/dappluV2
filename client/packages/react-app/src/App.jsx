import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDappVars } from "#Hooks";
import {DappVarsContext} from "#GlobalSharedComponents";
//helpers
//Componets
import {
  Navbar,
  Footer,
  Main,
  Contracts,
  Hub,
  Brands,
  CreateBrand,
  BrandInfo,
  Influencers,
  CreateInfluencer,
  InfluencerInfo,
  BrandDashboard,
  CreatorDashboard,
} from "./components";

// Exported Function
const App = () => {
  const dappVars = React.useContext(DappVarsContext);
  const {    
    web3,
    accounts,
    contract,
    userCurrency,
    setUserCurrency,
    localStorage,
    accountTypes,
    convertBetween,
  } = useDappVars()


  dappVars.web3 = web3;
  dappVars.accounts = accounts;
  dappVars.contract = contract;
  dappVars.userCurrency = userCurrency;
  dappVars.setUserCurrency = setUserCurrency;
  dappVars.localStorage = setUserCurrency;
  dappVars.accountTypes = accountTypes;
  dappVars.convertBetween = convertBetween;

  return (
    <div>
      <Router>
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <div style={{ paddingBottom: "2.5rem" }}>
            <Navbar />
            <Switch>
              <Route path="/" exact component={() => <Main />} />
              <Route path="/contracts" exact component={() => <Contracts />} />{" "}
              {/*see contracts.jsx for routes to its subpages*/}
              <Route path="/hub" exact component={() => <Hub />} />
              <Route path="/hub/brands" exact component={() => <Brands />} />
              <Route path="/hub/brands/create-brand" exact component={() => <CreateBrand />} />
              <Route path="/hub/brands/:brandId" exact component={() => <BrandInfo />} />
              <Route path="/hub/influencers" exact component={() => <Influencers />} />
              <Route path="/hub/influencers/create-influencer" exact component={() => <CreateInfluencer />} />
              <Route path="/hub/influencers/:influencerId" exact component={() => <InfluencerInfo />} />
              <Route
                path="/contracts/creator-dashboard"
                exact
                component={() => (
                  <CreatorDashboard
                    web3={web3}
                    accountType={accountTypes.INFLUENCER}
                    accounts={accounts}
                    contract={contract}
                    currency={userCurrency}
                    setUserCurrency={setUserCurrency}
                    localStorage={localStorage}
                    convertBetween={convertBetween}
                  />
                )}
              />
              <Route
                path="/contracts/brand-dashboard"
                render={() => (
                  <BrandDashboard
                    web3={web3}
                    accountType={accountTypes.BRAND}
                    accounts={accounts}
                    contract={contract}
                    currency={userCurrency}
                    setUserCurrency={setUserCurrency}
                    localStorage={localStorage}
                    convertBetween={convertBetween}
                  />
                )}
              />
            </Switch>
          </div>
          <div style={{ position: "absolute", bottom: "0", width: "100%", height: "2.5rem" }}>
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
