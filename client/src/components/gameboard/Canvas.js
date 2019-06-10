import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import Table from '../../images/poker-table.png';
import { cards } from '../constants/cards';
import { cardImages } from '../constants/cards';

class Canvas extends Component {
  constructor() {
    super();
    this.state = {
    	deck: cards,
      dealerHand: {},
      playerHand: {}
    }
  }

  componentWillMount() {
    if (this.state.deck === []) {
      this.setState({ deck: cards })
    }
  }

  generateRandomCard = () => {
  	const deck = Object.assign([], this.state.deck);
    console.log("deck in generateRandomCard: ", deck);
  	const currentLength = deck.length - 1;
  	const pos = Math.floor(Math.random()*currentLength);
  	const card = deck[pos];

    console.log("card: ", card);
  	deck.splice(pos, 1);
    this.setState({ deck });
  	return card;
  }

  generateDealerHand = () => {
    const leftCard = this.generateRandomCard();
    const rightCard = this.generateRandomCard();
    const dealerHand = {
      leftCard: leftCard,
      rightCard: rightCard 
    }
    console.log("dealerHand: ", dealerHand);
    this.setState({ dealerHand });
  }

  generatePlayerHand = () => {
    const leftCard = this.generateRandomCard();
    const rightCard = this.generateRandomCard();
    const playerHand = {
      leftCard: leftCard,
      rightCard: rightCard 
    }
    console.log("playerHand: ", playerHand);
    this.setState({ playerHand });
    console.log("state: ", this.state);
  }

  play = async e => {
    e.preventDefault();
    console.log("cards: ", cards);
    await this.setState({ deck: cards, dealerHand: {}, playerHand: {}});
    console.log("deck: ", this.state.deck);
    this.generatePlayerHand();
    this.generateDealerHand();
  }
  
  render() {
    const playerCards = this.state.playerHand;
    const hand = Object.values(playerCards).map(card => {
      console.log("here is that value: ", card);
      const cardImg = cardImages[`${card}`];
      return (
        <span>
          <Card>
            <img src={cardImg} width='50' height='80' />
          </Card>
        </span>
        );
    })
  	console.log('table is: ', Table);
    return (
      <div>
        <h1>Welcome to a new game!</h1>
        <HandDescription>
          <h3>Your hand:</h3>
          <PlayerHand>
            {hand}
          </PlayerHand>
        </HandDescription>
        <img src={Table} alt="poker table" height='400' width='700'/>
        <PlayButton
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            onClick={(e) => this.play(e)}
          >
            Play
        </PlayButton>
      </div>
    );
  }
}

export default Canvas;

const PlayerHand = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  bottom: -85px;
  z-index: 5;
  width: 150px;
  height: 100px;
  background-color: red;
`;

const Card = styled.div`
  width: 50px;
  height: 80px;
  background-color: blue;
`

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

const PlayButton = styled.button`
  position: relative;
  width: 200px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`;


