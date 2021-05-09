import React from "react";
// Components
import { CreateAccBtn, ProfileCard } from "./HubSharedComponents";
import { BackButton } from "#GlobalSharedComponents";
// Images
// Helpers
import {brands} from "#Data";

const Brands = (props) => {
  return (
    <div className="container-fluid py-4 px-3 px-md-5 theme-light">

      <BackButton to="/hub" />
      <h1 className="text-center mt-5 mt-sm-0 my-sm-3">Explore The Brands <span role="img" aria-label="earth">&#127757;</span></h1>
      <div className="row my-4 my-sm-3">
        <CreateAccBtn to="/hub/brands/create-brand" text="Add Your Brand" />
      </div>
      <div className="row gy-4 gx-4">
        {brands.map((brand, index) => (
          <ProfileCard key={index} profilePic={brand.profilePic} name={brand.brandName} pitch={brand.brandPitch} to={`/hub/brands/${index + 1}`} />
        ))}

      </div>
    </div>
  );
};

export default Brands;
