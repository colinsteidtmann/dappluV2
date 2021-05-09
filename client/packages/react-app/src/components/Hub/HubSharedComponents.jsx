import React from "react";
// Components
import { Link } from "react-router-dom";
// Images
import profilePic from "#Images/profilePic.jpeg";

export const CreateAccBtn = (props) => {
	return (
		<Link to={props.to}>
			<button type="button" className="btn btn-outline-primary float-end">
				{props.text}
			</button>
		</Link>
	);
};

export const ProfileCard = (props) => {
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 ">
			<div className="card">
				<img src={props.profilePic} alt="profilePic" className="card-img-top" style={{ height: "30vh", objectFit: "cover" }} />
				<div className="card-body">
					<h5 className="card-title">{props.name}</h5>
					<p className="card-text">
						{props.pitch}
					</p>
					<Link className="stretched-link" to={props.to} />
				</div>
			</div>
		</div>
	);
};

export const ViewAllButton = (props) => {
	return (
		<Link to={props.to}>
			<button type="button" className="btn float-start float-end">
				View all <i className="fas fa-chevron-right"></i>
			</button>
		</Link>
	);
};

export const ProfileGallery = (props) => {
	return (
		<div className="row mt-3 mt-sm-5">
			<div className="col-8">
				<h3>{props.title}</h3>
			</div>
			<div className="col-4">
				<ViewAllButton to={props.to} />
			</div>
			<div className="row">
				{props.cards}
			</div>
		</div>
	);
};

export const FormFileUpload = (props) => {

	//Displays image for UI purposes only
	const displayImage = (image) => {
	    const reader = new FileReader();
	    reader.readAsDataURL(image);
	    reader.onload = function(){
	      var dataURL = reader.result;
	      var output = document.getElementById('profilePic');
	      output.src = dataURL;
	      props.setFormInputs((prevState) => ({ ...prevState, profilePic: dataURL }));
	    };
	};

	return (
		<div className="card w-75 w-md-25 mx-auto mb-3">
			<img
				id="profilePic"
				src={profilePic}
				className="card-img-top"
				alt="..."
				style={{ height: "30vh", objectFit: "cover" }}
			/>
			<div className="card-body text-center">
				<h5 className="card-title">Thumbnail image</h5>
				<input 
				type="file" 
				className="d-none" 
				id="profileUpload" 
				onChange={(e) => {
				  props.setFormInputs((prevState) => ({ ...prevState, profilePic: e.target.files[0] }));
				  displayImage(e.target.files[0]);
				}}
				/>
				<button type="button" className="btn btn-primary" onClick={() => {document.getElementById("profileUpload").click()}}>
					Upload
				</button>
			</div>
		</div>
	);
};

export const FormSubmitBtn = (props) => {
	return (
		<div className="text-center">
			<button type="submit" className="btn btn-primary">
			  {props.sendingMail ? (
			    <div className="spinner-border" role="status">
			      <span className="visually-hidden">wait </span>
			    </div>
			  ) : (
			    "Create"
			  )}
			</button>
		</div>
	);
};

  // ====================================Displays============================================================
  //Displays if message sent and server responded with status 200
export const MailSentDisplay = (props) => {
	return (
	  <div className="alert alert-info">
	    <h3 className="text-center mb-5">
	      <i className="fas fa-check-circle text-success pe-3"></i>Success, we got your application!
	    </h3>
	    <p className="mb-5 text-center">
	    	A copy of your application has been sent to your email (check spam if it doesn't show). <br/> <br/>
	    	We'll review it and make a decision within 24 hours.
	    	If we approve you then you'll appear on our website.  <br/> <br/>
	    	Reply to the email sent to you if you have any questions.
	    </p>
	    <div className="text-center">
	    <button type="submit" className="btn btn-primary btn-lg" onClick={() => {props.setSentMail(!props.sentMail)}}>
	      Back to form
	    </button>
	    </div>
	  </div>
	);
};

  //Displays if message sent and server responded with error
export const MailErrorDisplay = (props) => {
	return (
	  <div className="alert alert-darl">
	    <h3 className="text-center mb-5">
	      <i className="fas fa-exclamation-circle text-danger pe-3"></i>Uh oh! There was an error.
	    </h3>
	    <h5 className="mb-5 text-center">
	    	Please try again or send us a message.
	    </h5>
	    <div className="text-center">
	    <button type="submit" className="btn btn-primary btn-lg" onClick={() => {props.setMailError(!props.mailError)}}>
	      Back to form
	    </button>
	    </div>
	  </div>
	);
};


// Info pages

export const InfoItem = (props) => {
	return (
		<dl className="row my-4">
			<dt className="col-sm-3">{props.label}</dt>
			<dd className="col-sm-9">{props.description}</dd>
		</dl>
	);
}
