describe('Blog app', function () {
  beforeEach(function () {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // const user = {
    //   name: 'Super User',
    //   username: 'rootuser',
    //   password: 'password',
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('Login')
  })

  describe('Login', function () {
    it('correct credentials success', function () {
      cy.contains('log in').click()
      cy.get('#username').type('rootuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Super User logged in')

      cy.get('.notification')
        .should('contain', 'Welcome Super User')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('wrong credentials fail', function () {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('After logging in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'rootuser',
        password: 'password',
      }).then((response) => {
        localStorage.setItem('userBlogData', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Somthing Cool')
      cy.get('#author').type('Someone Cool')
      cy.get('#url').type('http://example.com')
      cy.get('#create-blog').click()

      cy.contains('Somthing Cool')
    })

    describe('and a blog exist', function () {

      it('user like a blog', function () {
        cy.contains('view').click()
        cy.get('.like').click()
      })

      it('user who created the blog can delete it', function () {
        cy.contains('view').click()
        cy.get('.remove').click()
        cy.on('windows:confirm', () => true)
      })

      describe('first one has most likes', function () {
        beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('#title').type('Somthing Cool')
        cy.get('#author').type('Someone Cool')
        cy.get('#url').type('http://example.com')
        cy.get('#likes').type('4')
        cy.get('#create-blog').click()
        

        cy.contains('New Blog').click()
        cy.get('#title').type('Somthing Cool')
        cy.get('#author').type('Someone Cool')
        cy.get('#url').type('http://example.com')
        cy.get('#likes').type('3')
        cy.get('#create-blog').click()
        
        cy.contains('New Blog').click()
        cy.get('#title').type('Somthing Cool')
        cy.get('#author').type('Someone Cool')
        cy.get('#url').type('http://example.com')
        cy.get('#likes').type('10')
        cy.get('#create-blog').click()
        })
          
        it('and the first blog has maximum likes', function () {
          cy.contains('view').click()
          cy.get('.like').parent().as('likeblock')
          cy.get('.likes').contains(10)
        })
      })
    })
  })
})