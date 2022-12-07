import React, { Component } from "react"
import './MovieDetailView.css'
import icon from '../images/icon.png'
//import { render } from "@testing-library/react"
//{backdrop_path, poster_path, average_rating, title, tagline, overview, average_rating, budget, revenue, runtime, release_date, genres }
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
    return (
      <div>
        <p>test {this.state.selectedMovie.title}</p>
        {/* <div className="detail-backdrop-container">
        <img src={movieData.backdrop_path} className='poster-styling' />
      </div>
      <div className="detail-container">
        <div className="detail-left-container">
          <img src={movieData.poster_path} className="detail-poster"/>
        </div>
        <div className="detail-right-container">
          <h1 className="detail-title">{movieData.title}</h1>
          <h3 className="detail-tagline">{movieData.tagline}</h3>
          <p className="overview">{movieData.overview}</p>
          <ul>
            <li>Rating: {movieData.average_rating.toFixed(1)}/10 {` `}
            <img className='detail-icon-styling'
              src={icon}
              />
            </li>
            { movieData.props.budget
              ? <li>Budget: ${movieData.budget.toString().slice(movieData.budget.length, -6)}M</li>
              : <li>Budget: not available</li>
            }
            { movieData.revenue
              ? <li>Revenue: ${movieData.revenue.toString().slice(movieData.revenue.length, -6)}M</li>
              : <li>Revenue: not available</li>
            }
            <li>Runtime: {movieData.runtime} minutes</li>
            <li>Release Date: {new Date(movieData.release_date).toLocaleString('default', { month: 'long' })} {new Date(movieData.release_date).getDay()}, {new Date(movieData.release_date).getFullYear()}</li>
            <li>Genres: {movieData.genres.toString().split(',').join(', ')}</li>
          </ul>
        </div>
      </div> */}
      </div>
    )
  }
}

export default MovieDetailView