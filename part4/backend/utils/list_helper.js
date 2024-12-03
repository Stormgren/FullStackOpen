const _ = require('lodash')

const dummy = (blogs) => {
    
    return 1;

}

const totalLikes = (blogs) => {
    let sum = 0;
    blogs.map(blog => sum += blog.likes);

    return sum;
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0){
        return []
    }
     const maxLikes = blogs.reduce((prev, current) =>( 
     (current.likes > prev.likes) ? current : prev))

    return maxLikes;

}

const mostBlogs = (blogs) => {
    let authors = _.head(_(blogs)
    .countBy('author')
    .entries()
    .maxBy(_.last));

  return authors;
}

const mostLikes = (blogs) => {
    
let sumLikes = _(blogs)
.groupBy('author')
.map((objs, key) => {
    return {
        'author': key,
        'likes': _.sumBy(objs, 'likes')
    }
}).value()

 
 let maxLikes = _.maxBy(sumLikes, 'likes')

 return maxLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}