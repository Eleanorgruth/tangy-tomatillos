import React from "react"
import './Banner.css'

const Banner = ({ randomMovie }) => {
  const divStyle = {
    backgroundImage: 'url('+ randomMovie.backdrop_path + ')',
    // backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0,0,0,0,0.3)), url('+ randomMovie.backdrop_path + ')'
  }
  return (
    <section className="banner-container" >
      <h2>Trending in movies</h2>
      <div className="banner-subcontainer" style={divStyle}>
        <h3 className="random-movie-title">{randomMovie.title}</h3>
        <button className="random-movie-button">View details</button>
      </div>
    </section>
  )
}

export default Banner