/* eslint-disable linebreak-style */
Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username, password
	}).then(({ body }) => {
		localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
	cy.request({
		url: 'http://localhost:3003/api/blogs',
		method: 'POST',
		body: { title, author, url },
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
		}
	})

	cy.visit('http://localhost:3000')
})

Cypress.Commands.add('likeBlogs', () => {
	cy.request('GET', 'http://localhost:3003/api/blogs')
		.then(({ body }) => {
			body.forEach((blog, i) => {
				cy.request({
					url: `http://localhost:3003/api/blogs/${blog.id}`,
					method: 'PUT',
					body: { ...blog, user: blog.user.id, likes: i },
					headers: {
						'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
					}
				})
				setTimeout(() => {}, 2000)
			})
		})
	cy.visit('http://localhost:3000')
})