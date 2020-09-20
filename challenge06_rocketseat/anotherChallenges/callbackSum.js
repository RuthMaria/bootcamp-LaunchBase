function printNumber (number, sum) {
    return ((number * 2) + sum)
}
  
function printDouble(number, sum, callback){
    setTimeout(() => {
      let result = printNumber(number, sum);
      console.log(result);

      if (callback) 
        callback(result);
    },
    Math.floor(Math.random() * 100) + 1
    )
}


function printAll(){
   
    let callback89 = (result) => printDouble(89, result);
    let callback1 = (result) => printDouble(1, result, callback89);
    let callback22 = (result) => printDouble(22, result, callback1);
    let callback10 = (result) => printDouble(10, result, callback22);
    printDouble(5, 0, callback10);
}

printAll()