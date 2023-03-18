import { Component } from "react";
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
    showLoginModal: false,
  };
  componentWillUnmount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.emailVerified);
        console.log(auth.currentUser.emailVerified);
        //   console.log(user.emailVerified);
      } else {
        console.log("user sign out");
      }
    });
  }

  render() {
    return (
      <>
        <Button
          className="getStartedBtn "
          onClick={() => this.setState({ showLoginModal: true })}
        >
          Get Started
          <BiRightArrow className="mt-1 mx-2 " />
        </Button>
        <Modal
          show={this.state.showLoginModal}
          fullscreen="sm-down"
          keyboard={true}
        >
          <CgClose
            className="cgClose"
            onClick={() => {
              this.setState({ showLoginModal: false });
            }}
          />

          <div className="welcometotextit">
            <p className="poppins400">
              <span className="welcometo"> Welcome to</span>
              <span className="color"> textit </span>
            </p>

            {this.state.formShow === true ? (
              <h6 className="poppins400 ">
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
              </h6>
            ) : (
              <h6 className="poppins400  ">
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
              </h6>
            )}
          </div>

          <h2 className="poppins600">
            {this.state.formShow === true ? "Sign in " : "Sign up"}
          </h2>

          <Modal.Body>
            {this.state.formShow === true ? <SigninForm /> : <SignupForm />}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AuthModal;
