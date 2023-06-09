import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { picture_1 } from "../../assests/images";
import Button from "react-bootstrap/Button";
import AuthModal from "./authModal";
import "../main.css";

class HomeHeader extends Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <header className="headerbg">
        <h3 className="poppins600 logoStyling">textit</h3>
        <Container className="headerContainer">
          <Row>
            <Col sm={5} md={6} lg={4} className="headerUpperText">
              <h1 className="poppins600"> Sign in to</h1>
              <h5 className="poppins400">Lorem ipsum</h5>
              <p className="poppins300">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </Col>
            <Col md={0} lg={3} className="headerImageCol">
              <img className="headerImage" src={picture_1} />
            </Col>
            <Col sm={12} lg={5}>
              <AuthModal />
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default HomeHeader;
