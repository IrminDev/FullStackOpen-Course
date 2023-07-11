const list_helper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    ]

    const emptyList = []

    const biggerList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
    const result = list_helper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
    })

    test('of empty list is zero', () => {
        const result = list_helper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('of a bigger list is calculated right', () => {
        const result = list_helper.totalLikes(biggerList)
        expect(result).toBe(10)
    })
})

describe('favorite blog', () => {
    const someList = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
        }
    ]

    const listWithOneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    test('of empty list is null', () => {
        const result = list_helper.favoriteBlog([])
        expect(result).toBe(null)
    })

    test('of a list with one blog is that blog', () => {
        const result = list_helper.favoriteBlog([listWithOneBlog[0]])
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('of a list with multiple blogs is the one with most likes', () => {
        const result = list_helper.favoriteBlog(someList)
        expect(result).toEqual(someList[1])
    })
})