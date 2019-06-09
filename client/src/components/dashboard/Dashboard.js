import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import styled from 'styled-components';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onStartClick = e => {
    e.preventDefault();
    this.props.history.push("/gameboard");
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="row">
          <logoutButton
            onClick={(e) => this.onLogoutClick(e)}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </logoutButton>
        </div>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into a full-stack{" "}
                  <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
              </h4>
              <buttonsWrapper>
                <startButton
                  className="btn btn-large waves-effect waves-light hoverable green accent-3"
                  onClick={(e) => this.onStartClick(e)}
                >
                  Start a new game
                </startButton>
              </buttonsWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);

const logoutButton = styled.button`
  width: 150px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
  algin-items: right;
`;

const startButton = styled.button`
  width: 200px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`;

const buttonsWrapper = styled.div`
  display flex;
  justify-content: center;
`;

const banner = styled.div`
  width: 100%;
  height: 10vh;
  position: absolute;
`

