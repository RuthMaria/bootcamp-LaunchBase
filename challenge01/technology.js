/* Crie um programa que armazena um array de usuários (objetos), cada usuário tem um name e suas technologies (novo array).
Percorra a lista de usuários com uma estrutura de repetição imprimindo em tela as informações dos usuários:

saída:
Carlos trabalha com HTML, CSS
Jarmine trabalha com JavaScript, CSS
Tuane trabalha com HTML, Node.js

Depois, crie uma função que recebe os dados de um objeto de usuário e retorna SE o usuário trabalha com CSS ou não. 
Essa função deve retornar um boolean true/false.

Em seguida, Percorra o array de usuários e, para cada um, verifique se o mesmo trabalha com CSS utilizando a função construída acima,
se SIM, imprima em tela as informações do usuário:*/


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