import React, { Component } from "react"
import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"
import logo from '../images/logo.png'

class FilteredMovieContainer extends Component {
  constructor() {
    super()
    this.state = {
      movieSearchResults: [],
      bannerMessage: ''
    }
  }
  componentDidMount = () => {
    const movieSearchResults = this.props.movieData.filter(movie => {
      return movie.title.toLowerCase().includes(this.props.userInput.toLowerCase())
    })
    this.setState({movieSearchResults: movieSearchResults})
  }
  render() {
    if(this.state.movieSearchResults) {
      var movieArray = this.state.movieSearchResults.map(movie => {
        return (
          <MoviePosterCard
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            averageRating={movie.average_rating}
            id={movie.id}
            backdropPath={movie.backdrop_path}
            key={movie.id}
          />
        )
      })
    }
    else {
      var message = "No Results"
    }
    return (
      <section>
        <img className="logo" src={logo} alt="Logo image for Tangy Tomatillos with pink tomatillo icons" />
        <h2>Search Results</h2>
        <h2>{message}</h2>
        <section className='container-styling'>{movieArray}</section>
      </section>
    )
  }
}



export default FilteredMovieContainer