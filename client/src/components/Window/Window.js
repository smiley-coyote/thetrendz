import React from 'react';

const Window = ({title, list}) =>{
  const selectList = list.map(item => <li value={item.value}>{item.name}</li>)
  return (
    <div className='Window'>
      <h2>{title}</h2>
      <select>
        {selectList}
      </select>
    </div>
  );
};

export default Window;