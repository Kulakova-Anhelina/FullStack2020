Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, url, likes, author }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, url, likes, author },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})