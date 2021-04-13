import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() { //renders the word
    return this.state.answer
      .split("")
      .map(ltr =>
      (this.state.guessed.has(ltr) || (this.state.nWrong === this.props.maxWrong)
        ? ltr
        : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() { //renders the letter buttons, disables the button when the state.guessed has the letter
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr) || this.state.nWrong === this.props.maxWrong}
      >
        {ltr}
      </button>
    ));
  }

  handleClick(e) {
    console.log("restarting!")
    this.restart();
  }

  restart() {
    console.log("inside restart!")
    this.setState(curState => {
      const word = randomWord();
      return {
        nWrong: 0,
        guessed: new Set(),
        answer: word
      }
    })
  }

  /** render: render game */
  render() {
    const maxGuesses = this.state.nWrong === this.props.maxWrong;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {
          maxGuesses
            ? <img src={this.props.images[5]} alt={`${this.state.nWrong} wrong guesses`} />
            : <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`} />
        }
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
        {
          maxGuesses
            ? <p className='Hangman-text'>Out of guesses! {this.state.nWrong}/{this.props.maxWrong} chances used.</p>
            : <p className='Hangman-text'>Number of incorrect guesses: {this.state.nWrong}</p>
        }
        <button className="Hangman-restart" onClick={this.handleClick} id="restart">Restart!</button>
      </div>
    );
  }
}

export default Hangman;
