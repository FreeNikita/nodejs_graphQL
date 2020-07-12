const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Todo {
        _id: ID!
        done: Boolean!
        title: String!
        createdDate: String
        updateDate: String
    }

    type Id {
        id: ID!
    }

    input TodoInput {
        title: String!
    }

    type Query {
        getTodos: [Todo]
    }

    type Mutation {
        addTodo(todo: TodoInput!): Todo!
        completeTodo(id: ID): Todo!
        removeTodo(id: ID): Id
    }
`)