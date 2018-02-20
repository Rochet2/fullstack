const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { InitialBlogs, GetUnusedId } = require('./test_helper')

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

  describe('/api/blogs/:id', async () => {
    test('GET returns empty array', async () => {
      const unusedid = GetUnusedId()
      await api
        .get(`/api/blogs/${unusedid}`)
        .expect(404)
    })
  })
})

describe('when blogs exist', async () => {
  beforeAll(async () => {
    await Blog.remove({})
    const blogObjects = InitialBlogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
  })

  describe('/api/blogs', async () => {
    test('GET lists all blogs', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(InitialBlogs.length)
      InitialBlogs.forEach(blog => {
        expect(response.body).toContainEqual(blog)
      })
    })
  })
})

afterAll(() => {
  server.close()
})
