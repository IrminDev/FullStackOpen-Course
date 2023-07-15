describe('Blog app', () => {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Log in to application')
		cy.contains('username')
		cy.contains('password')
	})

	describe('Login', () => {
		let user
		beforeEach(function() {
			user = {
				name: 'Irmin Dev',
				username: 'IrminDev',
				password: 'TopSecretPassword'
			}
			cy.request('POST', 'http://localhost:3003/api/users/', user)
		})

		it('succeeds with correct credentials', () => {
			cy.get('#username').type(user.username)
			cy.get('#password').type(user.password)
			cy.get('#login-button').click()
			cy.contains(`${user.name} logged in`)
		})

		it('fails with wrong credentials', () => {
			cy.get('#username').type(user.username)
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()
			cy.contains('Wrong credentials')
		})
	})

	describe.only('When logged in', () => {
		beforeEach(function() {
			const user = {
				name: 'Irmin Dev',
				username: 'IrminDev',
				password: 'TopSecretPassword'
			}
			cy.request('POST', 'http://localhost:3003/api/users/', user)
			cy.get('#username').type(user.username)
			cy.get('#password').type(user.password)
			cy.get('#login-button').click()
		})

		it('A blog can be created', () => {
			cy.contains('new blog').click()
			cy.get('#title').type('A blog created by cypress')
			cy.get('#author').type('Cypress')
			cy.get('#url').type('https://www.cypress.io/')
			cy.get('#create-button').click()
			cy.contains('a new blog A blog created by cypress by Cypress added')
		})
	})
})