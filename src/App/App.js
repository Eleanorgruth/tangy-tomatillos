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
    if (movieSearchResults.length && userInput) {
      this.setState({ movieSearchResults: movieSearchResults })
      this.setState({ error: '' })
    } else if (!movieSearchResults.length && userInput) {
      this.setState({ error: 'Sorry no results found. Please try again.' })
    } else {
      this.setState({ movieSearchResults: [] })
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
    let test = this.state.movieSearchResults.length > 0
      ? <FilteredMovieContainer movieSearchResults={this.state.movieSearchResults}/>
      : <MovieContainer randomMovie={this.state.randomMovie} movieData={this.state.movieData} />
    return (
      <main className='App' onKeyDown={this.handleKeyDown}>
        <Nav filterMovie={this.filterMovie} />
        {this.state.error && <Error error={this.state.error} />}
        <Switch>
          <Route
            exact path='/'
            render={() => test}
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
        </Switch>
      </main>
    )
  }
}

export default App
