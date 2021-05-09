import React from "react";
// Components
import { HomepageCard, Web3Connector } from "#ContractsSharedComponents";
import {DappVarsContext, MetaMaskWarning} from "#GlobalSharedComponents";
// Images
import camera from "#Images/camera.jpg";
import advertising from "#Images/advertising.jpg";

const Contracts = () => {
	const dappVars = React.useContext(DappVarsContext);	
	return (
		<div className="container-fluid py-4 px-3 px-md-5">
			{!(dappVars.accounts > 0) && <MetaMaskWarning />}
			<Web3Connector />
			<div className="row justify-content-center">
				<div className="badge rounded-pill bg-light text-dark shadow px-5 py-3 w-auto">
					<h2 className="text-center display">Choose Your Identity</h2>
				</div>
			</div>

			<div className="row justify-content-center mt-3">
				<HomepageCard
					image={camera}
					title="Content Creator/Influencer"
					subtitle="You want brands and sponsors 
		  				to pay based on your channel's present and future content views, not its historical average. You're 
		  				betting on your future growth."
					to="/contracts/creator-dashboard"
				/>

				<HomepageCard
					image={advertising}
					title="Brand"
					subtitle="You want to pay content creators based on 
		  				actual content engagement, not try to guess based on past performance and perhaps end up with content 
		  				that's a dud. "
					to="/contracts/brand-dashboard"
				/>
			</div>
		</div>
	);
};

export default Contracts;
