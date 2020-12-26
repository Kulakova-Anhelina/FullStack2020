describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Saimon Berry',
      username: 'aimon',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')



  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('#username').type('saimon')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.contains('Saimon Berry logged-in')
  })
})