import React from 'react';
import ReactDOM from 'react-dom';

const title = 'Welcome to lit-blog post platform';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);
module.hot.accept();
