import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ currentUser, blog, upvote, deletion }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }


  const showFullBlog = () => {
    // console.log(blog.creator.name)
    console.log(blog.user)
    console.log(currentUser.id)
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          <p className='likes'>{blog.likes}{' '}</p>
          <button className='like' onClick={() => upvote(blog.id, blog.likes)}>like</button>
        </p>
        {/* <p>{blog.user.name}</p> */}
        {blog.user === currentUser.id?
        <button className='remove' onClick={() => deletion(blog)}>remove</button>
        :
        null
        }
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <i>{blog.author}</i>
      <button onClick={() => setShowFull(!showFull)}>
        {showFull ? 'hide' : 'view'}
      </button>
      {showFull && showFullBlog()}
    </div>
  )
}

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
}

export default Blog