import React, { Component } from "react";
import DashboardBackground from '../../images/dashboard.jpg';
import styled from 'styled-components';

class Landing extends Component {

  render() {
    return (
       <MainWrapper>
        <img class="LoginBackground" src={DashboardBackground} />
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="text-color-white front-text col s12 center-align">
              <h4>
                <b>Welcome</b> to Black Jack!
              </h4>
              <p className="text-color-white flow-text text-darken-1">
                Invite your friends, play games, have fun!
              </p>
              <br />
              <a
                href="/register"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </a>
              <a
                href="/login"
                style={{
                  marginLeft: "2rem",
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect white hoverable black-text"
              >
                Log In
              </a>
            </div>
          </div>
        </div>
       </MainWrapper>
    );
  }
}

export default Landing;

const MainWrapper = styled.div`

`;