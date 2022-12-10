import './App.css'
import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import MovieContainer from '../MovieContainer/MovieContainer'
import MovieDetailView from '../MovieDetailView/MovieDetailView'
import Error from '../Error/Error'
import { Route } from 'react-router-dom'
import getFetch from '../apiCalls'
//import FilteredMovieContainer from '../FilteredMovieContainer/FilteredMovieContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      bannerMessage: '',
      error: '',
      currentView: '',
      randomMovie: {},
      movieSearchResults: []
    }
  }

  componentDidMount = () => {
    getFetch("movies")
      .then(data => {
        this.setState({ movieData: data.movies })
        this.getRandomMovie()
      })
      .catch(error => {
        this.setState({ error: `Sorry something went wrong. Please try again later.` })
      })
  }


  filterMovie = (userInput) => {
    const movieSearchResults = this.state.movieData.filter(movie => {
      return movie.title.toLowerCase().includes(userInput.toLowerCase())
    })
    if (!movieSearchResults.lenth && userInput) {
      this.setState({ bannerMessage: 'Sorry no results found. Please try again.' })
    } else {
      this.setState({ bannerMessage: '' })
      this.setState({ movieSearchResults: movieSearchResults })
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
    return (
      <main className='App' onKeyDown={this.handleKeyDown}>
        <Nav filterMovie={this.filterMovie} />
        {this.state.error && <Error error={this.state.error} />}
        {/* <Switch> */}
          <Route
            exact path='/'
            render={() => <MovieContainer randomMovie={this.state.randomMovie} movieData={this.state.movieSearchResults.length > 0 ? this.state.movieSearchResults : this.state.movieData} />}
          />
          <Route
            exact path="/:id"
            render={({ match }) => <MovieDetailView selectedID={match.params.id} />}
          />
          {/* <Route
            exact path="/search/:search"
            render={({ match }) => {
              return <FilteredMovieContainer userInput={match.params.search} movieData={this.state.movieData} />
            }}
          /> */}
        {/* </Switch> */}
      </main>
    )
  }
}

export default App
