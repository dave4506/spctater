import React, {PropTypes,Component} from 'react'

const Navbar = ({textCat,switchText}) => {
  return (
    <div className="navbar">
      <h2 onClick={(e)=>{switchText('backCat')}} id="back" className="low arrow">{"<-"}</h2>
      <h4 id="title">{textCat}</h4>
    </div>
  )
}

Navbar.propTypes = {
}

export default Navbar
