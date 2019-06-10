import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import Table from '../../images/poker-table.png';
import { cards } from '../constants/cards';
import { cardImages } from '../constants/cards';

const GAME_MESSAGES = {
  DEALER_WINS: 'The dealer wins!',
  PLAYER_WINS: 'You win!',
  DEALER_BUSTS: 'The dealer busts, you win!',
  PLAYER_BUSTS: 'Busted! You lose!',
  DRAW: 'It\'s a draw! No one wins.'
}

class Canvas extends Component {
  constructor() {
    super();
    this.state = {
    	deck: cards,
      dealerHand: {},
      playerHand: {},
      gamesWon: { value: 0 },
      gamesLost: { value: 0 },
      gameStatus: undefined,
      gameMessage: undefined
    }
  }

  componentWillMount() {
    if (this.state.deck === []) {
      this.setState({ deck: cards })
    }
  }

  checkValue = (value, playerType) => {
    let gamesWon = Object.assign({}, this.state.gamesWon);
    let gamesLost = Object.assign({}, this.state.gamesLost);
    if (value > 21) {
      console.log('busted!');
      if (playerType === 'player') {
        gamesLost.value = gamesLost.value + 1;
        this.setState({ gameMessage: GAME_MESSAGES.PLAYER_BUSTS, gamesLost })
      } else {
        gamesWon.value = gamesWon.value + 1;
        this.setState({ gameMessage: GAME_MESSAGES.DEALER_BUSTS, gamesWon })
      }
    } else if (value === 21) {
      if (playerType === 'player') {
        gamesWon.value = gamesWon.value + 1;
        this.setState({ gameMessage: GAME_MESSAGES.PLAYER_WINS, gamesWon })
      } else {
        gamesLost.value = gamesLost.value + 1;
        this.setState({ gameMessage: GAME_MESSAGES.DEALER_WINS, gamesLost })
      }
    } 
  }

  checkHand = (cards, playerType) => {
    let sumValue = 0;
    let acesArray = [];

    const cardValues = Object.values(cards);
    for (let card of cardValues) {
      let arr = card.split('');
      arr.pop();
      const type = arr.join('');

      if (type === 'J' || type === 'Q' || type ==='K') {
        sumValue = sumValue + 10;
      } else if (type !== 'A') {
        sumValue = sumValue + parseInt(type);
      } else {
        acesArray.push(type);
      }
      console.log('type is:', type);
    }

    for (let ace in acesArray) {
      if (sumValue + 11 > 21) {
        sumValue = sumValue + 2;
      } else {
        sumValue = sumValue + 11;
      }
    }
    console.log('sum is:', sumValue);
    this.checkValue(sumValue, playerType);
    return sumValue;
  }

  generateRandomCard = () => {
  	const deck = Object.assign([], this.state.deck);
  	const currentLength = deck.length - 1;
  	const pos = Math.floor(Math.random()*currentLength);
  	const card = deck[pos];
  	deck.splice(pos, 1);
    this.setState({ deck });
  	return card;
  }

  generateDealerHand = () => {
    const leftCard = this.generateRandomCard();
    const rightCard = this.generateRandomCard();
    const dealerHand = {
      card1: leftCard,
      card2: rightCard 
    }
    this.setState({ dealerHand });
    this.checkHand(dealerHand, 'dealer');
  }

  generatePlayerHand = () => {
    const leftCard = this.generateRandomCard();
    const rightCard = this.generateRandomCard();
    const playerHand = {
      card1: leftCard,
      card2: rightCard 
    }
    this.checkHand(playerHand, 'player');
    this.setState({ playerHand });
  }

  hit = (hand, type) => {
    const newHand = Object.assign({}, hand);
    const newCard = this.generateRandomCard();
    const title = `card${Object.keys(newHand).length + 1}`;
    newHand[`${title}`] = newCard;
    if (type === 'player') {
      this.setState({ playerHand: newHand });
      this.checkHand(newHand, 'player');
    } else {
      this.setState({ dealerHand: newHand });
      this.checkHand(newHand, 'dealer');
    }
  }

  calculateWinner = () => {
    const playerValue = this.checkHand(this.state.playerHand, 'player');
    const dealerValue = this.checkHand(this.state.dealerHand, 'dealer');
    let gamesLost = Object.assign({}, this.state.gamesLost);
    if (dealerValue > playerValue) {
      gamesLost.value = gamesLost.value + 1;
      this.setState({ gameMessage: GAME_MESSAGES.DEALER_WINS, gamesLost })
    } else if (dealerValue === playerValue) {
      this.setState({ gameMessage: GAME_MESSAGES.DRAW })
    }
  }

  draw = async () => {
    let dealerHandValue = this.checkHand(this.state.dealerHand, 'dealer');
    const playerHandValue = this.checkHand(this.state.playerHand, 'player');
    while (dealerHandValue <= 21) {
      if (dealerHandValue > 16 && dealerHandValue >= playerHandValue) {
        this.calculateWinner();
        break;
      } else {
        this.hit(this.state.dealerHand, 'dealer');
      }
      await setTimeout(() => {}, 100);
      dealerHandValue = this.checkHand(this.state.dealerHand, 'dealer');
      await setTimeout(() => {}, 400);
    }
  }

  play = async e => {
    e.preventDefault();
    await this.setState({ 
      deck: cards, 
      dealerHand: {}, 
      playerHand: {},
      gameStatus: undefined,
      gameMessage: ''
    });
    this.generatePlayerHand();
    this.generateDealerHand();
  }
  
  render() {
    const playerCards = this.state.playerHand;
    const dealerCards = this.state.dealerHand;
    const gamesWon = this.state.gamesWon.value
    const gamesLost = this.state.gamesLost.value
    const total = gamesWon + gamesLost;

    const playerHandJSX = Object.values(playerCards).map(card => {
      const cardImg = cardImages[`${card}`];
      return (
        <span>
          <Card>
            <img src={cardImg} width='70' height='100' />
          </Card>
        </span>
        );
    })

    const dealerHandJSX = Object.values(dealerCards).map(card => {
      const cardImg = cardImages[`${card}`];
      return (
        <span>
          <Card>
            <img src={cardImg} width='70' height='100' />
          </Card>
        </span>
        );
    })

    return (
      <div>
        <GameCount>
          <h4>Games Won: {gamesWon}</h4>
          <h4>Games Lost: {gamesLost}</h4>
          <h4>Total: {total}</h4>
        </GameCount>
        <br />
        <br />
        <br />
        <br />
        <DealerHandDescription>
          <h4>Dealer's hand:</h4>
          <DealerHand>
            {dealerHandJSX}
          </DealerHand>
        </DealerHandDescription>
        <GameMessage>
          {this.state.gameMessage && 
            <h3><strong>{this.state.gameMessage}</strong></h3>
          }
        </GameMessage>
        <HandDescription>
          <h4>Your hand:</h4>
          <PlayerHand>
            {playerHandJSX}
          </PlayerHand>
        </HandDescription>
        <img src={Table} alt="poker table" height='400' width='700'/>
        <ButtonsWrapper>
          <PlayButton
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              onClick={(e) => this.play(e)}
              disabled={this.state.gameMessage === ''}
            >
              Deal
          </PlayButton>
          <HitButton
            className="btn btn-large waves-effect waves-light hoverable purple accent-3"
            onClick={() => this.hit(this.state.playerHand, 'player')}
            disabled={this.state.gameMessage !== '' && this.state.gameMessage !== undefined}
            >
            Hit me!
          </HitButton>
          <DrawButton
            className="btn btn-large waves-effect waves-light hoverable red accent-3"
            onClick={() => this.draw()}
            disabled={this.state.gameMessage !== '' && this.state.gameMessage !== undefined}
            >
            draw
          </DrawButton>
        </ButtonsWrapper>
      </div>
    );
  }
}

export default Canvas;

const GameMessage = styled.div`
  width: 800px;
  bottom: 350px;
  position: absolute;
  display: flex;
  justify-content: center;

  & h3 {
    font-weight: 900 !important;
    color: white !important;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
`

const PlayerHand = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  bottom: -100px;
  z-index: 5;
  width: 220px;
  height: 100px;
`;

const DealerHand = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  bottom: -100px;
  z-index: 5;
  width: 220px;
  height: 100px;
`;

const Card = styled.div`
  width: 70px;
  height: 100px;
`;

const GameCount = styled.div`
  width: 800px;
  position: absolute;
  bottom: -100px;
  padding-top: 200px;
  display: table;
  justify-content: center;

  & h4 {
    color: white !important;
  }
`;

const DealerHandDescription = styled.div`
  width: 800px;
  position: absolute;
  bottom: 550px;
  padding-top: 200px;
  display: flex;
  justify-content: center;

  & h4 {
    color: white !important;
  }
`;

const HandDescription = styled.div`
  width: 800px;
	position: absolute;
	padding-top: 200px;
	display: flex;
	justify-content: center;

	& h4 {
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

const HitButton = styled.button`
  position: relative;
  width: 200px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`

const DrawButton = styled.button`
  position: relative;
  width: 200px;
  borderRadius: 3px;
  letterSpacing: 1.5px;
  marginTop: 1rem;
`

































