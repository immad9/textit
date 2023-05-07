import { Component } from "react";
import Image from "react-bootstrap/Image";
class ChatItems extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "300px",
          margin: "7px 0px",
          marginLeft: "20px",
        }}
      >
        <Image
          style={{ width: "48px", height: "48px" }}
          roundedCircle
          src={this.props.src}
        />
        <div
          className="ms-2"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div>
            <span
              className="poppine600"
              style={{
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              {this.props.name}
            </span>
            <span
              className="poppins400"
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                color: "#707991",
                float: "right",
              }}
            >
              {this.props.time}
            </span>
          </div>

          <p
            className="poppins400"
            style={{ fontSize: "14px", lineHeight: "18px", color: "#707991" }}
          >
            {this.props.lastMessage}
          </p>
        </div>
      </div>
    );
  }
}

export default ChatItems;
