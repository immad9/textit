import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../components/main.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../components/main.css";
import Spinner from "../components/Share/spinner";
import ChatItems from "../components/Share/chatItem";
import { doc, getDoc } from "firebase/firestore";
import SearchBar from "../components/Share/searchBar";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "../components/Share/topBar";
import BottomMessageBar from "../components/Share/bottomMessageBar";
class Textit extends Component {
  state = {
    spinner: "block",
    userData: [],
    givenData: [],
  };
  componentDidMount() {
    onAuthStateChanged(auth, async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setState({ spinner: "none", userData: docSnap.data() });
      } else {
        console.log("No such document!");
      }
    });
  }

  render() {
    const signout = () => {
      signOut(auth)
        .then(() => {
          window.open("/", "_self");
        })
        .catch((error) => {
          console.log("error occured in signout");
        });
    };

    return (
      <React.Fragment>
        {console.log(auth.currentUser)}
        <Spinner display={this.state.spinner} />
        {/* <Button onClick={signout}>Signout</Button> */}
        <div style={{ display: "flex" }}>
          <div>
            <SearchBar />
            <div className="checking">
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              {/*  <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              />{" "}
              <ChatItems
                src={this.state.userData.profilePic}
                name={this.state.userData.name}
                time="today"
                lastMessage="this is last message"
              /> */}
            </div>
          </div>
          <div
            className="bgchecking"
            style={{
              display: "flex",
              width: "100%",

              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TopBar />
            <BottomMessageBar />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Textit;
