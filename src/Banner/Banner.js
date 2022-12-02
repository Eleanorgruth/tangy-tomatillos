import React from "react"
import './Banner.css'

const Banner = ({ randomMovie }) => {
  console.log("LOOK HERE", randomMovie[0].title)
  // console.log("Banner, randomMovie", randomMovie)
  return (
    <section className="banner-container">
      <h2>All the best movies in one place</h2>
      <div className="banner-subcontainer">
        <h3></h3>
        <button>View details</button>
      </div>
    </section>
  )
}

export default Banner