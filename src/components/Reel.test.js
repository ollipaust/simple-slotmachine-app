import React from 'react';
import ReactDOM from 'react-dom';
import Reel from './Reel';

describe('<Reel />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Reel />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
