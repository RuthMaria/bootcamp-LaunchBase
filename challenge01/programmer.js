
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
