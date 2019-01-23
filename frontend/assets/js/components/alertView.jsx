import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import TableExampleCompact from './App'
 
// optional cofiguration
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}
 
class alertView extends Component  {
  render () {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <TableExampleCompact />
      </AlertProvider>
    )
  }
}
render(<alertView />, document.getElementById('root'))
 
