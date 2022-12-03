import React from "react"
import './MovieDetailView.css'
import icon from '../images/icon.png'

const MovieDetailView = ({ selectedMovie }) => {
  return (
    <div>
      <div className="detail-backdrop-container">
        <img src={selectedMovie.backdrop_path} className='poster-styling' />
      </div>
      <div className="detail-container">
        <div className="detail-left-container">
          <img src={selectedMovie.poster_path} className="detail-poster"/>
        </div>
        <div className="detail-right-container">
          <h1 className="detail-title">{selectedMovie.title}</h1>
          <h3 className="detail-tagline">{selectedMovie.tagline}</h3>
          <p className="overview">{selectedMovie.overview}</p>
          <ul>
            <li>Rating: {selectedMovie.average_rating.toFixed(1)}/10 {` `}
            <img className='detail-icon-styling'
              src={icon}
              />
            </li>
            { selectedMovie.budget
              ? <li>Budget: ${selectedMovie.budget.toString().slice(selectedMovie.budget.length, -6)}M</li>
              : <li>Budget: not available</li>
            }
            { selectedMovie.revenue
              ? <li>Revenue: ${selectedMovie.revenue.toString().slice(selectedMovie.revenue.length, -6)}M</li>
              : <li>Revenue: not available</li>
            }
            <li>Runtime: {selectedMovie.runtime} minutes</li>
            <li>Release Date: {new Date(selectedMovie.release_date).toLocaleString('default', { month: 'long' })} {new Date(selectedMovie.release_date).getDay()}, {new Date(selectedMovie.release_date).getFullYear()}</li>
            <li>Genres: {selectedMovie.genres.toString().split(',').join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailView