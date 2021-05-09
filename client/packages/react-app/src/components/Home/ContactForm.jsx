import React, { useState } from "react";
import {useValidation} from "#Hooks";
//Components
import { FormInputFloating, FormTextAreaFloating, ValidationDisplay } from "#GlobalSharedComponents";

//Helpers
import axios from "axios";

const ContactForm = (props) => {
  const [formInputs, setFormInputs] = useState({ name: "", email: "", message: "" });
  const [sendingMail, setSendingMail] = useState(false);
  const [sentMail, setSentMail] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [hasError, addKeyToErrors, removeKeyFromErrors] = useValidation();


  // ==========================================Validations================================================
  const validateEmail = (email, key) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(mailformat)) {
      addKeyToErrors(key);
    } else {
      removeKeyFromErrors(key)
    }
  }

  // ====================================Displays============================================================
  //Displays if message sent and server responded with status 200
  const mailSentDisplay = () => {
    return (
      <div className="alert alert-primary">
        <h3 className="text-center mb-5">
          <i className="fas fa-check-circle text-success pe-3"></i>Success, we got your message!
        </h3>
        <h5 className="mb-5 text-center">Check your inbox for a confirmation. Check spam too.</h5>
        <div className="text-center">
        <button type="submit" className="btn btn-primary btn-lg" onClick={() => {setSentMail(!sentMail)}}>
          Send another one
        </button>
        </div>
      </div>
    );
  };

  // Displays if there was an error sending the message
  const mailErrorDisplay = () => {
    return (
      <div className="alert alert-dark">
        <h3 className="text-center mb-5">
          <i className="fas fa-exclamation-circle text-danger pe-3"></i>Uh oh! There was an error.
        </h3>
        <h5 className="mb-5 text-center">Sorry. Try again maybe?</h5>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" onClick={() => {setMailError(!mailError)}}>
            Try again
          </button>
        </div>
      </div>
    );
  };

  // =======================================Form Submissions======================================
  // Function called on contact form submission. Sends message to api which then emails it out.
  const handleSubmit = (event) => {
    event.preventDefault();
    setSendingMail(true);

    //start mail send
    setSendingMail(true); //makes send button a spinning circle
    //posts to our local api to send the message
    axios({
      method: "post",
      url: "http://localhost:9000/sendMail",
      data: {
        name: formInputs.name,
        email: formInputs.email,
        message: formInputs.message,
      },
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


  // ================================================Renderings=========================================
  const {email} = formInputs; //constants used in render
  return (
    <>
      {(() => {
              if (sentMail) {
                return mailSentDisplay();
              } else if (mailError) {
                return mailErrorDisplay();
              } else {
                return (
                  <form onSubmit={handleSubmit} noValidate>
                    <FormInputFloating 
                      type="text"
                      id="contactName"
                      label="Name"
                      placeholder="Name"
                      onChange={(e) => {
                        setFormInputs((prevState) => ({ ...prevState, name: e.target.value }));
                      }}
                      required="required"
                    />
                    <FormInputFloating 
                      type="email"
                      id="contactEmail"
                      label="Email address"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setFormInputs((prevState) => ({ ...prevState, email: e.target.value }));
                        validateEmail(e.target.value, "contactEmail")
                      }}
                      hasError={email.length > 0 ? hasError("contactEmail") : null}
                      required="required"
                      validationText={
                        <ValidationDisplay
                          hasError={email.length > 0 ? hasError("contactEmail") : null}
                          invalidFeedback="Invalid email address"
                        />
                      }
                    />
                    <FormTextAreaFloating 
                      label="Question or message"
                      placeholder="Leave a comment here"
                      id="contactMessage"
                      onChange={(e) => {
                        setFormInputs((prevState) => ({ ...prevState, message: e.target.value }));
                      }}
                      rows="4"
                      required="required"
                    />
                    <div className="my-3 text-center">
                      <button type="submit" className="btn btn-primary btn-lg">
                        {sendingMail ? (
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">wait </span>
                          </div>
                        ) : (
                          "Send"
                        )}
                      </button>
                    </div>
                  </form>
                );
              }
            
      })()}

    </>
  );
};

export default ContactForm;
