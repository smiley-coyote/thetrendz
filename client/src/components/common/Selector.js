import React from 'react';
import './Selector.css';

const Selector = ({text}) => {
  const { selectorStyle } = styles;
  return (
    <div className='Selector' style={selectorStyle}>
      {text}
    </div>
  );
};

const styles = {
  selectorStyle: {
    backgroundColor: 'white',
    margin: 5,
    padding: 5
  }
}

export default Selector;

