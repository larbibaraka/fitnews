const { GraphQLServer } = require('graphql-yoga');


let links = [
    {
        id  : "link-0",
        url : "www.google.com",
        description : "the best search engine you will ever gonna need in your life"
    }
]
// define the schema 
const typeDefs = `
    type Query {
        info : String!
        feed : [Link!]!
    }

    type Link {
        id : ID!
        description : String!
        url : String!
    }
`;

// define resolvers
const resolvers = {
    Query : {
        info : () => 'hello this is just an info about fitnews',
        feed : () => links,
    },
    Link : {
        id : (parent) => parent.id,
        description : (parent) => parent.description,
        url : (parent) => parent.url,
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers
});
server.start(()=>console.log(`server is running on port 4000`));