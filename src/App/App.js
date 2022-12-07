import './App.css'
import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import MovieContainer from '../MovieContainer/MovieContainer'
import Banner from '../Banner/Banner'
import MovieDetailView from '../MovieDetailView/MovieDetailView'
import Error from '../Error/Error'
import { Route } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      bannerMessage: '',
      error: '',
      currentView: '',
      randomMovie: ''
    }
  }

  componentDidMount = () => {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
      .then(response => {
        if (!response.ok) {
          throw Error(response.text)
        } else {
          return response.json()
        }
      })
      .then(data => {
        this.setState({ movieData: data.movies })
        this.getRandomMovie()
      })
      .catch(error => {
        this.setState({ error: `something went wrong ${error}` })
      })
  }

  filterMovie = (userInput) => {
    const movieSearchResults = this.state.movieData.filter(movie => {
      return movie.includes(userInput)
    })
    if (!movieSearchResults) {
      this.setState({ bannerMessage: 'Sorry no results found. Please try again.' })
    } else {
      this.setState({ movieData: movieSearchResults })
    }
  }

  getRandomMovie = () => {
    const index = Math.floor(Math.random() * this.state.movieData.length)
    this.setState({ randomMovie: this.state.movieData[Number(index)] })
  }

  handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      event.target.click()
    }
  }

  render() {
    return (
      <main className='App' onKeyDown={this.handleKeyDown}>
        <Nav filterMovie={this.filterMovie} />
       
        {/* <Switch> */}

        {/* <Route path='/error' render={()=> <Error error={this.state.error}/>}/> */}
        {/* <Route path='/' render={} */}
        <Route exact path='/' render={() => <MovieContainer randomMovie={this.state.randomMovie} movieData={this.state.movieData} /> } />
        {/* <Route exact path='/' element={this.state.randomMovie &&
           <Banner randomMovie={this.state.randomMovie}/>} /> */}
    
        
         
        <Route exact path="/:id" render={({ match }) => <MovieDetailView selectedID={match.params.id} />}/>
        {/* </Switch> */}

        {/* {this.state.error && } */}
        {/* {this.state.randomMovie && <Banner setSelectedMovie={this.setSelectedMovie} randomMovie={this.state.randomMovie}/>} */}

      </main>
    )
    // return (
    //   <main className='App' onKeyDown={this.handleKeyDown}>
    //     <Nav filterMovie={this.filterMovie} clearSelectedMovie={this.clearSelectedMovie} />
    //     <MovieDetailView selectedMovie={this.state.selectedMovie}/>
    //   </main>
    // )

  }
}

export default App
