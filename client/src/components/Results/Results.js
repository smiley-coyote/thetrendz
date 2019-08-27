import React from 'react';
import './Results.css';

const Results = ({list, style, close}) => {
  const results = list.map( item => <li key={item}>{item}</li>)
  return (
    <div className='Results' style={style}>
      <div onClick={close} className='close'></div>
      <ul>
      {results}
      </ul>
    </div>
  );
};

export default Results;