import React from "react";
// Components
import { useParams } from "react-router-dom";
import { BackButton } from "#GlobalSharedComponents";
import {
  InfoItem
} from "#HubSharedComponents";
// Images
// Helpers
import { influencers } from "#Data";

const InfluencerInfo = () => {
  const { influencerId } = useParams();
  const influencer = influencers[influencerId - 1]; // ids start at 1 while indices start at 0
  // let influencer = {
  //   profilePic: "",
  //   influencerName: "",
  //   youtubeName: "",
  //   youtubeLink: "",
  //   influencerEmail: "",
  //   influencerPitch: "",
  //   influencerLooking: "",
  //   influencerAbout: "",
  //   influencerContact: "",
  // };

  const info = { ...influencer };

  const { profilePic, influencerName, youtubeName, youtubeLink, influencerPitch, influencerLooking, influencerAbout, influencerContact } = info;
  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <BackButton to="/hub/influencers" />
      <div className="row my-5">
        <div className="col-11 col-md-8 mx-auto">
          <div className="card w-75 w-md-25 mx-auto mb-3">
            <img
              id="profilePic"
              src={profilePic}
              className="card-img-top"
              alt="..."
              style={{ height: "30vh", objectFit: "cover" }}
            />
          </div>
          <div className="div p-3">
            <InfoItem label="Name" description={influencerName} />
            <hr />
            <InfoItem label="YouTube name" description={youtubeName} />
            <hr />
            <InfoItem label="YouTube channel link" description={youtubeLink} />
            <hr />
            <InfoItem label="Pitch to brands" description={influencerPitch} />
            <hr />
            <InfoItem label="Who they're looking for" description={influencerLooking} />
            <hr />
            <InfoItem label="About their channel" description={influencerAbout} />
            <hr />
            <InfoItem label="How to contact them" description={influencerContact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerInfo;
