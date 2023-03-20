import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { auth, db } from "../../firebase/firebase";
import GoogleSignIn from "./googleSignIn";
import Spinner from "../Share/spinner";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import Button from "react-bootstrap/Button";

class SigninForm extends Component {
  state = {
    loginError: false,
    forgetPasswordError: false,
    email: "",
    password: "",
    forgetFormTrigger: false,
    spinner: "none",
    forgetPasswordSend: false,
  };
  render() {
    const handleLogin = (e) => {
      e.preventDefault();
      this.setState({ loginError: false, spinner: "block" });
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          // const user = userCredential.user;
          window.open("http://localhost:3000/textit", "_self");
          this.setState({ spinner: "none" });
        })
        .catch((error) => {
          this.setState({ spinner: "none" });
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(errorCode);
          // console.log(errorMessage);
          this.setState({ loginError: true, email: "", password: "" });
        });
    };
    const resetPassword = (e) => {
      e.preventDefault();
      this.setState({
        forgetPasswordError: false,
        forgetPasswordSend: false,
        spinner: "block",
      });

      sendPasswordResetEmail(auth, this.state.email)
        .then(() => {
          this.setState({ forgetPasswordSend: true, spinner: "none" });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          this.setState({ spinner: "none", forgetPasswordError: true });
        });
    };
    // onAuthStateChanged(auth, async (user) => {

    // });
    return (
      <React.Fragment>
        {this.state.forgetFormTrigger === false ? (
          <Form onSubmit={handleLogin}>
            <GoogleSignIn />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="poppins400 formlable">
                Enter email address
              </Form.Label>
              <Form.Control
                className="formControl"
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                required
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="poppins400 formlable">Password</Form.Label>
              <Form.Control
                className="formControl"
                type="password"
                placeholder="Password"
                value={this.state.password}
                autoComplete="off"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </Form.Group>
            <div className="errorForgetPassword">
              <p
                className=" forgetPassword f13 poppins300 pointer"
                onClick={() => this.setState({ forgetFormTrigger: true })}
              >
                Forget password
              </p>
              <Spinner display={this.state.spinner} />
              {this.state.loginError && (
                <p className="text-danger poopins300 f13">
                  Invalid Email or Password
                </p>
              )}
            </div>
            <Button type="submit" className="signinBtn">
              <span className="poppins400">Sign in</span>
            </Button>
          </Form>
        ) : (
          <Form onSubmit={resetPassword}>
            <h4 className="color poppins400">Reset Password</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="poppins400 formlable">
                Please enter your email address
              </Form.Label>
              <Form.Control
                className="formControl"
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                required
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
              <Spinner display={this.state.spinner} />
              {this.state.forgetPasswordSend && (
                <p className="text-success poopins300 f13 mt-2">
                  Email for reset password send at {this.state.email}
                </p>
              )}
              {this.state.forgetPasswordError && (
                <p className="text-danger poopins300 f13 mt-2">
                  Email not found
                </p>
              )}

              <Button type="submit" className="signinBtn">
                <span className="poppins300">Submit</span>
              </Button>
            </Form.Group>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

export default SigninForm;
