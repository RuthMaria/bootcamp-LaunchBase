
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