
 
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
   
   async function printAll(){
     console.log(await printDouble(5))
     console.log(await printDouble(10))
     console.log(await printDouble(22))
     console.log(await printDouble(1))
     console.log(await printDouble(89))
   }
   
   printAll()
  

  