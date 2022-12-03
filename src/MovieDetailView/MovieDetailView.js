import React from "react"
import './MovieDetailView.css'

class MovieDetailView extends Component {
  constructor({ movieData }) {
    super()
    this.state = {
      id: movieData

    }
  }
}

componentDidMount = () => {
  fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}`)
    .then(reponse => {
      if (!response.ok) {
        throw Error(response.text)
      } else {
        return response.json()
      }
    })
    .then(data => {
      console.log("individual movie", data)
      // this.setState({ movieData: data.movies })
      // this.getRandomMovie()
    })
    .catch(error => {
      console.log("ERROR", error)
      // this.setState({ error: `something went wrong ${error}` })
    })

}


export default MovieDetailView