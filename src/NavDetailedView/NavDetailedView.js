import React, { Component } from 'react'
import './NavDetailedView.css'
import icon from '../images/icon.png'
import { Link } from 'react-router-dom'

const NavDetailedView = () => {
  return (
    <nav className='nav-styling'>
      <Link to={`/`}>
        <img className='icon' alt="pink tomatillo icon" src={icon} tabIndex="0" />
      </Link>
    </nav>
  )
}

export default NavDetailedView