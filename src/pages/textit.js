import { Component } from "react";
import Button from "react-bootstrap/Button";
import "../components/main.css";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateCurrentUser,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../components/main.css";
import Spinner from "../components/Share/spinner";
import SearchUser from "../components/Pages/searchUser";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import Image from "react-bootstrap/Image";
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

  // const citiesRef = collection(db, "chatRooms");
  // const q = query(citiesRef, where("users", "array-contains", user.uid));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   const array = doc.data().users;
  //   const index = array.indexOf(user.uid);
  //   if (index > -1) {
  //     const xyz = array.splice(index, 1);
  //     check.push(array);
  //   }
  // });
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

    // onAuthStateChanged(auth, (user) => {
    //   auth
    //     .updateCurrentUser(uid, {
    //       emailVerified: true,
    //     })
    //     .then((userRecord) => {
    //       // See the UserRecord reference doc for the contents of userRecord.
    //       console.log("Successfully updated user", userRecord.toJSON());
    //     })
    //     .catch((error) => {
    //       console.log("Error updating user:", error);
    //     });
    // });

    return (
      <>
        {console.log(auth.currentUser)}
        <Spinner display={this.state.spinner} />
        <p className="textit" id="textit"></p>
        <Image
          style={{ width: "50px", height: "50px" }}
          src={this.state.userData.profilePic}
          roundedCircle
        />
        <p>{this.state.userData.name}</p>
        <p>{this.state.userData.email}</p>
        <Button onClick={signout}>Signout</Button>

        <SearchUser />
      </>
    );
  }
}

export default Textit;
