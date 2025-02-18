const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }  
]

initialUsers = [
  {
    username: "MartinRob",
    name: "Robert C. Martin",
    password: "secret"
  },
  {
    username: "Admin",
    name: "admin",
    password: "12345"
  },
  {
    username: "TestUser",
    name: "First Last",
    password: "guest"
  }
]

const existingUserToken = async (api) => {
  const user = {
    username: "EWDijkstra",
    name: "Edsger W. Dijkstra",
    password: "password"
  }
  const userlogin = {
    username: "EWDijkstra",
    password: "password"
  }


  await api
    .post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  response = await api
    .post('/api/login')
    .send(userlogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return `Bearer ${response.body.token}`

}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, initialUsers, existingUserToken
}