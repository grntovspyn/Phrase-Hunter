import React from 'react';



function PhraseLetters(props) {
  return (
    <div
      className={props.class}
    >
      {props.value.toUpperCase()}
    </div>
  );
}

export default PhraseLetters;