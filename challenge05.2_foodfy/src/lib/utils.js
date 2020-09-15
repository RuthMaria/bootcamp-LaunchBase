    
module.exports = { 
    
    checkEmptyFields(currentUser){
    
        const keys = Object.keys(currentUser)

        for (let key of keys) {
            if(currentUser[key] == "") 
                return true
        }
    },

    date(){

        const todayDate = new Date()
    
        const year = todayDate.getUTCFullYear()
        const month = `0${todayDate.getUTCMonth() + 1}`.slice(-2)
        const day = `0${todayDate.getUTCDate()}`.slice(-2)
    
        return {
            day, 
            month, 
            year, 
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`            
        }
    },
}