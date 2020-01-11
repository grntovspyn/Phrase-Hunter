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



