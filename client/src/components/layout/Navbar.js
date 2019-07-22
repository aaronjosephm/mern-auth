import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  get loggedIn() {
    return this.props.auth.isAuthenticated;
  }

  render() {
    console.log("This is user value: ", this.props.auth);
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
              Black Jack
            </Link>
            {this.loggedIn && 
              <LogoutButton
              onClick={(e) => this.onLogoutClick(e)}
               >
                Logout
              </LogoutButton>
            }
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

const LogoutButton = styled.button`
  cursor: pointer;
  width: 150px;
  border-radius: 3px;
  letter-spacing: 1.5px;
  margin-top: 1rem;
  margin-left: 80vw;
`;