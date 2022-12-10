import React, { Component } from 'react'
import './Nav.css'
import icon from '../images/icon.png'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      userInput: ''
    }
  }

  // submitSearch = (event) => {
  //   event.preventDefault()
  //   this.props.filterMovie(this.state.userInput)
  // }

  handleChange = event => {
    // event.preventDefault()
    this.setState({ userInput: event.target.value })
    this.props.filterMovie(this.state.userInput)
  }

  clearInputs = (event) => {
    this.setState({ userInput: ''})
    this.props.filterMovie('')
  }

  handleKeyUp = event => {
    event.preventDefault()
    this.props.filterMovie(this.state.userInput)

  }
 
  render() {
    return (
      <nav className='nav-styling'>
        <Link to={`/`}>
          <img
            className='icon'
            alt="pink tomatillo icon"
            src={icon} tabIndex="0"
            onClick={(event)=>this.clearInputs(event)}
          />
        </Link>
        <form>
          <input 
            className='search-bar' 
            type='text'
            value={this.state.userInput}
            placeholder='Search for a movie...'
            name='userInput' 
            onChange={event => this.handleChange(event)}
            onKeyUp={event => this.handleKeyUp(event)}
            />
        </form>
      </nav>
    )
  }
}

Nav.propTypes = {
  userInput: PropTypes.string,
  filterMovie: PropTypes.func.isRequired,
};

export default Nav