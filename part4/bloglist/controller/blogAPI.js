const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Balrog = require('../model/blog')
const UserModel = require('../model/users')

blogsRouter.get('/', (request, response) => {
  Balrog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const token = request.token
  
  if (!token)
  {
    return response.status(401).json({ error: 'Wrong identifier' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!body.title || !body.url)
    {
       return response.status(400).json({ error: 'title or url missing' })
    }

  const user = await UserModel.findById(decodedToken.id)
  const blog = new Balrog(
    {
        title:body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    }
  )

  const save = await blog.save()
  user.blogs = user.blogs.concat(save._id)
  await user.save;
  response.status(201).json(save.toJSON());
})

blogsRouter.delete('/:id', async (request, response) => {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

    const blogID = request.params.id
    const blog = await Balrog.findById(blogID)
    if (blog.user.toString() === decodedToken.id) {
        await Balrog.findByIdAndRemove(blogID)
        response.status(204).end()
      }
    else{
    response.status(401).json({
        error: 'You are not authorized',
      })
    }
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

    const blog = {
      likes: body.likes,
    }
  
    const updatedBlog = await Balrog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.json(updatedBlog)
})

module.exports = blogsRouter