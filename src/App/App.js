import './App.css'
import React, { Component } from 'react'
import logo from '../images/logo.png'
import Nav from '../Nav/Nav'
import MovieContainer from '../MovieContainer/MovieContainer'
import Banner from '../Banner/Banner'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      selectedMovie: {},
      bannerMessage: '',
      error: '',
      currentView: '',
      randomMovie: ''
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
        // console.log("DATA", data)
        this.setState({ movieData: data.movies })
        this.getRandomMovie()
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

  getRandomMovie = () => {
    const index = Math.floor(Math.random() * this.state.movieData.length)
    this.setState({ randomMovie: this.state.movieData[Number(index)] })
  }

  render() {
    return (
      <main className='App'>
        {/* {this.state.error && <Error error={this.state.error}/>} */}
        <Nav filterMovie={this.filterMovie} />
        <img src={logo} />
        {this.state.randomMovie && <Banner randomMovie={this.state.randomMovie}/>}
        {/* <Banner randomMovie={this.state.randomMovie} /> */}
        <MovieContainer movieData={this.state.movieData} />
      </main>
    )
  }

}

export default App
