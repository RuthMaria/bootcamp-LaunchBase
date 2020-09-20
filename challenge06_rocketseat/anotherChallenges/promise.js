
function printDouble(number){

    const promise = new Promise((resolve, reject) => {
        setTimeout(
        () => {
            resolve(number * 2)
        }, 
        Math.floor(Math.random() * 100) + 1
        )
    })
    return promise
}
  
  function printAll( ){
    const numbers = [2, 10, 22, 1, 89]
     const promises = [];
     numbers.forEach(entry => promises.push(printDouble(entry)));
     Promise.all(promises)
         .then(results => results.forEach(entry => console.log(entry)))
         .catch(error => console.log(error));
 }

 // second form
 function printAll2(){
  printDouble(5)
    .then(number => {
      console.log(number)
      return printDouble(10)})
    .then(number => {
        console.log(number)
        return printDouble(22)})
    .then(number => {
      console.log(number)
      return printDouble(1)})
    .then(number => {
      console.log(number)
      return printDouble(89)})
    .then(number => console.log(number))
    .catch(err => console.log(err))
}

 printAll() 
