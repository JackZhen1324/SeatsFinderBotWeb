
import React from 'react'
import Popup from 'reactjs-popup'
require('./alertView.css')
 const Alert =  () => (
    
    <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    closeOnDocumentClick
  >
    <span> Modal content </span>
  </Popup>
)
export default Alert