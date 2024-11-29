const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../model/blog');
const app = require('../app');
const helper = require('./test_helper');



beforeEach(async () => {
    await Blog.deleteMany({})
   
    await Blog.insertMany(helper.initialBlogs)
})

const api = supertest(app);

test('Blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/ )
})

test('There are 4 blogs', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(helper.initialBlogs.length);
});

test('Blog has an id', async () => {
    const res = await api.get('/api/blogs');

    res.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
    })
})
