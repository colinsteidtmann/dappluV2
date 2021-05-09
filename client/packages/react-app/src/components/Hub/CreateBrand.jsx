import React, {useState} from "react";
// Components
import { BackButton, FormInputFloating, FormTextAreaFloating  } from "#GlobalSharedComponents";
import {FormFileUpload, FormSubmitBtn, MailSentDisplay, MailErrorDisplay  } from "#HubSharedComponents";
// Images
import profilePic from "#Images/profilePic.jpeg";
// Helpers
import axios from "axios";

const CreateBrand = (props) => {
  const [formInputs, setFormInputs] = useState({
    profilePic: {profilePic},
    brandName:"",
    brandEmail:"",
    brandPitch:"",
    brandLooking:"",
    brandAbout:"",
    brandContact:"",
  });
  const [sentMail, setSentMail] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setSendingMail(true);

    // //start mail send
    // //posts to our local api to send the message
    axios({
      method: "post",
      url: "http://localhost:9000/sendBrandApplication",
      data: formInputs,
    })
      .then(function (response) {
        setSentMail(true);
        setSendingMail(false);
      })
      .catch(function (error) {
        console.log(error);
        setMailError(true);
        setSendingMail(false);
      });
  };
  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <BackButton to="/hub/brands" />
      <div className="row my-5 my-md-2">
        <div className="col-12 col-md-8 mx-auto">
          {(() => {
            if (sentMail) {
              return <MailSentDisplay setSentMail={setSentMail} sentMail={sentMail} />
            } else if (mailError) {
              return <MailErrorDisplay setMailError={setMailError} mailError={mailError} />
            } else {
              return (
                <form onSubmit={handleSubmit}>
                  <FormFileUpload setFormInputs={setFormInputs} />
                  <FormInputFloating 
                  id="brandName" 
                  placeholder="Brand Name" 
                  label="Brand Name" 
                  onChange={(e) => {
                    setFormInputs((prevState) => ({ ...prevState, brandName: e.target.value }));
                  }}
                  required="required"
                  />
                  <FormInputFloating
                    id="brandEmail"
                    placeholder="Brand Email"
                    label="Email for Dapplu to contact you (if needed)"
                    type="email"
                    onChange={(e) => {
                      setFormInputs((prevState) => ({ ...prevState, brandEmail: e.target.value }));
                    }}
                    required="required"
                  />
                  <br />
                  <br />
                  <FormTextAreaFloating
                    id="brandPitch"
                    row="2"
                    placeholder="Our mission is to ..."
                    label="Elevator Pitch"
                    onChange={(e) => {
                      setFormInputs((prevState) => ({ ...prevState, brandPitch: e.target.value }));
                    }}
                    required="required"
                  />
                  <FormTextAreaFloating
                    id="brandLooking"
                    row="3"
                    placeholder="We want influencers who ..."
                    label="What you're looking for"
                    onChange={(e) => {
                      setFormInputs((prevState) => ({ ...prevState, brandLooking: e.target.value }));
                    }}
                    required="required"
                  />
                  <FormTextAreaFloating 
                  id="brandAbout" 
                  row="5" 
                  placeholder="We do .." 
                  label="About your company" 
                  onChange={(e) => {
                    setFormInputs((prevState) => ({ ...prevState, brandAbout: e.target.value }));
                  }}
                  required="required"
                  />
                  <FormTextAreaFloating
                    id="brandContact"
                    row="5"
                    placeholder="Go to our website ..."
                    label="How influencers can contact you"
                    onChange={(e) => {
                      setFormInputs((prevState) => ({ ...prevState, brandContact: e.target.value }));
                    }}
                    required="required"
                  />
                  <FormSubmitBtn sendingMail={sendingMail} />
                </form>
              );
            }

          })()}

        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
