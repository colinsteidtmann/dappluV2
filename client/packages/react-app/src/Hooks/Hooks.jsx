import  { useState, useEffect } from "react";
//Components
// Helper functions
import { addresses, abis } from "@project/contracts";
import getWeb3 from "../getWeb3";



export const useValidation = () => {
	const [errors, setErrors] = useState([]);

	// Function that returns true if error array has form input in it
	const hasError = (key) => {
	  //returns true if key found, false if key not found
	  return errors.indexOf(key) !== -1;
	};

	// Function that adds form input to errors array if it fails validation test
	const addKeyToErrors = (key) => {
	  if (!hasError(key)) {
	    setErrors((prevState) => [...prevState, key]);
	  }
	};

	// Function that adds form input to errors array if it fails validation test
	const removeKeyFromErrors = (key) => {
	  if (hasError(key)) {
	    setErrors((prevState) => [...prevState.filter((e) => e !== key)]);
	  }
	};

	return [hasError, addKeyToErrors, removeKeyFromErrors];
}


// Function to get crypto price using Chainlink
const getPrice = async (web3, address) => {
	const priceFeed = new web3.eth.Contract(abis.AggregatorV3Interface, address);
	var priceData = await priceFeed.methods.latestRoundData().call();
	var timeStamp = priceData[3];
	var price = priceData[1];
	// If the round is not complete yet, timestamp is 0
	if (timeStamp === 0) {
		return 0;
	} else {
		return price;
	}
};

export const useDappVars = () => {
	//const [web3Connection, setWeb3Connection]
	const currencies = { WEI: 0, ETH: 1, USD: 2, GBP: 3, AUD: 4 };
	const localStorage = window.localStorage;
	const [userCurrency, setUserCurrency] = useState(
		localStorage.getItem("currency") === null ? 2 : parseInt(localStorage.getItem("currency"))
	);
	const [web3Vars, setWeb3Vars] = useState({ web3: undefined, accounts: undefined, contract: undefined });
	const [pricefeeds, setPricefeeds] = useState({ ethUsdPrice: 0, audUsdPrice: 0, gbpUsdPrice: 0 });

	// Function to convert between currencies
	const convertBetween = (_value, _fromCurrency, _toCurrency) => {
		const toBN = web3.utils.toBN;
		const { ethUsdPrice, gbpUsdPrice, audUsdPrice } = pricefeeds;

		if (typeof _value === "string") {
			// Step 1, get everything in WEI
			var inWEI;
			var inUSD;
			if (_fromCurrency === currencies.WEI) {
				// inWEI, WEI may be very large
				inWEI = toBN(_value);
			}
			if (_fromCurrency === currencies.ETH) {
				// ETH --> WEI
				inWEI = toBN(_value * 10 ** 8).mul(toBN(10 ** 10));
			}
			if (_fromCurrency === currencies.USD) {
				// USD --> inUSD (with 8 ints for decimals) --> ETH --> WEI
				inWEI = toBN(Math.round(((_value * 10 ** 8) / ethUsdPrice) * 10 ** 18));
			}
			if (_fromCurrency === currencies.GBP) {
				// GBD --> USD (with 8 ints for decimals) --> ETH --> WEI
				inUSD = _value * gbpUsdPrice;
				inWEI = toBN(Math.round((inUSD / ethUsdPrice) * 10 ** 18));
			}
			if (_fromCurrency === currencies.AUD) {
				// AUD --> USD (with 8 ints for decimals) --> ETH --> WEI
				inUSD = _value * audUsdPrice;
				inWEI = toBN(Math.round((inUSD / ethUsdPrice) * 10 ** 18));
			}

			// Step 2, convert from WEI to the desired currency
			var outCurrency;
			if (_toCurrency === currencies.WEI) {
				// inWEI --> WEI
				outCurrency = inWEI;
			}
			if (_toCurrency === currencies.ETH) {
				// inWEI --> ETH
				outCurrency = parseInt(inWEI.div(toBN(10 ** 10))) / 10 ** 8;
			}
			if (_toCurrency === currencies.USD) {
				// inWEI --> ETH --> USD (with 8 ints for decimals) --> USD (we have to split up the division going from inWEI --> ETH because BN only works with integers)
				outCurrency = ((parseInt(inWEI.div(toBN(10 ** 10))) / 10 ** 8) * ethUsdPrice) / 10 ** 8;
			}
			if (_toCurrency === currencies.GBP) {
				// inWEI --> ETH --> USD (with 8 ints for decimals) --> GBD
				outCurrency = ((parseInt(inWEI.div(toBN(10 ** 10))) / 10 ** 8) * ethUsdPrice) / gbpUsdPrice;
			}
			if (_toCurrency === currencies.AUD) {
				// inWEI --> ETH --> USD (with 8 ints for decimals) --> AUD
				outCurrency = ((parseInt(inWEI.div(toBN(10 ** 10))) / 10 ** 8) * ethUsdPrice) / audUsdPrice;
			}
			return outCurrency.toString();
		}
	};

	useEffect(() => {
		let web3, accounts, contract;
		//set web3 on every render
		try {
			// Get network provider and web3 instance.
			const init = async () => {
				// Get network provider and web3 instance.
				web3 = await getWeb3();
					// Use web3 to get the user's accounts.
				accounts = await web3.eth.getAccounts();

				//handle accounts and chain change
				window.ethereum.on("accountsChanged", (_accounts) => {
					// Handle the new accounts, or lack thereof.
					// "accounts" will always be an array, but it can be empty.
					accounts = _accounts;
				});
				window.ethereum.on("chainChanged", (chainId) => {
					// Handle the new chain.
					// Correctly handling chain changes can be complicated.
					// We recommend reloading the page unless you have good reason not to.
					window.location.reload();
				});

				// Get the contract instance.
				contract = new web3.eth.Contract(
					abis.InfluencerAgreementFactory,
					addresses.InfluencerAgreementFactory
				);
				console.log("factory contract", addresses.InfluencerAgreementFactory)
				setWeb3Vars({ web3, accounts, contract });
				if (web3 !== undefined) {
					const ethUsdPrice = await getPrice(web3, "0x9326BFA02ADD2366b30bacB125260Af641031331");
					const audUsdPrice = await getPrice(web3, "0x5813A90f826e16dB392abd2aF7966313fc1fd5B8");
					const gbpUsdPrice = await getPrice(web3, "0x28b0061f44E6A9780224AA61BEc8C3Fcb0d37de9");
					setPricefeeds({ ethUsdPrice, audUsdPrice, gbpUsdPrice });
				}
			};
			init();
		} catch {
		}
	});

	const accountTypes = { INFLUENCER: 0, BRAND: 1 };
	const {web3, accounts, contract} = web3Vars;

	return {
		web3,
		accounts,
		contract,
		userCurrency,
		setUserCurrency,
		localStorage,
		accountTypes,
		convertBetween,
	};
};

export const useMetaMask = () => {
	const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

	if (window.ethereum._state.accounts !== undefined) {
		if (window.ethereum._state.accounts.length > 0) {
			setIsMetaMaskConnected(true);
		}	
	}

	return isMetaMaskConnected;
}

