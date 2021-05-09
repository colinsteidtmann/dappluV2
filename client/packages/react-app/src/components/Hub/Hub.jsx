import React from "react";
// Components
import { ProfileGallery, ProfileCard } from "#HubSharedComponents";
// Images
//Helpers
import {brands, influencers} from "#Data";

const Hub = (props) => {
	return (
		<div className="container-fluid py-4 px-3 px-md-5 theme-light">
			<h1 className="text-center w-100 w-md-50 mx-auto py-0 py-md-5">
				Connect with brands and content creators <span role="img" aria-label="handshake">&#129309;</span>
			</h1>
			
			<ProfileGallery 
			title="Content Creators" 
			to="/hub/influencers" 
			cards={
				influencers.map((influencer, index) => (
					<ProfileCard
						key={index}
						profilePic={influencer.profilePic}
						name={influencer.influencerName}
						pitch={influencer.influencerPitch}
						to={`/hub/influencers/${index + 1}`}
					/>
				))
			}
			/>
			
			<ProfileGallery 
			title="Brands" 
			to="/hub/brands" 
			cards={
				brands.map((brand, index) => (
					<ProfileCard
						key={index}
						profilePic={brand.profilePic}
						name={brand.brandName}
						pitch={brand.brandPitch}
						to={`/hub/brands/${index + 1}`}
					/>
				))
			}
			/>
		</div>
	);
};

export default Hub;
