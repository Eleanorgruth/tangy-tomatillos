import React from 'react'
// import './MoviePosterCard.css'

const MoviePosterCard = ({title, releaseDate, posterPath, averageRating, id, backdropPath}) => {
  return (
    <section>
      <img src={posterPath} alt={title}/>
      <p>Rating: {averageRating.toFixed(1)}/10</p>
      <p>Release Date: {releaseDate}</p>
    </section>
  )
}

export default MoviePosterCard