
function printNumber (number) {
    console.log(number * 2)
  }
  
function printDouble(number){
    setTimeout(printNumber(number), 
    Math.floor(Math.random() * 100) + 1
    )
}

function printAll(){
    printDouble(5)
    printDouble(10)
    printDouble(22)
    printDouble(1)
    printDouble(89)
}

printAll()
