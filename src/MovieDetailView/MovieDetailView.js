import React from "react"
import './MovieDetailView.css'

const MovieDetailView = ({ selectedMovie }) => {
  console.log(selectedMovie)
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
          <li>Rating: {selectedMovie.average_rating.toFixed(1)}/10</li>
          <li>Budget: ${selectedMovie.budget}</li>
          <li>Revenue: ${selectedMovie.revenue}</li>
          <li>Runtime: {selectedMovie.runtime}</li>
          <li>Release Date: {selectedMovie.release_date}</li>
          <li>Tags: {selectedMovie.genres.toString().split(',').join(', ')}</li>
        </ul>
      </div>
      </div>

    </div>
  )
}

export default MovieDetailView