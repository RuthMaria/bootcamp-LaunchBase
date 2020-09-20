
 
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
   
   async function printAll(){
    result = await printDouble(5, 0)
    console.log(result)
    result = await printDouble(12, result)
    console.log(result)
    result = await printDouble(2, result)
    console.log(result)
   }
   
   printAll()
  

  