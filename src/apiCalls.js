const getFetch = (address) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${address}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
     } else {
        return response.json()
    }
  })
  // .catch(error => console.log("TEST",error))
}

export default getFetch