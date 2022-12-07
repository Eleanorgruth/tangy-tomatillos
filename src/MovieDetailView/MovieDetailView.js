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
        console.log("DATA", data.movie)
      })
      .catch(error => {
        this.setState({ error: `something went wrong ${error}` })
      })
    }
  render() {
    return (
      <div>
      <div className="detail-backdrop-container">
        <img src={this.state.selectedMovie.backdrop_path} className='poster-styling' />
      </div>
      <div className="detail-container">
        <div className="detail-left-container">
          <img src={this.state.selectedMovie.poster_path} className="detail-poster"/>
        </div>
        <div className="detail-right-container">
          <h1 className="detail-title">{this.state.selectedMovie.title}</h1>
          <h3 className="detail-tagline">{this.state.selectedMovie.tagline}</h3>
          <p className="overview">{this.state.selectedMovie.overview}</p>
          <ul>
            {/* <li>Rating: {this.state.selectedMovie.average_rating.toFixed(1)}/10 {` `} */}
            <li>Rating: {this.state.selectedMovie.average_rating}/10 {` `}
            <img className='detail-icon-styling'
              src={icon}
              />
            </li>
            { this.state.selectedMovie.budget
              ? <li>Budget: ${this.state.selectedMovie.budget.toString().slice(this.state.selectedMovie.budget.length, -6)}M</li>
              : <li>Budget: not available</li>
            }
            { this.state.selectedMovie.revenue
              ? <li>Revenue: ${this.state.selectedMovie.revenue.toString().slice(this.state.selectedMovie.revenue.length, -6)}M</li>
              : <li>Revenue: not available</li>
            }
            <li>Runtime: {this.state.selectedMovie.runtime} minutes</li>
            <li>Release Date: {new Date(this.state.selectedMovie.release_date).toLocaleString('default', { month: 'long' })} {new Date(this.state.selectedMovie.release_date).getDay()}, {new Date(this.state.selectedMovie.release_date).getFullYear()}</li>
            <li>Genres: {this.state.selectedMovie.genres}</li>
            {/* <li>Genres: {this.state.selectedMovie.genres.toString().split(',').join(', ')}</li> */}
          </ul>
        </div>
      </div>
      </div>
    )
  }
}

export default MovieDetailView