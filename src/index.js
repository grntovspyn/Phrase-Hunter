import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function IsSpace(props) {
  
  if(props.value === " ") {
    return "hide";
  } else {
    return 'letter';
  }

}


class PhraseLetters extends React.Component {
render() {  

  return (
    <button 
    
      className="letter"
    >
      {this.props.value.toUpperCase()}
  
    </button>
  );
}

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
  

  render() {
    const keyboardKeys = [
      ["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["z","x","c","v","b","n","m"]
    ];

       
    return (
      
      <div>
          <div id="qwerty" className="section">
              {keyboardKeys.map((rows) =>
                  <div className="keyrow">
                      {rows.map((keys) =>
                          <div className="key">
                              {this.renderLetter(keys)}
                          </div>
                      )}
                  </div>
              )}
          </div>
      </div>
    );
  }
}

class Phrase extends React.Component {
  renderPhrase(i) {
   
    return <PhraseLetters
    value={i}
    />;
  }

  checkSpace(i) {
    return <IsSpace
    value={i}
    />;
  }
  
  render() {

    const phrase = this.props.phrase;
    const splitPhrase = phrase.split("");

    return (
      <div className="section">
      <div id="phrase" className="keyrow">
        {splitPhrase.map((letters) =>
          <div className={this.checkSpace(letters)}>
          {this.renderPhrase(letters)}  
          </div>
        )}
      </div>
      </div>

    );


    /******************
    const selected = this.props.selected;
    const phrase = this.props.phrase;
    const splitPhrase = phrase.trim().toLowerCase().replace(/ /g,"").split("");

    // https://gist.github.com/telekosmos/3b62a31a5c43f40849bb from post by VonD made on Jul, 15, 2016
    const uniquePhrase = [ ...new Set(splitPhrase)];

    const correctSelected = [];
    const wrongSelected = [];

    for(const letter of selected) {
        if(uniquePhrase.indexOf(letter) >= 0){
          correctSelected.push(letter);
        } else {
          wrongSelected.push(letter); 
        }
      }
    return;

    }

*/

  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {


      letters: [],
      correctSelected: [],
      wrongSelected: [],

    };
  }

  selectPhrase() {
    const phrases = [
      "This is phrase one",
      "Second Phrase",
      "Finally the third phrase"
    ];


    return phrases[Math.floor(Math.random() * phrases.length)]

  }

  handleClick(i) {
    const letters = this.state.letters.slice();
    
    this.setState({
      letters: letters + i,
    });
  }

  render() {
    return (
      <div className="game">
        <Phrase 
        phrase = {this.selectPhrase()}
        
        />
        <div className="Phrase">
        </div>
        <div className="game-board">
          <Board 
          selected = {this.state.letters}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
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



