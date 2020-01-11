import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

    const selected = this.props.selected;
    const phrase = "This is the phrase";
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
       
    return (
      
      <div>
        <div className="Selected">
        {correctSelected}
        <h1>Wrong</h1>
        {wrongSelected}
        </div>
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

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      letters: [],

    };
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



