import { Component } from "react";
import Image from "react-bootstrap/Image";
import ChatItems from "./chatItem";
import { MagnifyingGlass, Phone, threeDots } from "../../assests/images";
class TopBar extends Component {
  state = {};
  render() {
    return (
      <div className="topBarMainDiv">
        <div>
          <ChatItems
            lastMessage="lastSeen"
            name="immad"
            src="https://firebasestorage.googleapis.com/v0/b/textit-ee21b.appspot.com/o/DefaultProfilPic.png?alt=media&token=135a91ae-3f7f-4b1a-af39-3ddb92c667e2"
          />
        </div>
        <div className="topBarIcons">
          <Image className="pointer" src={MagnifyingGlass} />{" "}
          <Image className="pointer" src={Phone} />
          <Image className="pointer" src={threeDots} />
        </div>
      </div>
    );
  }
}

export default TopBar;
