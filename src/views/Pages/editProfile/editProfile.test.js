import React from 'react';
import ReactDOM from 'react-dom';
import editProfile from './editProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<editProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
