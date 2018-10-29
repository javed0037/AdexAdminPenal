import React from 'react';
import ReactDOM from 'react-dom';
import Privacypolicy from './Privacypolicy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Privacypolicy />, div);
  ReactDOM.unmountComponentAtNode(div);
});
