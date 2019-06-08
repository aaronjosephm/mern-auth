import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import styled from 'styled-components';

class Gameboard extends Component {

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h1>Welcome to a new game!</h1>
      </div>
    );
  }
}

Gameboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Gameboard);

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

