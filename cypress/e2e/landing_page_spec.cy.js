describe('Tangy Tomatillos landing page', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      method: 'GET',
      fixture: '../fixtures/movie-data.json'
    })
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401', {
      statusCode: 201,
      method: 'GET',
      fixture: '../fixtures/mulan-data.json'
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
      .type('Mulan')
      .should('have.value', 'Mulan')
  })
  it('should search movies in a live search', () => {
    cy.get('input[name="userInput"]')
      .type('M')
    cy.get('.movie-image-styling')
      .should('have.length', 2)
    cy.get(':nth-child(1) > a > .movie-image-styling')
      .should('have.attr', 'src')
      .should('include', 'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg')
    cy.get(':nth-child(2) > a > .movie-image-styling')
      .should('have.attr', 'src')
      .should('include', 'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg')
    cy.get('input[name="userInput"]')
      .type('u')
    cy.get('.movie-image-styling')
      .should('have.length', 1)
    cy.get(':nth-child(1) > a > .movie-image-styling')
      .should('have.attr', 'src')
      .should('include', 'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg')
    cy.get('input[name="userInput"]')
      .type('{backspace}{backspace}')
    cy.get('.movie-image-styling')
      .should('have.length', 5)
  })
  it('should give an error message if there are no search results', () => {
    cy.get('input[name="userInput"]')
      .type('Harry Potter')
    cy.get('.error-message')
      .contains('Sorry, no results found. Please adjust your search and try again')
    cy.get('.error-image')
      .should('have.attr', 'alt')
      .should('include', 'sad pink tomatillo image')
  })  
  it('should display a banner of a randomly selected trending movie', () => {
    cy.get('.banner-container')
      .contains('Trending in movies')
    cy.get('.random-movie-title')
    cy.get('button')
      .contains('View details')
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
  it('should display the movie detail view if a user clicks on a movie poster', () => {
    cy.get(':nth-child(2) > a > .movie-image-styling')
      .click()
    cy.get('.detail-title')
      .should('have.text', 'Mulan')
  })
  it('should display error message if data is missing', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', { 
      statusCode: 500,
      method: 'GET',
      fixture: './movie-data.json' })
    cy.visit('http://localhost:3000/')
      .contains('Sorry! Please try again later. Error: Internal Server Error')
    cy.get('.error-image')
    .should('have.attr', 'alt')
    .should('include', 'sad pink tomatillo image')
  });
})