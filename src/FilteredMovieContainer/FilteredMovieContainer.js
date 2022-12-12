import React from "react"
import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"
import logo from "../images/logo.png"
import PropTypes from "prop-types"
import "./FilteredMovieContainer.css"

const FilteredMovieContainer = ({ movieSearchResults, error }) => {
  const movieArray = movieSearchResults.map(movie => {
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
  if (!error) {
  return (
    <section>
      <img className="logo" src={logo} alt="Logo image for Tangy Tomatillos with pink tomatillo icons" />
      <h2>Search Results</h2>
      <section className="container-styling">{movieArray}</section>
    </section>
  )
}
}

export default FilteredMovieContainer

FilteredMovieContainer.propTypes = {
  movieSearchResults: PropTypes.array.isRequired,
  error: PropTypes.string
}