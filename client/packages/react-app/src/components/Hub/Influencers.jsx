import React from "react";
// Components
import { CreateAccBtn, ProfileCard } from "#HubSharedComponents";
import { BackButton } from "#GlobalSharedComponents";
// Images
// Helpers
import {influencers} from "#Data";

const Influencers = (props) => {
  return (
    <div className="container-fluid py-4 px-3 px-md-5 theme-light">
      <BackButton to="/hub" />
      <h1 className="text-center mt-5 mt-sm-0 my-sm-3">Meet The Influencers <span role="img" aria-label="camera">&#128248;</span></h1>
      <div className="row my-4 my-sm-3">
        <CreateAccBtn to="/hub/influencers/create-influencer" text="Add Yourself" />
      </div>
      <div className="row gy-4 gx-4">
        {influencers.map((influencer, index) => (
          <ProfileCard key={index} profilePic={influencer.profilePic} name={influencer.influencerName} pitch={influencer.influencerPitch} to={`/hub/influencers/${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Influencers;
