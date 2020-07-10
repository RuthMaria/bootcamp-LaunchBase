
const name = "Ruth";
const weight = 84;
const height = 1.88;

const IMC = weight / (height * height)

if (IMC >= 30) {
    console.log(` ${name}, you are overweight`)
    
} else {
    console.log(` ${name}, you are not overweight`)
}