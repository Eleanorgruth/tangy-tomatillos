import React from "react"
import './MovieContainer.css'
import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"
import { NavLink } from "react-router-dom"

const MovieContainer = ({ movieData }) => {
  const movieArray = movieData.map(movie => {
    return (
      // <NavLink to={`/${movie.id}`} >
        <MoviePosterCard
        
          // setSelectedMovie={setSelectedMovie}
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
      <h2>All movies</h2>
      <section className='container-styling'>{movieArray}</section>
    </section>
  )
}

export default MovieContainer