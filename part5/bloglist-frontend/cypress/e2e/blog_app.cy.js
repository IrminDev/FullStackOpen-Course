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
})