import React from "react";
// Components
import { Link } from "react-router-dom";
import { OnboardingButton } from "../";
import {DappVarsContext } from "#GlobalSharedComponents";

// Functions for all pages
export const Web3Connector = (props) => {
	const dappVars = React.useContext(DappVarsContext);	

	return (
		<>
			<div className="row justify-content-start mb-3 mb-sm-0 ">
				<div className="col-auto col-sm-6 col-md-4 d-flex flex-nowrap">
					<div style={{"width":"fit-content"}}>
						<OnboardingButton /> 
					</div>
					<p className="info-text alert alert-success py-1 overflow-auto ms-2" style={{"maxWidth":"fit-content"}}>
						<span>{dappVars.accounts  > 0 ? dappVars.accounts : "No address connected"}</span>
						
					</p>
				</div>
			</div>			
		</>
	);
}

//Functions for Homepage
export const HomepageCard = (props) => {
	return (
		<div className="col-12 col-md-4 mx-5 my-3">
			<div className="card border border-5 border-secondary h-100 shadow-lg ">
				<img src={props.image} alt="..." style={{ height: "30vh", objectFit: "cover" }} />
				<div className="card-body text-center">
					<h5 className="card-title">{props.title}</h5>
					<p className="card-text">{props.subtitle}</p>
				</div>
				<Link className="stretched-link" to={props.to}></Link>
			</div>
		</div>
	);
};

//Functions for Dashboards
export const CurrencyDisplay = (props) => {
	let currencyOptions = ["WEI", "ETH", "USD", "GBP", "AUD"];
	return (
		<div className="btn-group float-end">
			<button className="btn btn-success btn-sm btn-sm-md">Current Currency:</button>
			<button
				className="btn btn-primary dropdown-toggle dropdown-toggle-split btn-sm btn-sm-md"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-3">{currencyOptions[props.currency]}</span>
			</button>
			<ul className="dropdown-menu dropdown-menu-end">
				{currencyOptions.map((symbol, index) => (
					<li key={index}>
						<button
							onClick={() => {
								props.setUserCurrency(index);
								props.localStorage.setItem("currency", index);
							}}
							className="dropdown-item"
						>
							{symbol}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

// Functions for create contract
export const ENSDisplay = (props) => {
	const copy = () => {
		// select and copy text
		var copyText = document.getElementById(props.id);
		var textArea = document.createElement("textarea");
		textArea.value = copyText.textContent;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();

		// display alert
		document.getElementById(props.id + "_copyAlert").style.display = "block";

		// dismiss copied alert
		setTimeout(() => {
			document.getElementById(props.id + "_copyAlert").style.display = "none";
		}, 1000);
	};

	if (props.address.length > 0) {
		return (
			<>
				<div className="card">
					<div
						className="card-body p-2 d-flex d-lg-inline"
						onClick={() => {
							copy();
						}}
						style={{ cursor: "-webkit-grab" }}
					>
						<span className="pe-3" style={{ color: "Mediumslateblue" }}>
							<i className="fas fa-pastafarianism"></i>
						</span>
						<span className="overflow-scroll d-flex d-lg-inline" id={props.id}>
							{props.address}
						</span>
						<span style={{ color: "Mediumslateblue" }}>
							<i className="far fa-clipboard float-end mx-3"></i>
						</span>
					</div>
				</div>
				<div
					className="alert alert-primary"
					role="alert"
					id={props.id + "_copyAlert"}
					style={{ display: "none" }}
				>
					Copied to clipboard
				</div>
			</>
		);
	} else {
		return "";
	}
};

//Functions for Indvidual Agreements
export const AgreeItem = (props) => {
	return (
		<dl className="row">
			<dt className="col-sm-3 overflow-scroll">{props.label}</dt>
			<dd className="col-sm-9 overflow-scroll text-nowrap">{props.description}</dd>
		</dl>
	);
};
