const blogs = [
    { "_id": "5a422a851b54a676234d17f7", "title": "React patterns", "author": "Michael Chan", "url": "https://reactpatterns.com/", "likes": 0 },
    { "_id": "5a422b3a1b54a676234d17f9", "title": "Canonical string reduction", "author": "Edsger W. Dijkstra", "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", "likes": 15 },
    { "_id": "5a422bc61b54a676234d17fc", "title": "Type wars", "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", "likes": 2 },
    { "_id": "5a422ba71b54a676234d17fb", "title": "TDD harms architecture", "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", "likes": 0 },
    { "_id": "5a422b891b54a676234d17fa", "title": "First class tests", "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", "likes": 10 },
    {
        "_id": "5a985d45847f686101fb0459", "title": "Minun blogi", "author": "Pertti", "url": "pertinblogi.fi", "likes": 0, "user": {
            "_id": "5a985d38847f686101fb0458", "username": "root3", "name": "Pertti"
        }
    },
    {
        "_id": "5a985e47294dde644de2fafa", "title": "Minun blogi", "author": "Pertti", "url": "pertinblogi.fi", "likes": 0, "user": {
            "_id": "5a985d38847f686101fb0458", "username": "root3", "name": "Pertti"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const create = () => {
    return Promise.resolve({})
}

const setUser = () => {
    return Promise.resolve({})
}

const like = () => {
    return Promise.resolve({})
}

const deleteBlog = () => {
    return Promise.resolve({})
}

export default { getAll, create, setUser, like, deleteBlog, blogs }