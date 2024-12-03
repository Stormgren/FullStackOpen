const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const User = require('../model/user')
const app = require('../app');
const helper = require("./test_helper");

const api = supertest(app);

describe('When there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

      //  const passwordHash = await bcrypt.hash('sekret', 10)

        const user = new User({
            username: 'root',
            name: 'Root User',
            passwordHash: 'admin'
        })

        await user.save()
    }, 5000)

    test('Successful creation of user with fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'ltorvalds',
            name: 'Linus Torvalds',
            passwordHash: 'linux4life'
        }

         await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Creating a user with existing username fails and proper status message is displayed', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Root User',
            passwordHash: 'admin'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Creating a user fails if password is missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'james'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    test('Creating a user fails if username is missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            passwordHash: 'james'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    test('Creating a user fails if password is less than 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'james',
            passwordHash: '12'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    test('Creating a user fails if username is less than 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'ja',
            passwordHash: '123456'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
