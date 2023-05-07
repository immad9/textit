import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../../firebase/firebase";
import ResendVerficationEmail from "./resendVerficationEmail";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import Spinner from "../Share/spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
class SignupForm extends Component {
  state = {
    email: "",
    password: "",
    contact: "",
    userName: "",
    loginError: false,
    spinner: "none",
    verificationsuccess: false,
    users: [],
    resendBtnDisable: true,
    onClickHideverifiMsg: true,
  };
  // <------------Get data from form and store in firestore auth and firebase database----------->
  handleSignup = (e) => {
    this.setState({
      spinner: "block",
      loginError: false,
      verificationsuccess: false,
    });
    e.preventDefault();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: this.state.userName.toLowerCase(),
        });

        this.verificationSend();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        this.setState({
          verificationsuccess: false,
          spinner: "none",
          email: "",
          password: "",
          contact: "",
          userName: "",
          loginError: errorCode,
        });
      })
      .then(async () => {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          createdAt: new Date(),
          name: this.state.userName,
          email: this.state.email,
          profilePic:
            "https://firebasestorage.googleapis.com/v0/b/textit-ee21b.appspot.com/o/DefaultProfilPic.png?alt=media&token=135a91ae-3f7f-4b1a-af39-3ddb92c667e2",
        });
      });
  };
  // <---------Send verification msg to email------------>
  verificationSend = () => {
    this.setState({
      spinner: "block",
      resendBtnDisable: true,
      onClickHideverifiMsg: false,
    });
    const actionCodeSettings = {
      url: "http://localhost:3000/textit",
      handleCodeInApp: true,
    };
    sendEmailVerification(auth.currentUser, actionCodeSettings)
      .then((data) => {
        this.setState({
          spinner: "none",
          verificationsuccess: true,
          resendBtnDisable: true,
          onClickHideverifiMsg: true,
        });
        let sec = 60;
        const timer = setInterval(() => {
          if (sec > 0) {
            sec--;
            document.getElementById("timer").innerHTML = sec;
          } else if (sec == 0) {
            document.getElementById("timer").innerHTML = "Send again";
            this.setState({ resendBtnDisable: false });
            clearInterval(timer);
          }
        }, 1000);
      })
      .catch((error) => {
        alert("someError in verifying email");
      });
  };
  render() {
    return (
      <Form onSubmit={this.handleSignup}>
        <Form.Group className="mb-3 mt-1">
          <Form.Label className="poppins400 formlable">
            Enter email address
          </Form.Label>
          <Form.Control
            className="formControl"
            type="email"
            placeholder="Enter email"
            value={this.state.email}
            required
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </Form.Group>

        <div className="userContact">
          <Form.Group className="mb-3">
            <Form.Label className="poppins400 formlable">User name</Form.Label>
            <Form.Control
              className="formControl"
              type="text"
              placeholder="User name"
              required
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="poppins400 formlable">
              Contact Number
            </Form.Label>
            <Form.Control
              className="formControl"
              type="number"
              placeholder="Contact Number"
              required
              value={this.state.contact}
              onChange={(e) => this.setState({ contact: e.target.value })}
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3">
          <Form.Label className="poppins400 formlable">
            Password (6 or more)
          </Form.Label>
          <Form.Control
            className="formControl"
            type="password"
            placeholder="Password"
            minLength={6}
            required
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </Form.Group>
        <Spinner display={this.state.spinner} />
        {this.state.loginError == "auth/email-already-in-use" && (
          <span className="text-danger poopins300">Email already in use</span>
        )}
        {this.state.loginError == "auth/invalid-email" && (
          <span className="text-danger poopins300">Invalid email</span>
        )}
        {this.state.verificationsuccess && (
          <div className="welcometotextit">
            {this.state.onClickHideverifiMsg && (
              <span className="text-success poopins300 ">
                Verification email send successfully.
              </span>
            )}

            <Button
              disabled={this.state.resendBtnDisable}
              className="sendAgainBtn poppins300"
              onClick={this.verificationSend}
              id="timer"
            ></Button>
          </div>
        )}

        <Button type="submit" className="signinBtn">
          <span className="poppins300">Sign up</span>
        </Button>
      </Form>
    );
  }
}

export default SignupForm;
