import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import styled from 'styled-components';
import GameBoardBackground from '../../images/gameboard.jpg';

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
            <MainWrapper>
              <img class="LoginBackground" src={GameBoardBackground} />
              <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                  <div className="front-text text-color-white col s12 center-align">
                    <h4>
                      <b>Hey there,</b> {user.name.split(" ")[0]}
                      <p className="flow-text text-color-white text-darken-1">
                        You are logged into BLACK JACK BIAAATCH!!!!!{" "}
                        <span style={{ fontFamily: "monospace" }}></span>  👏
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
            </MainWrapper>
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

const MainWrapper = styled.div`


`;

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