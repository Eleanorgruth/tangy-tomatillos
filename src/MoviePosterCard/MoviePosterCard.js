import React from 'react'
import './MoviePosterCard.css'
import icon from '../images/icon.png'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const MoviePosterCard = ({ title, releaseDate, posterPath, averageRating, id }) => {
  return (
    <section className='movie-card-styling' key={id}>
        <Link to={`/${id}`}>
          <img className='movie-image-styling' src={posterPath} alt={title} />
        </Link>
        <p>Rating {averageRating.toFixed(0)}/10
          <img
            className='icon-styling'
            src={icon} alt="pink tomatillo icon"
          />
        </p>
        <p className='released-styling'>Released {releaseDate.slice(0, 4)}</p>
      </section>
  )
}

MoviePosterCard.propTypes = {
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  postPath: PropTypes.string,
  averageRating: PropTypes.number,
  id: PropTypes.number.isRequired,
};

export default MoviePosterCard

