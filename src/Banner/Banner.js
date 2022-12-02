import React from "react"
import './Banner.css'

const Banner = ({ randomMovie }) => {
  console.log("LOOK HERE", typeof randomMovie)
  console.log("RANDOMMOVIOE", randomMovie)
  const divStyle = {
    backgroundImage: 'url('+ randomMovie.backdrop_path + ')',
    height: '62vh',
    backgroundSize: 'cover',
    margin: '10%'
  }
  // console.log("Banner, randomMovie", randomMovie)
  return (
    <section className="banner-container" style={divStyle}>
      <h2>All the best movies in one place</h2>
      <div className="banner-subcontainer">
        <h3>{randomMovie.title}</h3>
        <button>View details</button>
      </div>
    </section>
  )
}

export default Banner