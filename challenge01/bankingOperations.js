/* Crie um programa para realizar operações bancárias na conta de um usuário.

Comece criando um objeto com o nome do usuário, suas transações e saldo.

As transações (transactions) devem iniciar como um array vazio [] e o saldo (balance) em 0 (zero).

Crie uma função createTransaction para adicionar uma nova transação no array de transações de um usuário, essa função deve receber 
como parâmetro um objeto de transação que tem o seguinte formato:
{
  type: 'credit',
  value: 50.5
}

O type pode ser credit para créditos e debit para débitos da conta do usuário.

Quando uma transação for do tipo credit ela deve também somar o valor do crédito no saldo (balance) do usuário.

Se for uma transação do tipo debit ela deve subtrair o valor do débito no saldo (balance) do usuário.

Crie uma função chamada getHigherTransactionByType que recebe como parâmetro o tipo de transação credit/debit, percorre as 
transações do usuário e retorna o objeto da transação de maior valor com aquele tipo.

Crie uma função chamada getAverageTransactionValue que retorna o valor médio das transações de um usuário independente do seu tipo.

*/

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