import React from 'react';
import './Results.css';

const Results = ({list, style}) => {
  const results = list.map( item => <li key={item}>{item}</li>)
  return (
    <div className='Results' style={style}>
      <ul>
      {results}
      </ul>
    </div>
  );
};

export default Results;