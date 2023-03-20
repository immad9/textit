import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiRightArrow } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import SigninForm from "./signinForm";
import SignupForm from "./signupForm";
import "../main.css";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, get } from "firebase/auth";
class AuthModal extends Component {
  state = {
    formShow: true,
    signintext: "Sign in",
  };

  render() {
    return (
      <div className="authModal text-dark">
        <div className="welcometotextit">
          <p className="poppins400 welcometoP">
            <span className="welcometo">Welcome to</span>
            <span className="color"> textit </span>
          </p>

          {this.state.formShow === true ? (
            <p className="poppins400 haveAnAccount">
              No Account ?
              <br />
              <span
                className="color pointer"
                onClick={() => {
                  this.setState({ formShow: false });
                }}
              >
                signup
              </span>
            </p>
          ) : (
            <p className="poppins400 haveAnAccount">
              Have an account ?
              <br />
              <span
                className="color pointer"
                onClick={() => {
                  this.setState({ formShow: true });
                }}
              >
                sign in
              </span>
            </p>
          )}
        </div>

        <h2 className="poppins600">
          {this.state.formShow === true ? "Sign in " : "Sign up"}
        </h2>

        <div>
          {this.state.formShow === true ? <SigninForm /> : <SignupForm />}
        </div>
      </div>
    );
  }
}

export default AuthModal;
