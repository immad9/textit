import { Component } from "react";
import "../main.css";
import { CgSpinnerTwoAlt } from "react-icons/cg";
class Spinner extends Component {
  state = {};
  render() {
    return (
      <>
        <CgSpinnerTwoAlt
          size={25}
          color="#0098ed"
          className="spinner"
          style={{ display: this.props.display }}
        />
      </>
    );
  }
}

export default Spinner;
