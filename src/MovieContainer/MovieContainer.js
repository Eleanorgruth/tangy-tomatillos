import React from "react"
import './MovieContainer.css'
import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"

const MovieContainer = ({ movieData }) => {
  // console.log(movieData)
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
      <h2>All movies</h2>
      {movieArray}
    </section>
  )
}

export default MovieContainer