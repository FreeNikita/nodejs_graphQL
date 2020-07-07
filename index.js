const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const graphqlHTTP = require('express-graphql')

const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// app.use(graphqlHTTP({
//     schema,
//     rootValue: resolver,
// }))

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

const MONGO_CONNECT = "mongodb+srv://nikita:JaB5sqmHVoyLzfaT@cluster0-boop9.mongodb.net/restAPI?retryWrites=true&w=majority"

async function start(){
    try {
        await mongoose.connect(MONGO_CONNECT, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`The server was run on port ${PORT}${server.graphqlPath}`)
        })

    } catch(error) {
        console.log("Error Run Project: ", error )
    }
} 

start()

