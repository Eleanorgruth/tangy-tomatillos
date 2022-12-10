describe('Tangy Tomatillos landing page', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      method: 'GET',
      fixture: '../fixtures/movie-data.json'
    })
    cy.visit('http://localhost:3000')
  })
  it('should display the title of the site', () => {
    cy.get('.logo')
      .should('have.attr', 'alt', 'Logo image for Tangy Tomatillos with pink tomatillo icons')
  })
  it('should display a navigation bar', () => {
    cy.get('.icon')
      .should('have.attr', 'alt', 'pink tomatillo icon')
    cy.get('input[name="userInput"]')
      .type("Mulan")
      .should('have.value', "Mulan")
  })
  it('should display a banner of a randomly selected trending movie', () => {
    cy.get('.banner-container')
      .contains('Trending in movies')
    cy.get('.random-movie-title')
    cy.get('button')
      .contains("View details")
  })
  it('should display all movies on home page ', () => {
    cy.get('.movie-image-styling')
      .should('have.length', 5)
    cy.get('.container-styling > :nth-child(5)')
      .should('have.text', 'Rating 7/10Released 2020')
    cy.get(':nth-child(5) > a > .movie-image-styling')
      .should('have.attr', 'src').should('include', 'https://image.tmdb.org/t/p/original//sy6DvAu72kjoseZEjocnm2ZZ09i.jpg')
    cy.get('.icon-styling')
      .should('have.attr', 'alt', 'pink tomatillo icon')
  })
  it('should display error message if data is missing', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', { 
      statusCode: 500,
      method: 'GET',
      fixture: './movie-data.json' })
    cy.visit('http://localhost:3000/')
      .contains('Sorry! Please try again later. Error: Internal Server Error')
  });

})