import React from "react"
import './MovieContainer.css'
import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"
import Banner from "../Banner/Banner"
import logo from '../images/logo.png'
import PropTypes from 'prop-types';

const MovieContainer = ({ movieData, randomMovie }) => {
  const movieArray = movieData.map(movie => {
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
      {randomMovie && <Banner randomMovie={randomMovie} />}
      <h2>All movies</h2>
      <section className='container-styling'>{movieArray}</section>
    </section>
  )
}

MovieContainer.propTypes = {
  randomMovie: PropTypes.object,
  movieData: PropTypes.array.isRequired,
};

export default MovieContainer