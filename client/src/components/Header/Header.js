import React from 'react';

const Header = () => {
  const { headerStyle, spanStyle, h1Style } = styles;
  return (
    <div style={headerStyle}>
      <h1 style={h1Style}><span style={spanStyle}>the</span>Trendz</h1>
    </div>
  );
};

const styles = {
  headerStyle: {
    flex: 1,
    textAlign: 'center'
  },
  h1Style: {
    marginTop: 0,
    paddingTop: 15
  },
  spanStyle: {
    fontSize: '.5em'
  }
}

export default Header;