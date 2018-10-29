import React from 'react';
import ReactDOM from 'react-dom';
import TermAndConditions from './TermAndConditions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TermAndConditions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
