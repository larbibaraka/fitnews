const { GraphQLServer } = require('graphql-yoga');

let links = [
    {
        id  : "link-0",
        url : "www.google.com",
        description : "the best search engine you will ever gonna need in your life"
    }
]

let idCount = links.length;

// define resolvers
const resolvers = {
    Query : {
        info : () => 'hello this is just an info about fitnews',
        feed : () => links,
    },
    Mutation : {
        post : (parent, args) => {
            const link = {
                id : `link-${idCount++}`,
                url : args.url,
                description : args.description
            }
            links.push(link)
            return link 
        }
    }  
}

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers
});
server.start(()=>console.log(`server is running on port 4000`));