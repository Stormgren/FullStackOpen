const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const Blog = require('../model/blog');
const User = require('../model/user');
const app = require('../app');
const helper = require('./test_helper');
const {blogsInDb} = require("./test_helper");

let token = '';

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const login = {
        username: 'root',
        passwordHash: 'sekret',
    }
    const loginResponse = await api
        .post('/api/login')
        .send(login)

    token = loginResponse.body.token

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
     await api.post('/api/blogs').set('Authorization', `Bearer ${token}`)
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/ )

    const res = await helper.blogsInDb();

    expect(res).toHaveLength(helper.initialBlogs.length + 1);

    const authors = res.map(b => b.author);
    expect(authors).toContain('John Doe')
})


test('Cant create a blog if there is no Token', async () => {
    const newBlog = {
        title: "This is a new blog",
        author: "John Doe",
        url: "https://newblog.com",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


test('Default number of likes is set to 0', async () => {
    const newBlog = {
        title: 'New blog entry',
        author: 'Kenny',
        url: 'https://newblog.com'
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`)
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


   await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noTitle).expect(400)

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noAuthor).expect(400)


})

test('Deleting a blog post', async () => {
    const blogs = await blogsInDb();

    const newBlog = {
        title: 'New blog entry',
        author: 'Kenny',
        url: 'https://newblog.com'
    }

    const postBlog = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)

    const blogToDelete = postBlog.body

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogs.length)

})

test('Updating a blog post', async () => {
    const newBlog = {
        title: "This is a new blog",
        author: "John Doe",
        url: "https://newblog.com",
        likes: 10
    }

    const updateBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

    const updateLikes = updateBlog.body.likes + 1;

    const newLikes = {
        likes: updateLikes
    }

    await api.put(`/api/blogs/${updateBlog.body.id}`).set('Authorization', `Bearer ${token}`).send(newLikes).expect(200)
    const blogs = await helper.blogsInDb();
    expect(blogs[blogs.length - 1].likes).toBe(11)
})