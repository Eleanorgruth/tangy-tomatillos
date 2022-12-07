describe('Landing page experience', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: 'GET',
      fixture: '../fixtures/movie-data.json'
    })
    cy.visit('http://localhost:3000')
  })

  it('should get a landing page when visiting local 3000', () => {
    cy.contains('Trending in movies')
    cy.contains('All movies')
    // cy.get('form')
    // cy.contains('Please Sign In')
  })

})