import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import Table from '../../images/poker-table.png';
import { cards } from '../constants/cards';

class Canvas extends Component {

  generateRandomCard() {

  }
  
  render() {
  	console.log('table is: ', Table);
    return (
      <div>
        <h1>Welcome to a new game!</h1>
        <HandDescription>
          <h3>Your hand:</h3>
          <Hand>
          	<RandomCard />
          	<RandomCard />
          </Hand>
        </HandDescription>
        <img src={Table} alt="poker table" height='400' width='700'/>
      </div>
    );
  }
}

export default Canvas;

const HandDescription = styled.div`
    width: 800px;
	position: absolute;
	padding-top: 200px;
	display: flex;
	justify-content: center;

	& h3 {
		color: white !important;
	}
`;


