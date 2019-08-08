const { prisma } = require('./generated/prisma-client/')


//test prisma 

async function main(){
    //create new link
    const newLink = await prisma.createLink({
        url : 'www.facebook.com',
        description : "facebook is a social network",
    })
    console.log(`Created new link : ${newLink.url} (ID : ${newLink.id})`);


}

main().catch(e=> console.error(e));
