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
		<form onSubmit={addBlog} className="form">
			<div>
        title:
				<input
					type="text"
					id='title'
					value={title}
					name="title"
					onChange={({ target }) => setTitle(target.value)} />
			</div>
			<div>
        author:
				<input
					type="text"
					id='author'
					value={author}
					name="author"
					onChange={({ target }) => setAuthor(target.value)} />
			</div>
			<div>
        URL:
				<input
					type="text"
					id='url'
					value={url}
					name="url"
					onChange={({ target }) => setUrl(target.value)} />
			</div>

			<button type="submit">new blog</button>
		</form>
	)
}

export default BlogForm