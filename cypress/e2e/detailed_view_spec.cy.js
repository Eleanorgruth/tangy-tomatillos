describe('Detailed page experience', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401', {
      method: 'GET',
      fixture: '../fixtures/mulan-data.json'
    })
    cy.visit('http://localhost:3000/337401')
  })

  it('should have a clickable icon to return to the home page', () => {
    cy.get('.icon')
      .click()
    cy.contains('Trending in movies')
      .url()
      .should('include', '/')
  })

  it('should display movie details for a selected movie', () => {
    cy.get('ul').should('have.length.of.at.most', 0)
    cy.get('.detail-right-container')
    cy.contains('Mulan')
    cy.contains('When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.')
    cy.contains('Rating: 5/10')
    cy.get('.detail-icon-styling').should('exist')
    cy.contains('Budget: $200M')
    cy.contains('Revenue: $57M')
    cy.contains('Runtime: 115 minutes')
    cy.contains('Release Date: September 4, 2020')
    cy.contains('Genres: Action, Adventure, Drama, Fantasy')
  })

  it('should display movie poster for selected movie', () => {
    cy.get('.detail-poster')
      .should('have.attr', 'src')
      .should('include', 'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg')
  })

  it('should display movie backdrop', () => {
    cy.get('.poster-styling')
      .should('have.attr', 'src')
      .should('include', 'https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg')
  })

  it('should display tagline and a message if revenue or budget info is not available', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/400160', { fixture: './spongebob-data.json' })
    cy.visit('http://localhost:3000/400160')
      .url()
      .should('include', '400160')
    cy.get('.detail-right-container')
    cy.contains('Budget: not available')
    cy.contains('Runtime: 91 minutes')
    cy.contains('A Huge Journey to Find a Tiny Friend')
  })

  it('should display only one movie at a time', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/400160', { fixture: './spongebob-data.json' })
    cy.visit('http://localhost:3000/400160')
    cy.get('.detail-right-container')
      .should('have.length', 1)
  })

  it('should display a movie trailer if available', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/829799/videos', { fixture: './movie-trailer.json' })
    cy.visit('http://localhost:3000/829799')
    cy.get('h2')
      .contains('Watch trailer')
    cy.get('iframe')
      .should('exist')
  })

  it('should display a message if no trailer is found', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/829799/videos', { fixture: './movie-trailer-2.json' })
    cy.visit('http://localhost:3000/820067')
    cy.get('h2')
      .contains('No trailer found')
  })


  it('should display error message if server returns 500 error', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/400160', { statusCode: 500, fixture: './spongebob-data.json' })
      .visit('http://localhost:3000/400160')
    cy.contains('Sorry! Please try again later. Error:')
    cy.get('.error-image')
      .should('exist')
  })

  it('should display error message if server returns 400 error', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/400160', { statusCode: 404, fixture: './spongebob-data.json' })
      .visit('http://localhost:3000/400160')
    cy.contains('Sorry! Please try again later. Error: Not Found')
    cy.get('.error-image')
      .should('exist')
  })

  it('should display error message if URL does not exist', () => {
    cy.visit('http://localhost:3000/test')
    cy.contains('Sorry! Please try again later. Error: Internal Server Error')
    cy.get('.error-image')
      .should('exist')
  })
})
