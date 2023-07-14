import React from 'react'
import { useState } from 'react'

function BlogForm({ createBlog }) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title,
			author,
			url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}
	return (
		<form onSubmit={addBlog}>
			<div>
        title:
				<input
					type="text"
					value={title}
					name="title"
					onChange={({ target }) => setTitle(target.value)} />
			</div>
			<div>
        author:
				<input
					type="text"
					value={author}
					name="title"
					onChange={({ target }) => setAuthor(target.value)} />
			</div>
			<div>
        URL:
				<input
					type="text"
					value={url}
					name="title"
					onChange={({ target }) => setUrl(target.value)} />
			</div>

			<button type="submit">new blog</button>
		</form>
	)
}

export default BlogForm