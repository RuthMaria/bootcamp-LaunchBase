
const users = [
    {
         name: "Carlos", 
         technologies: ["HTML", "CSS"] 
    },
    {
         name: "Jasmine",
         technologies: ["JavaScript", "CSS"] 
    },
    {
         name: "Tuane", 
         technologies: ["HTML", "Node.js"] 
    }
]

for (let i = 0; i < users.length; i++) {
    console.log(`${users[i].name} works with ${users[i].technologies.join(', ')}`)
}

function checkIfUserUseCSS(user) {
    for (let i = 0; i < user.technologies.length; i++) {
          found = user.technologies[i] == "CSS"
    }
    return found
}

for (let i = 0; i < users.length; i++) {
     const userWorkWithCSS = checkIfUserUseCSS(users[i]);
   
     if (userWorkWithCSS) {
       console.log(`The user ${users[i].name} works with CSS`);
     }
}