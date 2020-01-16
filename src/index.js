import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function IsSpace(props) {


// }


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


  
  render() {

    const phrase = this.props.phrase;
    const splitPhrase = phrase.split("");

    return (
      <div className="section">
      <div id="phrase" className="keyrow">
        {splitPhrase.map((letters) =>
          <div>
          {this.renderPhrase(letters)}  
          </div>
        )}
      </div>
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



