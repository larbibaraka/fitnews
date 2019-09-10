const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./generated/prisma-client/');

 

// define resolvers
const resolvers = {
    Query : {
        info : () => 'now we are serving data from a real data base harray !!',
     
        link : (root, args, context, info) => { return context.prisma.link(args.id) },    
    },
    Mutation : {
        post : (root, args, context) => {
            return context.prisma.createLink({
                    url : args.url,
                    description : args.description
            }) 
        },
        updateLink : (root, args, context) => {
                                         
        },
        deleteLink : (parent, args) => {
            for(let i=0 ; i<links.length; i++){
                if(links[i].id === args.id){
                    links.splice(i,1);
                    return links[i];
                }
               
            }

        }
    }  
}



const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers,
    context : { prisma }
});
server.start(()=>console.log(`server is running on port 4000`));