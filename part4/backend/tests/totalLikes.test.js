const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const oneBlog = [
        {
            _id: "64dd00ea8b0697ce21aceaf5",
            title: "React Custom Hook: useArray",
            author: "Leschev",
            url: "https://habr.com/en/articles/752750/",
            likes: 5,
            __v: 0
        }
    ]

    test('when list hao only one blog, equals the likes of that blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(5)
    })

    const blogs =     [
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

    test('sum of all likes on the blogs', ()=> {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(17)
    })
})