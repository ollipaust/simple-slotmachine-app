import React from 'react';

const symbol2emoji = {
  S: '⭐',
  B: '🍌',
  C: '🍒',
  M: '🐵'
};

const Reel = ({ symbol }) => 
  <div className="machine-reel">
    {symbol2emoji[symbol]}
  </div>

export default Reel;
