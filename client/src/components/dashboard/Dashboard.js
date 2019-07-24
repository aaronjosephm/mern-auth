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

    onNewTable = e => {
        e.preventDefault();
        this.props.history.push("/newtable");
    }

    onTableListClick = e => {
      e.preventDefault();
      this.props.history.push("/tables");
    }

    render() {
        const { user } = this.props.auth;
        console.log("Here is the history so far: ", this.props.history);
        return (
            <div>
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
                    <ButtonsWrapper>
                      <StartButton
                        className="btn btn-large waves-effect waves-light hoverable green accent-3"
                        onClick={(e) => this.onTableListClick(e)}
                      >
                        View open tables
                      </StartButton>
                    </ButtonsWrapper>
                    <ButtonsWrapper>
                      <StartButton
                        className="btn btn-large waves-effect waves-light hoverable green accent-3"
                        onClick={(e) => this.onNewTable(e)}
                        >
                        Create a new table
                      </StartButton>
                    </ButtonsWrapper>
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

const LogoutButton = styled.button `
  width: 150px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
  algin-items: right;
`;

const StartButton = styled.button `
  width: 300px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`;

const ButtonsWrapper = styled.div `
  display flex;
  justify-content: center;
  margin-top: 30px;
`;

const banner = styled.div `
  width: 100%;
  height: 10vh;
  position: absolute;
`