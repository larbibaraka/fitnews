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
        link : (parent, args) => { for(let i=0; i<links.length ; i++){ if(links[i].id === args.id) {return links[i]} } },
         
        
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
        },
        updateLink : (parent, args) => {
         for(let i=0 ; i<links.length; i++){
               if(links[i].id === args.id){
                  if(args.url){
                    links[i].url = args.url;
                  }
                  if(args.description){
                      links[i].description = args.description;
                  }           
               }
               return links[i];
         }
                //const {id,url,description} = args;
                              
            
        },
        deleteLink : (parent, args) => {
            links.map((link,i)=>{
                const {id} = args;
                if(link.id === id) {
                    links.splice(i,1);
                }
                return link;
            })
        }
    }  
}

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers
});
server.start(()=>console.log(`server is running on port 4000`));