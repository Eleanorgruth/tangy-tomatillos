import './App.css';
import React, { Component } from 'react'
import logo from '../images/logo.png'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      selectedMovie: {},
      bannerMessage: '',
      error: '',
      currentView: '',
      randomMovie: {}
    }
  }

  componentDidMount = () => {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
    .then(response => {
      if (!response.ok) {
        throw Error(response.text)
      } else {
        return response.json()
      }
    })
    .then(data => {
      this.setState({ movieData: data})
    })
    .catch(error => {
      this.setState({ error: `something went wrong ${error}` })
    })
  }

  filterMovie = (userInput) => {
    const movieSearchResults = this.state.movieData.filter(movie => {
      return movie.includes(userInput)
    })
    if (!movieSearchResults) {
      this.setState({ bannerMessage: 'Sorry no results found. Please try again.' })
    } else {
      this.setState({ movieData: movieSearchResults })
    }
  }

  render() {
    return(
      <main>
        {/* {this.state.error && <Error error={this.state.error}/>} */}
        {/* <Nav /> */}
        <img src={logo}/>
        {/* <Banner />
        <MovieContainer /> */}
      </main>
    )
  }

}

export default App;
