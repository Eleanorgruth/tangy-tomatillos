import React, { Component } from "react"
import './MovieDetailView.css'
import icon from '../images/icon.png'
import getFetch from "../apiCalls"
import Error from "../Error/Error"
import PropTypes from 'prop-types'

class MovieDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.selectedID,
      selectedMovie: props.selectedID,
      error: props.error,
    }
  }

  componentDidMount = () => {
    getFetch(`movies/${this.state.id}`)
      .then(data => {
        this.setState({ selectedMovie: data.movie })
      })
      .catch(error => {
        this.setState({ error: `Sorry! Something went wrong. Please try again later.` })
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

    const genresData = [genres].toString().split(',').join(', ')
    const month = new Date(release_date).toLocaleString('default', { month: 'long' })
    const day = new Date(release_date).getDay()
    const year = new Date(release_date).getFullYear()
    const ratingData = Number(average_rating).toFixed(0) + '/10' + ` `
    const budgetDataMillions = Math.trunc(budget / 1000000)
    const budgetDataThousands = Math.trunc(budget / 1000)
    const revenueDataMillions = Math.trunc(revenue / 1000000)
    const revenueDataThousands = Math.trunc(revenue / 1000)

    return (
      <div>
        {this.state.error && <Error error={this.state.error} />}
        <div className="detail-backdrop-container">
          <img src={backdrop_path} className='poster-styling' />
        </div>
        <div className="detail-container">
          <div className="detail-left-container">
            <img src={poster_path} className="detail-poster" />
          </div>
          <div className="detail-right-container">
            <h1 className="detail-title">{title}</h1>
            <h3 className="detail-tagline">{tagline}</h3>
            <p className="overview">{overview}</p>
            <ul>
              <li>Rating: {ratingData}
                <img className='detail-icon-styling'
                  src={icon}
                />
              </li>
              {budget >= 1000000
                ? <li>Budget: ${budgetDataMillions}M</li>
                : (budget < 1000000 && budget !== 0
                  ? <li>Budget: ${budgetDataThousands}K</li>
                  : <li>Budget: not available</li>)
              }
              {revenue >= 1000000
                ? <li>Revenue: ${revenueDataMillions}M</li>
                : (revenue < 1000000 && revenue !== 0
                  ? <li>Budget: ${revenueDataThousands}K</li>
                  : <li>Revenue: not available</li>)
              }
              <li>Runtime: {runtime} minutes</li>
              <li>Release Date: {month} {day}, {year}</li>
              <li>Genres: {genresData}</li>
            </ul>
          </div>
        </div>
      </div>
    )

  }
}

MovieDetailView.propTypes = {
  selectedID: PropTypes.string,
  error: PropTypes.string,
}

export default MovieDetailView
