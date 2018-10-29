import React from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './EditProfile';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
