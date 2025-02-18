const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('username must be unique', async() => {
    existingUsername = helper.initialUsers[0].username

    const newUser = {
        username: existingUsername,
        password: "12345" 
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    assert(result.body.error.includes('E11000 duplicate key error'))

})

test('username must exist', async() => {


    const newUser = {
        password: "12345" 
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    assert(result.body.error.includes('User validation failed: username: Path `username` is required.'))

})

test('username must be valid', async() => {


    const newUser = {
        username: "hi",
        password: "12345" 
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    assert(result.body.error.includes('User validation failed: username: Path `username` (`hi`) is shorter than the minimum allowed length (3).'))

})

test('password must exist', async() => {


    const newUser = {
        username: "User"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    assert(result.body.error.includes('invalid password'))

})

test('password must be valid', async() => {


    const newUser = {
        username: "User",
        password: "ok"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    assert(result.body.error.includes('invalid password'))

})

after(async () => {
  await mongoose.connection.close()
})