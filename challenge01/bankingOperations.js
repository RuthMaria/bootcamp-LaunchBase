
const user = {
    name: "Ruth",
    transactions: [],
    balance: 0
}

function createTransaction(transaction) {

    user.transactions.push(transaction)    

    if (transaction.type == "credit") {
        user.balance += transaction.value
    } else {  
        user.balance -= transaction.value
    }
}


function getHigherTransactionByType(TypeTransaction) {
    let biggerValue = 0, index = 0

    for (let i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].value > biggerValue && user.transactions[i].type == TypeTransaction) {
            biggerValue = user.transactions[i].value
            index = i
        }
    }

    return user.transactions[index]
}

function getAverageTransactionValue() {
    let sum = 0, averageTransactions = 0
    let amount = user.transactions.length

    for (let i = 0; i < user.transactions.length; i++) {
        sum += user.transactions[i].value
    }
    
    averageTransactions = sum / amount

    return averageTransactions
}

function getTransactionsCount() {
    let amountTransactionsOfType = {
        credit: 0,
        debit: 0
    }

    for (let i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].type == 'credit') {
            amountTransactionsOfType.credit++        
        } else {
            amountTransactionsOfType.debit++
        }
    }
    
    return amountTransactionsOfType 
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

let biggerValueCredit = getHigherTransactionByType("credit")
let biggerValueDebit =  getHigherTransactionByType("debit")
let averageTransactions = getAverageTransactionValue()
let amountTransactionsOfType = getTransactionsCount()

console.log(user.balance)
console.log(biggerValueCredit)
console.log(biggerValueDebit)
console.log(averageTransactions)
console.log(amountTransactionsOfType)