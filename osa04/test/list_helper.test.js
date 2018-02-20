const listHelper = require('../utils/list_helper')
const { InitialBlogs } = require('./test_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
  test('of bigger list is correct', () => {
    const result = listHelper.totalLikes(InitialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBeNull()
  })
  test('of bigger list is correct', () => {
    var myblogs = InitialBlogs.slice()
    const expected = {
      _id: '5a3422bc61b36a6762346717fc',
      title: 'Like me',
      author: 'Me',
      url: '',
      likes: 1002445,
      __v: 0
    }
    myblogs.push(expected)
    const result = listHelper.favoriteBlog(myblogs)
    expect(result).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    expect(result).toBeNull()
  })
  test('of bigger list is correct', () => {
    const result = listHelper.mostBlogs(InitialBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    expect(result).toBeNull()
  })
  test('of bigger list is correct', () => {
    const result = listHelper.mostLikes(InitialBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
