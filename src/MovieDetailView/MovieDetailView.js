import React, { Component } from "react"
import './MovieDetailView.css'
import icon from '../images/icon.png'
import getFetch from "../apiCalls"
import Error from "../Error/Error"
import PropTypes from 'prop-types'
import NavDetailedView from '../NavDetailedView/NavDetailedView'
import ReactPlayer from 'react-player'

class MovieDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.selectedID,
      selectedMovie: {},
      error: props.error,
      randomVideo: {},
      videoMessage: ""
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
    getFetch(`movies/${this.state.id}/videos`)
    .then(data => {
      this.setState({ randomVideo: data.videos[0].key })
      this.setState({videoMessage: "Watch trailer"})
    })
    .catch(errorCode => {
      this.setState({videoMessage: "No trailer found"})
    })
    getFetch(`movies/${this.state.id}`)
      .then(data => {
        this.setState({ selectedMovie: data.movie })
      })
      .catch(errorCode => {
        this.setState({ error: `Sorry! Please try again later. ${errorCode}` })
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

    let youtubeLink = `https://www.youtube.com/embed/${this.state.randomVideo}`
    const genresData = [genres].toString().split(',').join(', ')
    const month = new Date(release_date).toLocaleString('default', { month: 'long' })
    const day = new Date(release_date).getDay()
    const year = new Date(release_date).getFullYear()
    const ratingData = Number(average_rating).toFixed(0) + '/10' + ` `
    const budgetMath = budget >= 1000000
      ? <li>Budget: ${(budget / 1000000).toFixed(0)}M</li>
      : (budget < 1000000 && budget > 1000 && budget !== 0 
        ? <li>Budget: ${(budget / 1000).toFixed(0)}K</li>
        : <li>Budget: not available</li>)
    const revenueMath = revenue >= 1000000
      ? <li>Revenue: ${(revenue / 1000000).toFixed(0)}M</li>
      : (revenue < 1000000 && revenue > 1000 && revenue !== 0
        ? <li>Budget: ${(revenue / 1000).toFixed(0)}K</li>
        : <li>Revenue: not available</li>)

    if (!this.state.error) {
      return (
        <div>
          <NavDetailedView />
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
                {budgetMath}
                {revenueMath}
                <li>Runtime: {runtime} minutes</li>
                <li>Release Date: {month} {day}, {year}</li>
                <li>Genres: {genresData}</li>
              </ul>
            </div>
          </div>
            
          <div className='video-container'>
            <h2>{this.state.videoMessage}</h2> 
            <ReactPlayer url={youtubeLink} 
            title="YouTube Video"
            width="100%"
            height="100%"
            controls="true"
            />
          </div> 
            
        </div>
      )
    } else {
      return (
        <div>
          <NavDetailedView />
          <Error error={this.state.error} />
        </div>
      )
    }
  }
}

MovieDetailView.propTypes = {
  selectedID: PropTypes.string,
  error: PropTypes.string,
}

export default MovieDetailView
