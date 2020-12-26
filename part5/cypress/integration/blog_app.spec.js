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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'milka', password: 'salainen' })
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www/cypress.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Kurukku',
          author: 'Faustina Bama',
          url: 'https://www.amazon.com/Karukku-Bama-Faustina/dp/0199450412',
          likes: 59,
        })
        cy.createBlog({
          title: 'A Time to Be Happy',
          author: 'Nayantara Sahgal',
          url: 'https://www.questia.com/library/7232327/a-time-to-be-happy',
          likes: 100
        })
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7
        })
      })

      it('blogs are sorted by likes', function () {
        cy.get('[data-cy="like"]').then(($blog) => {
          expect($blog[0]).to.contain.text(Number(100))
          expect($blog[1]).to.contain.text(Number(59))
          expect($blog[2]).to.contain.text(Number(7))

        })

        it('it can be liked', function () {
          cy.contains('A Time to Be Happy').parent().find('button')
            .contains('view').click()
          cy.contains('A Time to Be Happy').parent().find('button')
            .contains('like')
            .click()
            .click()


        })
        it('it can be deleted', function () {
          cy.contains('React patterns').parent().find('button')
            .contains('view').click()
          cy.contains('React patterns').parent().find('button')
            .contains('delete').click()

        })


      })

    })
  })
})