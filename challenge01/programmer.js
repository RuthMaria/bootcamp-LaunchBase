/*Crie um programa com um objeto para armazenar dados de um programmer como name, age e technologies que trabalha.
Um programmer pode trabalhar com várias technologies, por isso armazene essas technologies em um array.
As technologies também devem ser objetos contendo name e specialty

Saída:
O usuário Carlos tem 32 anos e usa a tecnologia C++ com specialty em Desktop */

const programmer = {
    name: 'Ruth',
    age: 29,
    technologies: [
        { 
            name: 'C++', 
            specialty: 'Desktop' 
        },
        { 
            name: 'Python', 
            specialty: 'Data Science'
        },
        {
            name: 'JavaScript', 
            specialty: 'Web/Mobile' 
        }
    ]
}

console.log(`The user ${programmer.name} has ${programmer.age} years old and uses the technologies ${programmer.technologies[0].name} with specialty in ${programmer.technologies[0].specialty}`)
