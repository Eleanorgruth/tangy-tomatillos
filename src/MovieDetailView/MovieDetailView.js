import React from "react"
import './MovieDetailView.css'

const MovieDetailView = ({ selectedMovie }) => {
  console.log(selectedMovie)
  return (
    <div>
      <div>
      <img src={selectedMovie.backdrop_path} className='poster-styling'/>
      </div>
      <h2>{selectedMovie.title}</h2>
      <h3>{selectedMovie.tagline}</h3>
      <p>{selectedMovie.overview}</p>
      <ul>
        <li>Rating {selectedMovie.average_rating.toFixed(1)}/10</li>
        <li>${selectedMovie.budget}</li>
        <li>${selectedMovie.revenue}</li>
        <li>Runtime: {selectedMovie.runtime}</li>
        <li>Release Date: {selectedMovie.release_date}</li>
        <li>Tags: {selectedMovie.genres.toString().split(',').join(', ')}</li>
      </ul>

    </div>
  )
}

export default MovieDetailView