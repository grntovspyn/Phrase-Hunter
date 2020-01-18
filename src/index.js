import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function PhraseLetters(props) {
  return (
    <div
      className={props.class}
    >
      {props.value.toUpperCase()}

    </div>
  );
}

function liveHeart(props) {
  return (
    <div
      className="Hearts"
    >
     <img src="liveHeart.png" alt="full heart"></img>

    </div>
  );
}

function lostHeart(props) {
  return (
    <div
      className="Hearts"
    >
     <img src="lostHeart.png" alt="full heart"></img>

    </div>
  );
}


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


class Board extends React.Component {
   renderLetter(i) {
   
    return <Letter 
    value={i}
    class={this.checkSelected(i)}
    onClick={() => this.props.onClick(i)}
    
    />;
  }
  
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


class Phrase extends React.Component {
  renderPhrase(i) {
   
    return <PhraseLetters
    value={i}
    class={this.checkLetters()}
    
    />;
  }

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

// class Lives extends React.Component {

//   renderHearts(lives) {
//     return (
//       <Hearts
//         lives={lives}

//       />
//     )

//   }

  

//   render() {
//     const livesLeft = 5 - this.props.lives;
    
    
//     const lives = Array(5).fill(null);
//     const moves = lives.map((step) => {
//       return (
//         <ul>
//           <li className="section">
//             {this.renderHearts(this.props.lives)}
//           </li>
//         </ul>
//       );
//     });
    
//     return (
//       <div className="game-info">
//       <div>{moves}</div>
//       </div>
//     );

//   }
// }


class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      letters: [],
      selectedPhrase: null,
      isNewGame: true,
      winOrLose: null,
      lives: 0,
    };

    this.initialState = this.state;
  }


  selectPhrase() {
    const phrases = [
      "This is phrase one",
      "Second Phrase",
      "Finally the third phrase"
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
          heartsToReturn.push(<li> {liveHeart()}</li>);
         }
         for(var j = 0; j < livesLost; j++){
          heartsToReturn.push(<li> {lostHeart()}</li>);
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
