import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../../firebase/firebase";
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
    sendAgainBtn: true,
    sendAgain: false,
    users: [],
  };

  render() {
    // <------------Get data from form and store in firestore auth----------->
    const handleSignup = (e) => {
      this.setState({
        spinner: "block",
        loginError: false,
        verificationsuccess: false,
        sendAgain: false,
      });
      e.preventDefault();
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: this.state.userName.toLowerCase(),
          }).then(async () => {
            await setDoc(doc(db, "users", user.uid), {
              createdAt: new Date(),
              name: user.displayName,
              email: user.email,
              profilePic:
                "https://firebasestorage.googleapis.com/v0/b/textit-ee21b.appspot.com/o/DefaultProfilPic.png?alt=media&token=135a91ae-3f7f-4b1a-af39-3ddb92c667e2",
            });
          });
          this.setState({ users: user });
          verificationSend();
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
            sendAgain: false,
          });
        });
    };

    // <---------Send verification msg to email------------>
    const verificationSend = () => {
      this.setState({
        verificationsuccess: false,
        spinner: "block",
      });

      sendEmailVerification(auth.currentUser)
        .then((data) => {
          SendEmailAgain();
        })
        .catch((error) => {
          alert("someError in verifying email");
        });
    };
    // <-----------Resend verification email -------------->
    const SendEmailAgain = () => {
      this.setState({
        spinner: "none",
        verificationsuccess: true,
        sendAgainBtn: true,
        sendAgain: true,
      });
      setTimeout(() => {
        this.setState({ sendAgainBtn: false });
      }, 90000);
    };
    // <------------------------------------------>
    return (
      <>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3 mt-1">
            <Form.Label className="poppins300">Enter email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              required
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>

          <div className="userContact">
            <Form.Group className="mb-3">
              <Form.Label className="poppins300">User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                required
                value={this.state.userName}
                onChange={(e) => this.setState({ userName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="poppins300">Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                required
                value={this.state.contact}
                onChange={(e) => this.setState({ contact: e.target.value })}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label className="poppins300">
              Password (6 or more character)
            </Form.Label>
            <Form.Control
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
            <span
              style={{ float: "left" }}
              className="text-success poopins300 "
            >
              Verification email send successfully.
            </span>
          )}
          {this.state.sendAgain && (
            <OverlayTrigger
              style={{ float: "right" }}
              placement="bottom"
              overlay={
                this.state.sendAgainBtn ? (
                  <Tooltip>Wait for 90 sec</Tooltip>
                ) : (
                  <span></span>
                )
              }
            >
              <span style={{ float: "right" }} className="d-inline-block ">
                <Button
                  disabled={this.state.sendAgainBtn}
                  className=" poppins600 sendAgain"
                  onClick={() => {
                    verificationSend();
                  }}
                >
                  Send again
                </Button>
              </span>
            </OverlayTrigger>
          )}
          <Button type="submit" className="signinBtn">
            <span className="poppins300">Sign up</span>
          </Button>
        </Form>
      </>
    );
  }
}

export default SignupForm;
