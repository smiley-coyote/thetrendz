import React from 'react';
import './Section.css';

const Section = ({children, style}) => {
  return (
    <div style={style} className='Section'>
      {children}
    </div>
  );
};

export default Section;