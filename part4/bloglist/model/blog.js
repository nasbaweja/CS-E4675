const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)