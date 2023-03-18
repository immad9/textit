import { Routes as BRRoutes, Route } from "react-router-dom";
import { Component } from "react";
import Home from "../pages/home";
import Textit from "../pages/textit";
class Router extends Component {
  render() {
    return (
      <>
        <BRRoutes>
          <Route path="/" element={<Home />} />

          <Route path="/textit" element={<Textit />} />
        </BRRoutes>
      </>
    );
  }
}

export default Router;
