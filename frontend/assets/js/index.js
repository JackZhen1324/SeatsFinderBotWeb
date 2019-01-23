import React from 'react';
window.React = React;
import ReactDOM from 'react-dom';
import ButtonExampleButton from './App';
import TableExampleCompact from './components/table';
import Example from './components/nav';
import Alert from './components/alertTest'
import LoaderExampleLoader from './components/loaderDemo'
import Root from './App'
const initialState = {
    loader: 0
  }

  

ReactDOM.render(<Example/>,document.getElementById('header'));
ReactDOM.render(<Root/>, document.getElementById('react-app'))
//ReactDOM.render(<LoaderExampleLoader/>, document.getElementById('loader'))

