import MetaMaskOnboarding from "@metamask/onboarding";
import React from "react";
import {DappVarsContext} from "#GlobalSharedComponents";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

export function OnboardingButton() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();
  const dappVars = React.useContext(DappVarsContext);

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  
  
  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);

      dappVars.accounts = newAccounts[0];
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum._state.accounts >0) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.on("accountsChanged", handleNewAccounts);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => {setAccounts(newAccounts);});

    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <div className="text-center">
      <button className="btn btn-primary btn-sm" disabled={isDisabled} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default OnboardingButton;
