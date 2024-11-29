const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../model/blog');
const app = require('../app');
const helper = require('./test_helper');
const {blogsInDb} = require("./test_helper");



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

test('Default number of likes is set to 0', async () => {
    const newBlog = {
        title: 'New blog entry',
        author: 'Kenny',
        url: 'https://newblog.com'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/ )

    const res = await helper.blogsInDb();
    expect(res).toHaveLength(helper.initialBlogs.length + 1);
    expect(res[res.length - 1].likes).toBe(0);
})

test('If title or author are missing return error 400', async () => {
    const noTitle = {
        author: 'Joe',
        url: 'https://newblog.com',
        likes: 5
    }

    const noAuthor = {
        title: 'This one has no author',
        url:'http://newblog.com',
        likes: 2
    }


   await api.post('/api/blogs').send(noTitle).expect(400)

    await api.post('/api/blogs').send(noAuthor).expect(400)


})

test('Deleting a blog post', async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)


})