const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app');
const Blog = require('../model/blog');

const initialBlogs =     [
    {
        _id: "64dd00ea8b0697ce21aceaf5",
        title: "React Custom Hook: useArray",
        author: "Leschev",
        url: "https://habr.com/en/articles/752750/",
        likes: 5,
        __v: 0
    },
    {
        id: "64dd01428b0697ce21aceaf7",
        title: "Best Practices for Writing Unit Tests: A Comprehensive Guide",
        author: "Or Hillel",
        url: "https://dzone.com/articles/best-practices-for-writing-unit-tests-a-comprehens",
        likes: 7,
        __v: 0
    },
    {
        id: "64dd01918b0697ce21aceaf9",
        title: "How to Build a JavaScript Utility Library like Lodash",
        author: "Gideon Akinsanmi",
        url: "https://www.freecodecamp.org/news/how-to-create-a-javascript-utility-library-like-lodash/",
        likes: 3,
        __v: 0
    },
    {
        id: "64dfd50700b3260ce62183e6",
        title: "What's the Difference Between Default and Named Exports in JavaScript?",
        author: "Yazdun Fadali",
        url: "https://www.freecodecamp.org/news/difference-between-default-and-named-exports-in-javascript/",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObj = new Blog(initialBlogs[0]);
    await blogObj.save();
    blogObj = new Blog(initialBlogs[1]);
    await blogObj.save()
    blogObj = new Blog(initialBlogs[2]);
    await blogObj.save()
    blogObj = new Blog(initialBlogs[3]);
    await blogObj.save()
})

const api = supertest(app);

test('Blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/ )
})

test('There are 4 blogs', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(4);
});

