import React from "react"
import './Banner.css'

const Banner = ({ randomMovie }) => {
  const divStyle = {
    backgroundImage: 'url('+ randomMovie.backdrop_path + ')',
  }
  return (
    <section className="banner-container" >
      <h2>All the best movies in one place</h2>
      <div className="banner-subcontainer" style={divStyle}>
        <h3>{randomMovie.title}</h3>
        <button>View details</button>
      </div>
    </section>
  )
}

export default Banner