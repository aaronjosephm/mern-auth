import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import styled from 'styled-components';
import Canvas from './Canvas';

class Gameboard extends Component {
  goBack(e) {
    e.preventDefault();
    this.props.history.push('/dashboard');
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <GameCanvasWrapper>
          <Canvas />
        </GameCanvasWrapper>
        <BackButton
          className="btn btn-large waves-effect waves-light hoverable red accent-3"
          onClick={(e) => this.goBack(e)}
        >
          Cancel
        </BackButton>
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

const LogoutButton = styled.button`
  width: 150px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
  algin-items: right;
`;

const StartButton = styled.button`
  width: 200px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`;

const ButtonsWrapper = styled.div`
  display flex;
  justify-content: center;
`;

const GameCanvasWrapper = styled.div`
  margin: auto;
  background-color: green;
  height: 600px;
  margin-bottom: 20px;
  width: 800px;
`;

const BackButton = styled.button`
  width: 150px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`

const banner = styled.div`
  width: 100%;
  height: 10vh;
  position: absolute;
`

