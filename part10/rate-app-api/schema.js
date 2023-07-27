const typeDefs = `
    type Repository {
        id: String!
        fullName: String!
        description: String!
        language: String!
        forksCount: Int!
        stargazersCount: Int!
        ratingAverage: Int
        reviewCount: Int
        ownerAvatarUrl: String!
    }

    type Query {
        repositories: [Repository!]!
    }
`

module.exports = typeDefs