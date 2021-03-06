import React from 'react';
import './Selector.css';

const Selector = ({text, list, onChange, name, defaultValue}) => {
  const listOptions = list.map(item => <option value={item.value} key={item.name}>{item.name}</option>)
  return (
      <select name={name} onChange={onChange} defaultValue={defaultValue}>
        <option value={text}>{text}</option>
        {listOptions}
      </select>
  );
};

export default Selector;

