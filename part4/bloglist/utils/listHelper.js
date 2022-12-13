// import _ from 'lodash'
const _ = require('lodash')
const dummy = (blogs) => {
    // ...
    return 1;
  }

const totalLikes = (blogs) => {
  let total = 0;
  blogs.map((indexValue) => {
    total = total+indexValue.likes
  })
  return total
}

const favoriteBlog = (blogs) =>{
  if (blogs.length === 0) return {}
  
  let index = 0;
  blogs.map((indexValue,j)=>{
    if(blogs[index].likes < indexValue.likes){
      index = j
    }
  })
  return { title: blogs[index].title, author: blogs[index].author, likes: blogs[index].likes}
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const groupedBlogs = _.groupBy(blogs, blogAuthor)
  const blogsByAuthors = _.mapValues(groupedBlogs, (e) => e.length)
  const mostBlog = Object.entries(blogsByAuthors).reduce((a, b) => a[1] > b[1] ? a : b)
  return { 'author': mostBlog[0], 'blogs': mostBlog[1] }
}
  

const blogAuthor = (blog) => blog.author

const mostLikes = (blogs) =>{
  if (blogs.length === 0) return {}

  let authors = {}
  blogs.map((indexValue,j)=>{
    if(authors[indexValue.author]){
      authors[indexValue.author] +=indexValue.likes
    }
    else{
      authors[indexValue.author] = indexValue.likes
    }
  })

  let refinedAuthors = _.maxBy(_.keys(authors), function (o) { return authors[o]; });
  return {author:refinedAuthors, likes: authors[refinedAuthors]}
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }