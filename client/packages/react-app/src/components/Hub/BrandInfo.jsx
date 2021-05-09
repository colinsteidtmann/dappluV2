import React from "react";
// Components
import { useParams } from "react-router-dom";
import { BackButton  } from "#GlobalSharedComponents";
import {InfoItem  } from "#HubSharedComponents";
// Images
// Helpers
import {brands} from "#Data";

const BrandInfo = () => {
  const { brandId } = useParams();
  const brand = brands[brandId-1]; // ids start at 1 while indices start at 0
  // let brand = {  profilePic: "",
  //             brandName:"",
  //             brandEmail:"",
  //             brandPitch:"",
  //             brandLooking:"",
  //             brandAbout:"",
  //             brandContact:"",}
  const info = {...brand}; 



  const {profilePic, brandName, brandPitch, brandLooking, brandAbout, brandContact} = info;
  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <BackButton to="/hub/brands" />
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
            <InfoItem label="Brand Name" description={brandName} />
            <hr/>
            <InfoItem label="Pitch" description={brandPitch} />
            <hr/>
            <InfoItem label="Who they're looking for" description={brandLooking} />
            <hr/>
            <InfoItem label="About their company" description={brandAbout} />
            <hr/>
            <InfoItem label="How to contact them" description={brandContact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
