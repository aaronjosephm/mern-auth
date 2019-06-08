import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "Josefin Sans"
              }}
              className="col s5 brand-logo center black-text"
            >
              
              CatchApp
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;