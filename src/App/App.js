import './App.css'
import React, { Component } from 'react'
import logo from '../images/logo.png'
import Nav from '../Nav/Nav'
import MovieContainer from '../MovieContainer/MovieContainer'
import Banner from '../Banner/Banner'
import MovieDetailView from '../MovieDetailView/MovieDetailView'
import Error from '../Error/Error'
import { Route, NavLink, Switch } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      // selectedMovie: '',
      bannerMessage: '',
      error: '',
      currentView: '',
      randomMovie: {}
    }
  }

  // clearSelectedMovie = () => {
  //   this.setState({ selectedMovie: '' })
  // }

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
        console.log("DATA", data)
        this.setState({ movieData: data.movies })
        //this.getRandomMovie()
      })
      .catch(error => {
        this.setState({ error: `something went wrong ${error}` })
      })
  }

  // setSelectedMovie = (id) => {
  //   fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw Error(response.text)
  //     } else {
  //       return response.json()
  //     }
  //   })
  //   .then(data => {
  //     this.setState({ selectedMovie: data.movie })
  //     this.getRandomMovie()
  //   })
  //   .catch(error => {
  //     this.setState({ error: `something went wrong ${error}` })
  //   })
  // }

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
        <img className="logo" src={logo} alt="Logo image for Tangy Tomatillos with pink tomatillo icons" />
        {/* <Switch> */}

        {/* <Route path='/error' render={()=> <Error error={this.state.error}/>}/> */}
        <Route
          exact path='/'
          render={() =>
            <div>
              {/* <Banner setSelectedMovie={this.setSelectedMovie} randomMovie={this.state.randomMovie}/> */}
              <MovieContainer movieData={this.state.movieData} />
            </div>
          } />
        <Route
          exact path="/:id"
          render={({ match }) => {
            console.log("MATCH", match)
            console.log("this.state.movieData", this.state.movieData)
            return <MovieDetailView selectedID={match.params.id} />
          }}
        />
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
