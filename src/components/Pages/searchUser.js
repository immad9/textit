import { Component } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BiSearchAlt } from "react-icons/bi";
import { Auth, onAuthStateChanged } from "firebase/auth";
import "../main.css";
class SearchUser extends Component {
  state = {
    userData: [],
    ChatRoomData: [],
    data: [],
    messageText: "",
  };

  //   componentDidMount() {
  //     // <--------get chatroom data----------->
  //     onAuthStateChanged(auth, async (user) => {
  //       const chatRoomRef = collection(db, "chatRooms");
  //       const q = await query(
  //         chatRoomRef,

  //         where("users", "array-contains", user.uid)
  //       );
  //       await getDocs(q).then((doc) => {
  //         const chatRoomData = doc.docs.map((doc) => {
  //           return { ...doc.data(), id: doc.id };
  //         });
  //         const data = chatRoomData.map((value) => {
  //           const array = value.users;
  //           const index = array.indexOf(auth.currentUser.uid);
  //           array.splice(index, 1);

  //           return [array, value.id];
  //         });

  //         this.setState({ ChatRoomData: data });
  //       });
  //     });
  //   }
  //   componentDidUpdate(prevProps, prevState) {
  //     const text = this.state.ChatRoomData.map(async (value) => {
  //       const array = [];
  //       const docRef = doc(db, "users", value[0][0]);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         array.push(docSnap.data());
  //       } else {
  //         console.log("No such document!");
  //       }
  //       return [array, value[1]];
  //     });
  //     if (this.state.data == prevState.data) {
  //       const test = Promise.all(text);
  //       test.then((data) => {
  //         this.setState({ data: data });
  //       });
  //     }
  //   }
  render() {
    // console.log(this.state.data);
    // <--------------Get search result------------------>
    // const searchWithUserName = async () => {
    //   const value = document
    //     .getElementById("userValue")
    //     .value.trim()
    //     .toLowerCase();
    //   const q = query(collection(db, "users"), where("name", "==", value));
    //   await getDocs(q).then((doc) => {
    //     const searchResult = doc.docs.map((doc) => {
    //       return { ...doc.data(), id: doc.id };
    //     });
    //     this.setState({ userData: searchResult });
    //   });
    // };
    // <--------------Create chatRoom------------------>

    // const AddinChatRoom = async (searchId) => {
    //   const sortingArray = [auth.currentUser.uid, searchId].sort();

    //   const q = query(
    //     collection(db, "chatRooms"),
    //     where("users", "in", [sortingArray])
    //   );

    //   const querySnapshot = await getDocs(q);
    //   const userEmail = auth.currentUser.email;
    //   if (querySnapshot.empty) {
    //     await addDoc(collection(db, "chatRooms"), {
    //       createdBy: auth.currentUser.email,
    //       users: sortingArray,
    //       createdAt: new Date(),
    //       [userEmail]: true,
    //     });
    //     console.log("created");
    //   } else {
    //     querySnapshot.forEach((docs) => {
    //       const washingtonRef = doc(db, "chatRooms", docs.id);
    //       setDoc(washingtonRef, { [userEmail]
    //         : true }, { merge: true });
    //       //   updateDoc(washingtonRef, {
    //       //     [userEmail]: true,
    //       //   });
    //     });
    //     console.log("updated");
    //   }
    // };
    // const getMessageData = async (roomId) => {
    //   console.log(roomId);
    //   const q = query(
    //     collection(db, "messages"),
    //     where("roomId", "==", roomId)
    //   );

    //   const querySnapshot = await getDocs(q);

    //   querySnapshot.forEach((data) => {
    //     console.log(data.data());
    //   });
    // };
    // const createMessage = async (roomId) => {
    //   await addDoc(collection(db, "messages"), {
    //     roomId: roomId,
    //     createdAt: new Timestamp(),
    //     message: this.state.messageText,
    //     sender: auth.currentUser.uid,
    //   });
    // };

    return (
      <>
        {/* {this.state.data.map((value, index) => {
          return (
            <div key={index}>
              <h1
                onClick={() => {
                  getMessageData(value[1]);
                }}
              >
                {value[0][0].name}
              </h1>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={{ width: "300px", resize: "none" }}
                    value={this.state.messageText}
                    onChange={(e) =>
                      this.setState({ messageText: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
              <Button
                onClick={() => {
                  createMessage(value[1]);
                }}
              >
                Send message
              </Button>
            </div>
          );
        })}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <ListGroup>
            <InputGroup className="mb-3">
              <Form.Control
                id="userValue"
                placeholder="Seach by name"
                // onChange={searchWithUserName}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <BiSearchAlt color="#0089ed" size={20} />
              </Button>
            </InputGroup>

            {this.state.userData.map((user, index) => {
              return (
                <div key={index}>
                  {auth.currentUser.uid !== user.id ? (
                    <ListGroup.Item
                      style={{ width: "100%" }}
                      onClick={() => {
                        document.getElementById("userValue").value = "";
                        // AddinChatRoom(user.id);
                      }}
                    >
                      {user.email}
                    </ListGroup.Item>
                  ) : (
                    " "
                  )}
                </div>
              );
            })}
          </ListGroup>
        </div> */}
      </>
    );
  }
}

export default SearchUser;
