import React, { Component } from 'react'
import './Nav.css'
import icon from '../images/icon.png'
import { Link } from 'react-router-dom'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      userInput: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearInputs = () => {
    this.setState({ userInput: ''})
  }

  handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }
 
  render() {
    const {userInput} = this.state
    return (
      <nav className='nav-styling'>
        <Link to={`/`}>
          <img className='icon' alt="pink tomatillo icon" src={icon} tabIndex="0"/>
        </Link>
        <form>
          <input className='search-bar' type='search'
            value={this.state.userInput}
            placeholder='Search for a movie...'
            name='userInput' 
            onChange={event => this.handleChange(event)}
            onKeyDown={event => this.handleKeyDown(event)}
            />
          <Link to={`/search/${userInput}`}>
            <button
              className={this.state.userInput ? 'search-button' : 'search-button-disabled'}
              disabled={!this.state.userInput}>
              Search
            </button>
          </Link>
        </form>
      </nav>
    )
  }
}

export default Nav