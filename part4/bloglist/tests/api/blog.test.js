const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const helper = require('./initial')
const Balrog = require('../../model/blog')
const UserModel = require('../../model/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')

let token

beforeEach(async () => {
    await Balrog.deleteMany({})
    await UserModel.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 15)
    const userDetails = {
        username: 'admin',
        name: 'admin',
        passwordHash,
    }
    const user = new UserModel(userDetails)
    const savedUser = await user.save()
    const userForToken = {
        username: savedUser.username,
        id: savedUser._id,
    }
    token = jwt.sign(userForToken, config.SECRET)
    // console.log(savedUser)
    for (let blog of helper.initialBlogs) {
        blog.creator = savedUser._id
        let blogObject = new Balrog(blog)
        await blogObject.save()
    }
  })
  
  describe('viewing id', () => {
    test('verify id and not _id', async () => {
      const singleBlog = await helper.blogsInDb()
      expect(singleBlog[0].id).toBeDefined()
      expect(singleBlog[0]._id).toBe(undefined)
    })
  })

  describe('checking blogs', () => {
    test('Blogs exist', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
      })
      test('Check if a specific blog is present', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map((blog) => blog.title)
        expect(titles).toContain('Go To Statement Considered Harmful')
      })
      
  })

  describe(`Blogging Tests`, ()=>{
    test('verify posting successfully creates a new blog', async()=>{

        const test = {
            title: 'Something Cool',
            author: 'Random Person',
            url: 'https://www.google.com',
            likes: 69
          }
      
          await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(test)
                .expect(201)
                .expect('Content-Type', /application\/json/)

          const end = await helper.blogsInDb()
          expect(end).toHaveLength(helper.initialBlogs.length + 1)
          const titles = end.map(t => t.title)
          expect(titles).toContain('Something Cool')
    })

    test(`verify if like exists`, async()=>{

        const test = {
            title: 'Something Cool',
            author: 'Somebody Cool',
            url: 'https://www.google.com'
          }
      
          const response = await api
                    .post('/api/blogs')
                    .set('Authorization', `bearer ${token}`)
                    .send(test)
                    .expect(201)
          expect(response.body.likes).toBeDefined()
          expect(response.body.likes).toBe(0)
        })

        test('no url no add', async () => {
            const test = {
              title: 'Something Cool',
              author: 'Somebody Cool'
            }
        
            await api
                    .post('/api/blogs')
                    .set('Authorization', `bearer ${token}`)
                    .send(test)
                    .expect(400)

            const end = await helper.blogsInDb()
            expect(end).toHaveLength(helper.initialBlogs.length)
          })

          test('no title no add', async () => {
            const test = {
              url: 'https://www.gooogle.com',
              author: 'Somebody Cool'
            }
        
            await api
                    .post('/api/blogs')
                    .set('Authorization', `bearer ${token}`)
                    .send(test)
                    .expect(400)

            const end = await helper.blogsInDb()
            expect(end).toHaveLength(helper.initialBlogs.length)
          })

        test('No Token, No Add', async () => {
            const newBlog = {
              author: 'Random Person',
              title: 'Something Cool',
              url: 'https://www.google.com',
            }
        
            await api.post('/api/blogs').send(newBlog).expect(401)
        
            const blogsInDb = await helper.blogsInDb()
            expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
          })

          test('deleting', async () => {
          
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
        
            await api
                  .delete(`/api/blogs/${blogToDelete.id}`)
                  .set('Authorization', `bearer ${token}`)
                  .expect(204)
        
            const blogsAtEnd = await helper.blogsInDb()
        
            expect(blogsAtEnd).toHaveLength(
              helper.initialBlogs.length - 1
            )
          })

        test('updating likes', async () => {
            const test = {
                likes: 6969
              }
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            await api.put(`/api/blogs/${blogToUpdate.id}`).send(test).set('Authorization', `bearer ${token}`).expect(200)
            const end = await helper.blogsInDb()
            const like = end.map(t => t.likes)
            expect(like).toContain(6969)
            
      })
    })

  afterAll(() => {
    mongoose.connection.close
  })