import './App.css';
import React, { Component } from 'react'


class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: [],
      selectedMovie: {},
      error: '',
      currentView: '',
      randomMovie: {}
    }
  }

  componentDidMount = () => {
    fetch()
  }
}

export default App;
