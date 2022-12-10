import React from "react"
import { Link } from "react-router-dom"
import './Banner.css'
import PropTypes from 'prop-types'

const Banner = ({ randomMovie }) => {
  const divStyle = {
    backgroundImage: 'url(' + randomMovie.backdrop_path + ')',
  }
  return (
    <section className="banner-container">
      <h2>Trending in movies</h2>
      <div className="banner-subcontainer" style={divStyle}>
        <div className="title-button-container">
          <h3 className="random-movie-title">{randomMovie.title}</h3>
          <Link to={`/${randomMovie.id}`}>
            <button className="random-movie-button">View details</button>
          </Link>
          </div>
        </div>
    </section>
  )
}

Banner.propTypes = {
  randomMovie: PropTypes.object.isRequired,
}

export default Banner