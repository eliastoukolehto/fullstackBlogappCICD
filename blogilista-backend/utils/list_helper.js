const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>  {
    const total = blogs .reduce(
        (acc, current) => acc + current.likes,
        0,
    );
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return null

    const mostLiked = blogs.reduce((best, current) => current.likes > best.likes ? current : best)
    return{ title: mostLiked.title, author: mostLiked.author, likes: mostLiked.likes }

}

const mostBlogs = (blogs) => {
    if (blogs.length == 0) return null

    const blogCounts = lodash.countBy(blogs, 'author')
    const mostProfilic = Object.entries(blogCounts).reduce((max, current) => current[1] > max[1] ? current : max)
    return({ author: mostProfilic[0], blogs: mostProfilic[1] })
}

const mostLikes = (blogs) => {
    if (blogs.length == 0) return null

    const likeCounts = {}
    blogs.forEach(blog => !likeCounts[blog.author] 
        ? likeCounts[blog.author] = blog.likes 
        : likeCounts[blog.author] += blog.likes
    )
    const mostLiked = Object.entries(likeCounts).reduce((max, current) => current[1] > max[1] ? current : max)
    return({ author: mostLiked[0], likes: mostLiked[1]})

}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}