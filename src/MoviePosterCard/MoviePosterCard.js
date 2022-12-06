import React from 'react'
import './MoviePosterCard.css'
import icon from '../images/icon.png'
import { Link } from 'react-router-dom'

const MoviePosterCard = ({ title, releaseDate, posterPath, averageRating, id }) => {
  return (
    <Link to={`/${id}`}>
      <section className='movie-card-styling' key={id}>
        <img className='movie-image-styling' src={posterPath} alt={title} />
        <p>Rating {averageRating.toFixed(1)}/10
          <img
            className='icon-styling'
            src={icon}
          />
        </p>
        <p className='released-styling'>Released {releaseDate.slice(0, 4)}</p>
      </section>
    </Link>

  )
}

export default MoviePosterCard

