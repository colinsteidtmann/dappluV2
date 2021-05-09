import React, {useState} from "react";
// Components
import { BackButton, FormInputFloating, FormTextAreaFloating } from "#GlobalSharedComponents";
import { FormFileUpload, FormSubmitBtn, MailSentDisplay, MailErrorDisplay } from "#HubSharedComponents";
// Images
import profilePic from "#Images/profilePic.jpeg";
// Helpers
import axios from "axios";


const CreateInfluencer = (props) => {
  const [formInputs, setFormInputs] = useState({
    profilePic: {profilePic},
    influencerName: "",
    youtubeName: "",
    youtubeLink: "",
    influencerEmail: "",
    influencerPitch: "",
    influencerLooking: "",
    influencerAbout: "",
    influencerContact: "",
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
      url: "http://localhost:9000/sendInfluencerApplication",
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
      <BackButton to="/hub/influencers" />
      <br />
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
                        id="influencerName" 
                        placeholder="Influencer Name" 
                        label="Your name"
                        onChange={(e) => {
                          setFormInputs((prevState) => ({ ...prevState, influencerName: e.target.value }));
                        }}
                        required="required"
                        />
                        <FormInputFloating
                          id="youtubeName"
                          placeholder="YouTube Channel Name"
                          label="YouTube channel name"
                          onChange={(e) => {
                            setFormInputs((prevState) => ({ ...prevState, youtubeName: e.target.value }));
                          }}
                          required="required"
                        />
                        <FormInputFloating 
                        id="youtubeLink" 
                        placeholder="YouTube Link" 
                        label="YouTube channel link"
                        onChange={(e) => {
                          setFormInputs((prevState) => ({ ...prevState, youtubeLink: e.target.value }));
                        }}
                        required="required"
                        />
                        <FormInputFloating
                          id="influencerEmail"
                          placeholder="Influencer Email"
                          label="Email for Dapplu to contact you (if needed)"
                          type="email"
                          onChange={(e) => {
                            setFormInputs((prevState) => ({ ...prevState, influencerEmail: e.target.value }));
                          }}
                          required="required"
                        />
                        <br />
                        <br />
                        <FormTextAreaFloating
                          row="2"
                          id="influencerPitch"
                          placeholder="I make content about ..."
                          label="Elevator Pitch"
                          onChange={(e) => {
                            setFormInputs((prevState) => ({ ...prevState, influencerPitch: e.target.value }));
                          }}
                          required="required"
                        />
                        <FormTextAreaFloating
                          row="3"
                          id="influencerLooking"
                          placeholder="I want brands who ..."
                          label="Partners you're looking for"
                          onChange={(e) => {
                            setFormInputs((prevState) => ({ ...prevState, influencerLooking: e.target.value }));
                          }}
                          required="required"
                        />
                        <FormTextAreaFloating
                          row="5"
                          id="influencerAbout"
                          placeholder="I'm from ..."
                          label="About your channel"
                          onChange={(e) => {
                            setFormInputs((prevState) => ({ ...prevState, influencerAbout: e.target.value }));
                          }}
                          required="required"
                        />
                        <FormTextAreaFloating
                          row="3"
                          id="influencerContact"
                          placeholder="Go to my website ..."
                          label="How brands can contact you"
                          onChange={(e) => {
                            setFormInputs((prevState) => ({ ...prevState, influencerContact: e.target.value }));
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

export default CreateInfluencer;
