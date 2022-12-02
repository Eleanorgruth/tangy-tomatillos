import React, { Component } from 'react'
import './Nav.css'
import icon from '../images/icon.png'


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
  }

  clearInputs = () => {
    this.setState({ userInput: ''})
  }
 
  render() {
    return (
      <nav>
        <img width="25px" src={icon} />
        <form>
          <input type='text'
            value={this.state.userInput}
            placeholder='Search for a movie...'
            name='userInput' 
            onChange={event => this.handleChange(event)}
            />

          <button onClick={event => this.submitSearch(event)}>Search</button>
        </form>
      </nav>
    )
  }
}

export default Nav