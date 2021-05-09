import React from "react";
//Components
import { Link } from "react-router-dom";
import { OnboardingButton } from "./";

export const BackButton = (props) => {
  return (
    <Link to={props.to}>
      <button type="button" className="btn float-start">
        <i className="fas fa-chevron-left"></i> Back
      </button>
    </Link>
  );
};

export const Modal = (props) => {
  return (
    <div className="modal fade" id={props.id} tabindex="-1" aria-labelledby={props.id} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={props.id}>
              {" "}
              {props.title}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">{props.body}</div>
          <div className="modal-footer">
            <button type="button" className={props.dismissClass || "btn btn-primary"} data-bs-dismiss="modal">
              {props.dismissText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MetaMaskWarning = (props) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 mx-auto mt-3">
        <div className="alert alert-danger alert-dismissible fade show pe-1 text-center" role="alert">
          <h6 className="alert-heading m-0">
            <strong>Hey there!</strong>
          </h6>
          <p className="m-0">
            This website doesn't work without an Ethereum-compatible browser or extension like MetaMask (and
            use Kovan). Please install one.
          </p>
          <OnboardingButton />
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
};

export const ValidationDisplay = (props) => {
  if (props.hasError === true) {
    return <div className="invalid-feedback d-block">{props.invalidFeedback}</div>;
  } else if (props.hasError === false) {
    return <div className="valid-feedback d-block">{props.validFeedback || "Looks good!"}</div>;
  } else {
    return "";
  }
};

export const FormInput = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        type={props.type || "text"}
        className={
          props.hasError === true
            ? "form-control is-invalid"
            : props.hasError === false
            ? "form-control is-valid"
            : "form-control"
        }
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autoComplete || "on"}
        placeholder={props.placeholder}
        required={props.required}
      />
      {props.extras}
      {props.validationText}
    </div>
  );
};

export const FormInputGroup = (props) => {
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <div className={props.required === "required" ? "input-group has-validation mb-3" : "input-group mb-3"}>
        <span className="input-group-text" id={props.id}>
          {props.leftElement}
        </span>
        <input
          type={props.type || "text"}
          className={
            props.hasError === true
              ? "form-control is-invalid"
              : props.hasError === false
              ? "form-control is-valid"
              : "form-control"
          }
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          aria-describedby={props.id}
          placeholder={props.placeholder}
          required={props.required}
        />
        {props.validationText}
      </div>
    </>
  );
};

export const FormInputFloating = (props) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={props.type || "text"}
        className={
          props.hasError === true
            ? "form-control is-invalid"
            : props.hasError === false
            ? "form-control is-valid"
            : "form-control"
        }
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete={props.autoComplete || "on"}
        required={props.required}
      />
      {props.validationText}
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const FormTextAreaFloating = (props) => {
  return (
    <div className="form-floating mb-3">
      <textarea
        className={
          props.hasError === true
            ? "form-control h-100 is-invalid"
            : props.hasError === false
            ? "form-control h-100 is-valid"
            : "form-control h-100"
        }
        rows={props.rows}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
      />
      {props.validationText}
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const DappVarsContext = React.createContext({
    web3:null,
    accounts:null,
    contract:null,
    userCurrency:null,
    setUserCurrency:null,
    localStorage:null,
    accountTypes:null,
    convertBetween:null})
