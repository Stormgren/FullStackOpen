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

test('Created a new blog post', async () => {
    const newBlog = {
        title: "This is a new blog",
        author: "John Doe",
        url: "https://newblog.com",
        likes: 10
    }
     await api.post('/api/blogs')
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/ )

    const res = await helper.blogsInDb();

    expect(res).toHaveLength(helper.initialBlogs.length + 1);

    const authors = res.map(b => b.author);
    expect(authors).toContain('John Doe')
})