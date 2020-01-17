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


function Letter(props) {
    return (
      <button 
        className="letter"
        onClick={() => props.onClick()}
  
      >
        {props.value.toUpperCase()}
      </button>
    );
}


class Board extends React.Component {
   renderLetter(i) {
   
    return <Letter 
    value={i}
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
                      <div className={this.checkSelected(keys)}>
                          {this.renderLetter(keys)}
                      </div>
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



class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {


      letters: [],
      correctSelected: [],
      wrongSelected: [],
      selectedPhrase: null,
    };
  }

  selectPhrase() {
    const phrases = [
      "This is phrase one",
      "Second Phrase",
      "Finally the third phrase"
    ];


   // return phrases[Math.floor(Math.random() * phrases.length)]
    return "Test Phrase";
  }

  handleClick(i) {
    const letters = this.state.letters.slice();
    
    this.setState({
      letters: letters + i,
    });
  }

  checkScore() {
    const selected = this.state.letters;
    const phrase = this.selectPhrase();
    const splitPhrase = phrase.trim().toLowerCase().replace(/ /g,"").split("");

    /**
     * This line is code is from 
     * https://gist.github.com/telekosmos/3b62a31a5c43f40849bb 
     * from post by VonD made on Jul, 15, 2016
     */
     
    const uniquePhrase = [ ...new Set(splitPhrase)];

    const correctSelected = [];

    for(const letter of selected) {
        if(uniquePhrase.indexOf(letter) >= 0){
            correctSelected.push(letter);
        } 
      }
    return correctSelected;

    }

  render() {
    
    const selected = this.state.letters;
    const selectedPhrase = this.selectPhrase();
    const correct = this.checkScore();
    
    return (
      <div className="main-container">
        <div className="Phrase">
          <Phrase 
          phrase = {selectedPhrase}
          correct = {correct}
          />
        </div>
     
          <Board 
          selected = {selected}
          correct = {correct}
          onClick={(i) => this.handleClick(i)}
          />
  
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



