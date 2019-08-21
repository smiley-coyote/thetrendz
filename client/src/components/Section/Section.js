import React from 'react';
import './Section.css';

const Section = ({children, style, title}) => {
  return (
    <div style={style} className='Section'>
      {title} 
      {children}
    </div>
  );
};

export default Section;