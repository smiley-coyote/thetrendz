import React from 'react';
import './Selector.css';

const Selector = ({text, list}) => {
  const listOptions = list.map(item => <option value={item.value} key={item.value}>{item.name}</option>)
  return (
      <select>
        <option value={text}>{text}</option>
        {listOptions}
      </select>
  );
};

export default Selector;

