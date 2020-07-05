/* Crie um programa para calcular a aposentadoria de uma pessoa. 

Regras:
    O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
    Utilizando a regra 85-95, a soma da age com o tempo de contribuição do homem precisa 
    ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma;
*/

const name = "Ruth";
const sex = "F";
const age = 48;
const contribution = 40;

calculateContribution = age + contribution

retireMan = (sex == "M" && contribution >= 35 && calculateContribution >= 95)
retireWoman = (sex == "F" && contribution >= 30 && calculateContribution >= 85)

if (retireMan || retireWoman) {
        console.log(`${name}, you can retire!`)
} else {
    console.log(`${name}, you still can't retire!`)
}