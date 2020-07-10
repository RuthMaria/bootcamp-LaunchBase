
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