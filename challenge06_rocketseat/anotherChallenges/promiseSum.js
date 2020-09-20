
function printDouble(number, sum){

    const promise = new Promise((resolve, reject) => {
        setTimeout(
        () => {
            resolve((number * 2) + sum)
        }, 
        Math.floor(Math.random() * 100) + 1
        )
    })
    return promise
}
 
 function printAll2(){
  printDouble(5)
    .then(result => {
      console.log(result)
      return printDouble(12, 0)})
    .then(result => {
        console.log(result)
        return printDouble(2, result)})
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

 printAll() 
