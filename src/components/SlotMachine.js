import React, { Component } from 'react';
import Stage from './Stage';
import Reel from './Reel';
import { AutoSpinCounter, SpinCounter } from "./countDown/Timers";

class SlotMachine extends Component {
  constructor(props) {
    super(props);
    this.possibleSymbols = ['S', 'B', 'C', 'M'];
    this.numOfReels = 3;
    this.wheelGenerators = [];
    this.state = {
      stage: Stage.READY,
      wheels: this.getRandomReels(),
      text: 'Press START to spin & win!'
    };
    this.timers = {};
  }

  componentDidMount() {
    this.timers.autoStart = setTimeout(() => this.start(true), 10000);
  }

  componentWillUnmount() {
    Object.values(this.timers).forEach(timerId => clearInterval(timerId));
  }

  say(text) {
    this.setState({ text });
  }

  * wheelGenerator(symbols) {
    let index = this.pickRandomIndex(symbols);
    while (true) {
      yield symbols[index];
      index = index === symbols.length - 1 ? 0 : index + 1;
    }
  }

  getRandomReels() {
    return Array(this.numOfReels).fill().map((wheel, idx) => {
      this.wheelGenerators.push(this.wheelGenerator(this.possibleSymbols));
      return this.wheelGenerators[idx].next().value;
    });
  }

  pickRandomIndex(collection) {
    return Math.floor(Math.random() * collection.length);
  }

  pickRandomItem(collection) {
    const randomIndex = this.pickRandomIndex(collection);
    return collection[randomIndex];
  }
  calculatePrize(symbols) {
    const jackpot = '💰 Congratulations! You won the Jackpot of 100 coins! 💰';
    const secondPrize = 'Wow, that was close! You won 20 coins!';
    const thirdPrize = 'You won 10 coins. Don\'t worry, just try again!'
    if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
      return jackpot;
    }

    if (symbols[0] === symbols[1] || symbols[1] === symbols[2]) {
      return secondPrize;
    } 
    
    if (symbols[0] === symbols[2]) {
      return thirdPrize;
    }

    return 0;
  }
  

  start(isAuto = false) {
    clearTimeout(this.timers.autoStart);
    this.timers.spinner = setInterval(() => {
      const newReels = this.state.wheels.map((wheel, idx) => this.wheelGenerators[idx].next().value);
      this.setState({
        wheels: newReels
      });
    }, 50);
    this.setState({
      stage: Stage.SPINNING
    });
    this.say(isAuto ? AutoSpinCounter : SpinCounter );
    this.timers.autoStop = setTimeout(() => this.stop(), 5000);
  }

  stop(isAuto = false) {
    clearInterval(this.timers.spinner);
    clearTimeout(this.timers.autoStop);
    const finalReels = Array(this.numOfReels).fill().map(() => this.pickRandomItem(this.possibleSymbols));
    const prize = this.calculatePrize(finalReels);
    this.setState({
      wheels: finalReels,
      stage: Stage.READY
    });
    const prizeText = prize ? prize : 'Aww 😥...You won nothing... Try again!';
    this.say(`${isAuto ? '' : ''} ${prizeText}`);
  }

  render() {
    return (
      <div className="machine">
        <div className="machine-reels">
          { this.state.wheels.map((symbol, idx) => <Reel key={idx} symbol={symbol} />) }
        </div>
        <p className="machine-message">{this.state.text}</p>
        <div className="machine-controls">
          <button className="machine-button_start" onClick={() => this.start()} disabled={this.state.stage === Stage.SPINNING}>Start</button>
          <button className="machine-button_stop" onClick={() => this.stop()} disabled={this.state.stage === Stage.READY}>Stop</button>
        </div>
      </div>
    );
  }
}

export default SlotMachine;