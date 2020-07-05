/*Crie um programa que calcula a sum de revenue e expenses de usuários e no fim retorna o balance (revenue - expenses).
Utilize o array de usuários dado abaixo.

Percorra o array de usuários e para cada usuário chame uma função chamada calculateBalance que recebe como parâmetro as revenue e 
expenses do usuário.

Crie uma segunda função que recebe como parâmetro um array de números e retorna a sum deles e use-a para calcular a sum de 
revenue e expenses dentro da função calculateBalance.

A função calculateBalance deve utilizar a função sumNumbers para calcular a sum de revenue e expenses e no fim retornar o balance do 
usuário, ou seja revenue - expenses.

No fim exiba todos usuários em telas, seu respectivo balance e SE o balance é POSITIVO ou NEGATIVO:

Saída: 
Fulano possui balance POSITIVO de 43.3
Sicrano possui balance NEGATIVO de -90.3
*/

const users = [
    {
      name: "Salvio",
      revenue: [115.3, 48.7, 98.3, 14.5],
      expenses: [85.3, 13.5, 19.9]
    },
    {
      name: "Marcio",
      revenue: [24.6, 214.3, 45.3],
      expenses: [185.3, 12.1, 120.0]
    },
    {
      name: "Lucia",
      revenue: [9.8, 120.3, 340.2, 45.3],
      expenses: [450.2, 29.9]
    }
]


function usersExpenses(){

    for (const user of users) {
        const balance = calculateBalance(user.revenue, user.expenses)

        if (balance > 0) {
            console.log(`${user.name} has balance POSITIVE of the ${balance.toFixed(2)}`)     

        } else {
            console.log(`${user.name} has balance NEGATIVE of the ${balance.toFixed(2)}`)
        }
    }
}

function calculateBalance(revenue, expenses) {
    const sumRevenue = sumNumbers(revenue) 
    const sumExpenses = sumNumbers(expenses)
    return sumRevenue - sumExpenses
}

function sumNumbers(numbers) {
    let sum = 0

    for (const number of numbers) {
        sum += number
    }

    return sum
}

usersExpenses()