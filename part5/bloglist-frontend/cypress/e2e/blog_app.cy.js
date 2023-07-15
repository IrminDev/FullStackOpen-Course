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


})