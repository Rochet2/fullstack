const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { InitialBlogs, GetUnusedId, GetBlogs, NewBlog } = require('./test_helper')

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

      const expected = await GetBlogs()
      expect(response.body).toHaveLength(expected.length)
      expected.forEach(blog => {
        expect(response.body).toContainEqual(blog)
      })
    })

    test('POST adds a blog and returns it', async () => {
      const newblog = NewBlog()
      const response = await api
        .post('/api/blogs')
        .send(newblog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      Object.keys(newblog).forEach(function (key) {
        expect(response.body[key]).toBe(newblog[key])
      })
    })

    test('POST blog without likes defaults to 0', async () => {
      const newblog = NewBlog({ likes: undefined })
      const response = await api
        .post('/api/blogs')
        .send(newblog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      expect(response.body.likes).toBe(0)
    })

    test('POST added blog is added to list returned by GET', async () => {
      const newblog = NewBlog()
      const postresponse = await api
        .post('/api/blogs')
        .send(newblog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogs = await GetBlogs()
      expect(blogs).toContainEqual(Blog.format(postresponse.body))
    })

    test('POST added blog returns 400 when title missing', async () => {
      const newblog = NewBlog({ title: undefined })
      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(400)
    })

    test('POST added blog returns 400 when url missing', async () => {
      const newblog = NewBlog({ url: undefined })
      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(400)
    })
  })

  describe.skip('/api/blogs/:id', async () => {
    test('GET returns correct blog', async () => {
      const expectedblog = GetBlogs()[0]
      const response = await api
        .get(`/api/blogs/${expectedblog._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual(expectedblog)
    })
  })
})

afterAll(() => {
  server.close()
})
