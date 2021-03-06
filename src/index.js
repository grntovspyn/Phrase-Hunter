import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhraseLetters from './components/PhraseLetters.js';
import LiveHeart from './components/LiveHeart.js';
import LostHeart from './components/LostHeart.js';



//Checks if the letter has been selected and disables it to prevent duplicate entries
function Letter(props) {
  if(props.class !== "key") {
    return (
      <button 
        className={props.class}
        onClick={() => props.onClick()}
        disabled
      >
        {props.value.toUpperCase()}
      </button>
    );
  } else {
    return (
      <button 
        className={props.class}
        onClick={() => props.onClick()}
      >
        {props.value.toUpperCase()}
      </button>
    );
  }
}

//Class for displaying keyboard
class Board extends React.Component {
   renderLetter(i) {
    return <Letter 
    value={i}
    class={this.checkSelected(i)}
    onClick={() => this.props.onClick(i)}
    />;
  }
  
  //Selects class name to style keyboard keys correctly
  checkSelected(keys){
    const selected = this.props.selected;
    const correct = this.props.correct;
    if(selected != null) {
        
      if(selected.indexOf(keys) >= 0 && correct.indexOf(keys) >= 0) {
        return "key chosen";
      } else if (selected.indexOf(keys) >= 0 && correct.indexOf(keys) <= 0) {
        return "key wrong";
      } else {
        return "key";
      }
    }
  }

  render() {
    const keyboardKeys = [
      ["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["z","x","c","v","b","n","m"]
    ];

    return (
      <div id="qwerty" className="section">
          {keyboardKeys.map((rows) =>
              <div className="keyrow">
                  {rows.map((keys) =>
                    this.renderLetter(keys)
                  )}
              </div>
          )}
      </div>
    );
  }
}

//Class for displaying phrase to guess
class Phrase extends React.Component {
  renderPhrase(i) {
   
    return <PhraseLetters
    value={i}
    class={this.checkLetters()}
    
    />;
  }

  //Selects correct class name to style phrase display correctly
  checkSpace(letters, correctLetters) {
    
    if(correctLetters.indexOf(letters) >= 0) {
      return "show letter";
    } else if (letters === " ") {
      return 'space';
    } else {
      return 'hide letter'
    }
  }
  
  render() {

    const phrase = this.props.phrase;
    const splitPhrase = phrase.toLowerCase().split("");
    const correctLetters = this.props.correct;

    return (
  
      <div id="phrase" className="section">
        <ul>
        {splitPhrase.map((letters) => 
          <li className={this.checkSpace(letters, correctLetters)}>
          {letters.toUpperCase()}  
          </li>
        )}
        </ul>
      </div>

    );
  }
}

//Top level class that controls the game
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      letters: [],
      selectedPhrase: null,
      isNewGame: true,
    };

    //Use this to reset the game once complete
    this.initialState = this.state;
  }

  selectPhrase() {
    const phrases = [
      "This is Phrase One",
      "Second Phrase",
      "Finally the Third Phrase",
      "Guess Another Phrase"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  handleClick(i) {
    const letters = this.state.letters;
    this.setState({
      letters: letters + i,
    });
  }

  makePhraseUnique(selectedPhrase) {
    const phrase = selectedPhrase;
    const splitPhrase = phrase.trim().toLowerCase().replace(/ /g,"").split("");

    /**
     * This line of code is from 
     * https://gist.github.com/telekosmos/3b62a31a5c43f40849bb 
     * from post by VonD made on Jul, 15, 2016
     */
    const uniquePhrase = [ ...new Set(splitPhrase)];
    return uniquePhrase;
  }

  checkIfCorrect(selectedPhrase) {
    const selected = this.state.letters;
    const uniquePhrase = this.makePhraseUnique(selectedPhrase);
    const correctSelected = [];

    for(const letter of selected) {
        if(uniquePhrase.indexOf(letter) >= 0){
            correctSelected.push(letter);
        }
    }
    return correctSelected;
  }

  checkForWin() {
    const selected = this.state.letters;
    const currentPhrase = this.state.selectedPhrase;
    const correct = this.checkIfCorrect(currentPhrase);
    const uniquePhrase = this.makePhraseUnique(currentPhrase);

    const lives = selected.length - correct.length;

    if(uniquePhrase.length === correct.length && lives < 5) {
      return true;
    } else if(lives === 5) {
      return false;
    }
    return null;

  }


  render() {
     if(this.state.isNewGame) {
      return (
        <div className="main-container">
          <h2 className="banner header">Phrase Hunter</h2>
          <div className="section">
          <button
            className="button"
            onClick={() =>
            this.setState({
              isNewGame: false,
              selectedPhrase: this.selectPhrase(),
            })}
          >Start New Game</button>
          </div>
        </div>
      );
     } else if(this.checkForWin() === true) {
        return (
          <div className="main-container">
            <div className="section">
              <div id ="overlay" className="overlayheader">
              <h2 className="banner header">Phrase Hunter</h2>
                <h1>Congratulations on guessing "{this.state.selectedPhrase}". You win!</h1>
                  <div className="section">
                    <button
                      className="button"
                      onClick={() => this.setState(this.initialState)}
                    >Reset Game</button>
                </div>
            </div>
          </div>
        </div>
        );
    } else if (this.checkForWin() === false) {
        return (
          <div className="main-container">
            <div className="section">
              <div id ="overlay" className="overlayheader">
              <h2 className="banner header">Phrase Hunter</h2>
                <h1>I'm sorry but the phrase was "{this.state.selectedPhrase}". Please try again!</h1>
                  <div className="section">
                    <button
                      className="button"
                      onClick={() => this.setState(this.initialState)}
                    >Reset Game</button>
                  </div>
              </div>
            </div>
          </div>
        );
    } else if(!this.state.isNewGame) {
      const selected = this.state.letters;
      const currentPhrase = this.state.selectedPhrase;
      const correct = this.checkIfCorrect(currentPhrase);
      const livesLost = selected.length - correct.length;

      let heartsToReturn = [];
      const displayHeart = () => {
         for(var i = 5; i > livesLost; i--){
          heartsToReturn.push(<li> {LiveHeart()}</li>);
         }
         for(var j = 0; j < livesLost; j++){
          heartsToReturn.push(<li> {LostHeart()}</li>);
         }
         return heartsToReturn;
        };
   
      return (
        <div className="main-container">
          <h2 className="banner header">Phrase Hunter</h2>
          <div className="Phrase">
            <Phrase 
              phrase = {currentPhrase}
              correct = {correct}
            />
          </div>
            <Board 
              selected = {selected}
              correct = {correct}
              onClick={(i) => this.handleClick(i)}
            />
          <div className="game-info">
            <div className="section">
              <ul>
                  {displayHeart()}
              </ul>
            </div>
          </div>  
        </div>
      );
    } 
    
  } 
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
