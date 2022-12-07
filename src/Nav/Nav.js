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

  submitSearch = (event) => {
    event.preventDefault()
    this.props.filterMovie(this.state.userInput)
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({ userInput: ''})
  }

  handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      this.submitSearch(event)
    }
  }
 
  render() {
    return (
      <nav className='nav-styling'>
        <Link to={`/`}>
          <img className='icon'  src={icon} tabIndex="0"/>
        </Link>
        <form>
          <input className='search-bar' type='text'
            value={this.state.userInput}
            placeholder='Search for a movie...'
            name='userInput' 
            onChange={event => this.handleChange(event)}
            onKeyDown={event => this.handleKeyDown(event)}
            />

          <button className='search-button' onClick={event => this.submitSearch(event)}>Search</button>
        </form>
      </nav>
    )
  }
}

export default Nav