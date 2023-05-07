import React, { Component } from "react";
import "../main.css";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
class GoogleSignIn extends Component {
  state = { googleLoginError: false };
  render() {
    const handleGoogleSingnup = () => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          const user = result.user;

          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
            createdAt: new Date(),
          });
          window.location.href = "http://localhost:3000/textit";
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;

          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode + errorMessage);
          this.setState({ googleLoginError: true });
        });
    };
    return (
      <React.Fragment>
        <Button
          className="googleLoginBtn"
          onClick={() => {
            handleGoogleSingnup();
            this.setState({ googleLoginError: false });
          }}
        >
          <FcGoogle className="googleIcon" />
          <span className="poppins300 ">Sign in with google</span>
        </Button>
        {this.state.googleLoginError && (
          <span className="text-danger poopins300">
            Something is wrong please try again
          </span>
        )}
      </React.Fragment>
    );
  }
}

export default GoogleSignIn;
