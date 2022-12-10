import React, { Component } from "react"
import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"
import logo from '../images/logo.png'
import PropTypes from 'prop-types'

const FilteredMovieContainer = ({ movieSearchResults }) => {
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
  return (
    <section>
      <img className="logo" src={logo} alt="Logo image for Tangy Tomatillos with pink tomatillo icons" />
      <h2>Search Results</h2>
      {/* {movieArray.length >= 1 ?<h2>Search Results</h2> : <h1>Sorry, no results found. Please adjust your search and try again.</h1> } */}
      <section className='container-styling'>{movieArray}</section>
    </section>
  )
}

export default FilteredMovieContainer

FilteredMovieContainer.propTypes = {
  movieSearchResults: PropTypes.array.isRequired
}