describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset/')
    const user = {
      name: 'Milla Boon',
      username: 'milka',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
      .its('body')
    cy.visit('http://localhost:3000')


  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('milka')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Milla Boon logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('bugai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Milla Boon logged-in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'milka', password: 'salainen' })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www/cypress.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })
  })

})

