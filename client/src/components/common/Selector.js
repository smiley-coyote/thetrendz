import React from 'react';
import './Selector.css';

const Selector = ({text, list, onChange, name}) => {
  const listOptions = list.map(item => <option value={item.value} key={item.value}>{item.name}</option>)
  return (
      <select name={name} onChange={onChange}>
        <option value={text}>{text}</option>
        {listOptions}
      </select>
  );
};

export default Selector;

