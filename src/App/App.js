import './App.css'
import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import MovieContainer from '../MovieContainer/MovieContainer'
import MovieDetailView from '../MovieDetailView/MovieDetailView'
import Error from '../Error/Error'
import { Route, Switch } from 'react-router-dom'
import getFetch from '../apiCalls'
import FilteredMovieContainer from '../FilteredMovieContainer/FilteredMovieContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      error: '',
      randomMovie: {},
      movieSearchResults: []
    }
  }

  componentDidMount = () => {
    getFetch('movies')
      .then(data => {
        this.setState({ movieData: data.movies })

        return data.movies
      })
      .then(data => {
        this.getRandomMovie(data)
      })
      .catch(errorCode => {
        this.setState({ error: `Sorry! Please try again later. ${errorCode}` })
      })
  }

  filterMovie = (userInput) => {
    const movieSearchResults = this.state.movieData.filter(movie => {
      return movie.title.toLowerCase().includes(userInput.toLowerCase())
    })
    if (movieSearchResults.length && userInput) {
      this.setState({ movieSearchResults: movieSearchResults })
      this.setState({ error: '' })
    } else if (!movieSearchResults.length && userInput) {
      this.setState({ error: 'Sorry, no results found. Please adjust your search and try again.' })
    } else {
      this.setState({ movieSearchResults: [] })
    }
  }

  getRandomMovie = (array) => {
    const index = Math.floor(Math.random() * array.length)
    this.setState({ randomMovie: array[Number(index)] })
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.target.click()
    }
  }

  render() {
    let displayView = this.state.movieSearchResults.length > 0
      ? <FilteredMovieContainer movieSearchResults={this.state.movieSearchResults} error={this.state.error} />
      : <MovieContainer randomMovie={this.state.randomMovie} movieData={this.state.movieData} />

    return (
      <main className='App' onKeyDown={this.handleKeyDown}>
        {this.state.error && <Error error={this.state.error} />}
        <Route
          exact path='/'
          render={() => <Nav filterMovie={this.filterMovie} error={this.state.error} />}
        />
        <Switch>
          <Route
            exact path='/'
            render={() => displayView}
          />
          <Route
            exact path='/:id'
            render={({ match }) => <MovieDetailView selectedID={match.params.id} error={this.state.error} />}
          />
        </Switch>
      </main>
    )
  }
}

export default App

