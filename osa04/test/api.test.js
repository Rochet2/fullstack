const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const utils = require('../utils/utils')
const User = require('../models/user')
const Blog = require('../models/blog')

describe('when no users exist', async () => {
  beforeAll(async () => {
    await User.remove({})
  })

  describe('/api/users', async () => {
    test('GET returns empty array', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual([])
    })
  })
})

describe('when no blogs exist', async () => {
  beforeAll(async () => {
    await Blog.remove({})
  })

  describe('/api/blogs', async () => {
    test('GET returns empty array', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual([])
    })
  })

  describe.skip('/api/blogs/:id', async () => {
    test('GET returns 404', async () => {
      const unusedid = helper.GetUnusedId()
      await api
        .get(`/api/blogs/${unusedid}`)
        .expect(404)
    })
  })
})


describe('when users exist', async () => {
  beforeAll(async () => {
    await User.remove({})
    const userObjects = helper.InitialUsers.map(b => new User(b))
    const promiseArray = userObjects.map(u => u.save())
    await Promise.all(promiseArray)
  })
  describe('when blogs exist', async () => {
    beforeAll(async () => {
      await Blog.remove({})
      const blogObjects = helper.InitialBlogs.map(b => new Blog(b))
      const promiseArray = blogObjects.map(b => b.save())
      await Promise.all(promiseArray)
    })

    describe('/api/blogs', async () => {
      test('GET lists all blogs', async () => {
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const expected = await helper.GetBlogs()
        expect(response.body).toHaveLength(expected.length)
        expected.forEach(blog => {
          expect(response.body).toContainEqual(blog)
        })
      })

      test('POST adds a blog and returns it', async () => {
        const newblog = helper.NewBlog()
        const blogsBefore = await helper.GetBlogs()
        const response = await api
          .post('/api/blogs')
          .send(newblog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.GetBlogs()
        expect(blogsAfter).toHaveLength(blogsBefore.length + 1)
        expect(response.body).toMatchObject(utils.RemoveFields(newblog, ['userid']))
      })

      test('POST blog without likes defaults to 0', async () => {
        const newblog = helper.NewBlog({ likes: undefined })
        const response = await api
          .post('/api/blogs')
          .send(newblog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
      })

      test('POST added blog is added to list returned by GET', async () => {
        const newblog = helper.NewBlog()
        const postresponse = await api
          .post('/api/blogs')
          .send(newblog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogs = await helper.GetBlogs()
        expect(blogs).toContainEqual(postresponse.body)
      })

      test('POST added blog returns error when title missing', async () => {
        const newblog = helper.NewBlog({ title: undefined })
        const response = await api
          .post('/api/blogs')
          .send(newblog)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'title missing' })
      })

      test('POST added blog returns error when url missing', async () => {
        const newblog = helper.NewBlog({ url: undefined })
        const response = await api
          .post('/api/blogs')
          .send(newblog)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'url missing' })
      })
    })

    describe.skip('/api/blogs/:id', async () => {
      test('GET returns correct blog', async () => {
        const expectedblog = await helper.GetBlogs()[0]
        const response = await api
          .get(`/api/blogs/${expectedblog._id}`)

        expect(response.body).toEqual(expectedblog)
      })
    })

    describe('/api/blogs/:id', async () => {
      test('DELETE removes the blog from DB', async () => {
        const blogsBefore = await helper.GetBlogs()
        const deletedblog = blogsBefore[0]
        await api
          .delete(`/api/blogs/${deletedblog._id}`)
          .expect(204)

        const blogsAfter = await helper.GetBlogs()
        expect(blogsAfter).toHaveLength(blogsBefore.length - 1)
        expect(blogsAfter).not.toContainEqual(deletedblog)
      })

      test('DELETE returns error with invalid id', async () => {
        const response = await api
          .delete(`/api/blogs/${helper.GetUnusedId()}`)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'malformatted id' })
      })

      test('PATCH returns the new blog', async () => {
        const blogsBefore = await helper.GetBlogs()
        const blog = blogsBefore[0]
        const mods = { likes: blog.likes + 5 }
        const response = await api
          .patch(`/api/blogs/${blog._id}`)
          .send(mods)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const moddedblog = helper.ModifyHash(blog, mods)
        expect(response.body).toEqual(moddedblog)
      })

      test('PATCH modifies blog in DB', async () => {
        const blogsBefore = await helper.GetBlogs()
        const blog = blogsBefore[0]
        const mods = { likes: blog.likes + 5 }
        await api
          .patch(`/api/blogs/${blog._id}`)
          .send(mods)
          .expect(200)

        const blogsAfter = await helper.GetBlogs()
        expect(blogsAfter).toHaveLength(blogsBefore.length)
        const moddedblog = helper.ModifyHash(blog, mods)
        expect(blogsAfter).toContainEqual(moddedblog)
      })

      test('PATCH returns error with invalid id', async () => {
        const id = helper.GetUnusedId()
        const mods = { likes: 5 }
        const response = await api
          .patch(`/api/blogs/${id}`)
          .send(mods)
          .expect(400)

        expect(response.body).toEqual({ error: 'could not patch' })
      })

      test('PATCH returns error with invalid likes', async () => {
        const id = helper.GetUnusedId()
        const mods = { likes: '5' }
        const response = await api
          .patch(`/api/blogs/${id}`)
          .send(mods)
          .expect(400)

        expect(response.body).toEqual({ error: 'could not patch' })
      })

      test('PATCH sets 0 likes when likes missing', async () => {
        const blogsBefore = await helper.GetBlogs()
        const blog = blogsBefore.filter(b => b.likes !== 0)[0]
        const mods = {}
        const response = await api
          .patch(`/api/blogs/${blog._id}`)
          .send(mods)
          .expect(200)

        const moddedblog = helper.ModifyHash(blog, { likes: 0 })
        expect(response.body).toEqual(moddedblog)
      })
    })

    describe('/api/users', async () => {
      test('GET lists all users', async () => {
        const response = await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const expected = await helper.GetUsers()
        expect(response.body).toHaveLength(expected.length)
        const keys = ['blogs']
        const actual = response.body
          .map(u => utils.RemoveFields(u, keys))
        expected
          .map(u => utils.RemoveFields(u, keys))
          .forEach(user => {
            expect(actual).toContainEqual(user)
          })
      })

      test('POST valid user is added to DB', async () => {
        const newUser = helper.NewUser()
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        let users = await helper.GetUsers()
        const keys = Object.keys(newUser)
        users = users.map(x => utils.FilterFields(x, keys))
        expect(users).toContainEqual(User.format(newUser))
      })

      test('POST duplicate username returns error', async () => {
        const usersBefore = await helper.GetUsers()
        const newUser = helper.NewUser({ username: usersBefore[0].username })
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'username must be unique' })
      })

      test('POST creating user returns new user object', async () => {
        const newUser = helper.NewUser()
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toMatchObject(User.format(newUser))
      })

      test('POST missing password returns error', async () => {
        const newUser = helper.NewUser({ password: undefined })
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'password expected to be 3 or more characters' })
      })

      test('POST too short password returns error', async () => {
        const newUser = helper.NewUser({ password: 'pw' })
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'password expected to be 3 or more characters' })
      })

      test('POST missing adult defaults to true', async () => {
        const newUser = helper.NewUser({ adult: undefined })
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toMatchObject({ adult: true })
      })

      test('POST non boolean adult to convert to boolean', async () => {
        const newUser = helper.NewUser({ adult: 'notabool' })
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(response.body).toMatchObject({ adult: true })
      })
    })
  })
})

afterAll(() => {
  server.close()
})
