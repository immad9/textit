import React, { Component } from "react";
import { Bars } from "../../assests/images";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "../main.css";

class SearchBar extends Component {
  state = {
    searchValue: " ",
  };
  render() {
    return (
      <div className="searchBarDiv">
        <Image src={Bars} className="pointer" />
        <Form.Control
          onChange={(e) =>
            this.setState({ searchValue: e.target.value.trim() })
          }
          className="poppins searchBar"
          type="text"
          placeholder="Search"
        />
      </div>
    );
  }
}

export default SearchBar;
