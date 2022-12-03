import './App.css'
import React, { Component } from 'react'
import logo from '../images/logo.png'
import Nav from '../Nav/Nav'
import MovieContainer from '../MovieContainer/MovieContainer'
import Banner from '../Banner/Banner'
import MovieDetailView from '../MovieDetailView/MovieDetailView'
import Error from '../Error/Error'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      selectedMovie: '',
      bannerMessage: '',
      error: '',
      currentView: '',
      randomMovie: {}
    }
  }

  clearSelectedMovie = () => {
    this.setState({ selectedMovie: '' })
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
      this.setState({ movieData: data.movies })
      this.getRandomMovie()
    })
    .catch(error => {
      this.setState({ error: `something went wrong ${error}` })
    })
  }
  
  setSelectedMovie = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.text)
      } else {
        return response.json()
      }
    })
    .then(data => {
      this.setState({ selectedMovie: data.movie })
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

  handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      event.target.click()
    }
  }

  render() {
    if (this.state.selectedMovie) {
      return (
        <main className='App' onKeyDown={this.handleKeyDown}>
          <Nav filterMovie={this.filterMovie} clearSelectedMovie={this.clearSelectedMovie} />
          <MovieDetailView selectedMovie={this.state.selectedMovie}/>
        </main>
      )
    } else {
      return (
        <main className='App' onKeyDown={this.handleKeyDown}>
          <Nav filterMovie={this.filterMovie} />
          <img className="logo" src={logo} alt="Logo image for Tangy Tomatillos with pink tomatillo icons"/>
          {this.state.error && <Error error={this.state.error}/>}
          {this.state.randomMovie && <Banner setSelectedMovie={this.setSelectedMovie} randomMovie={this.state.randomMovie}/>}
          <MovieContainer setSelectedMovie={this.setSelectedMovie} movieData={this.state.movieData} />
        </main>
      )
    }
  }
}

export default App
