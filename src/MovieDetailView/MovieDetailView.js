import React, { Component } from "react"
import './MovieDetailView.css'
import icon from '../images/icon.png'
//import { render } from "@testing-library/react"

class MovieDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.selectedID,
      selectedMovie: '',
    }
  }

  componentDidMount = () => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.text)
        } else {
          return response.json()
        }
      })
      .then(data => {
        this.setState({ selectedMovie: data.movie })
      })
      .catch(error => {
        this.setState({ error: `something went wrong ${error}` })
      })
    }

    render() {
      const {
        backdrop_path,
        poster_path,
        title,
        tagline,
        overview,
        average_rating,
        budget,
        revenue,
        runtime,
        release_date,
        genres
      } = this.state.selectedMovie
      return (
        <div>
        <div className="detail-backdrop-container">
          <img src={backdrop_path} className='poster-styling' />
        </div>
        <div className="detail-container">
          <div className="detail-left-container">
            <img src={poster_path} className="detail-poster"/>
          </div>
          <div className="detail-right-container">
            <h1 className="detail-title">{title}</h1>
            <h3 className="detail-tagline">{tagline}</h3>
            <p className="overview">{overview}</p>
            <ul>
              <li>Rating: {Number(average_rating).toFixed(1)}/10 {` `}
              <img className='detail-icon-styling'
                src={icon}
                />
              </li>
              { budget
                ? <li>Budget: ${budget.toString().slice(budget.length, -6)}M</li>
                : <li>Budget: not available</li>
              }
              { revenue
                ? <li>Revenue: ${revenue.toString().slice(revenue.length, -6)}M</li>
                : <li>Revenue: not available</li>
              }
              <li>Runtime: {runtime} minutes</li>
              <li>Release Date: {new Date(release_date).toLocaleString('default', { month: 'long' })} {new Date(release_date).getDay()}, {new Date(release_date).getFullYear()}</li>
              <li>Genres: {[genres].toString().split(',').join(', ')}</li>
            </ul>
          </div>
        </div>
        </div>
      )
    }
  }
  
export default MovieDetailView