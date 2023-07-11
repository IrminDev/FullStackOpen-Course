const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
  
    const authors = blogs.map(blog => blog.author);
  
    const authorCounts = authors.reduce((counts, author) => {
      counts[author] = (counts[author] || 0) + 1;
      return counts;
    }, {});
  
    let maxAuthor = null;
    let maxCount = 0;
  
    for (const author in authorCounts) {
      if (authorCounts[author] > maxCount) {
        maxAuthor = author;
        maxCount = authorCounts[author];
      }
    }
  
    return { author: maxAuthor, blogs: maxCount };
  }
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}