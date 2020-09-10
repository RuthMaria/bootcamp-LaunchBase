    
module.exports = { 
    
    checkEmptyFields(currentUser){
    
        const keys = Object.keys(currentUser)

        for (let key of keys) {
            if(currentUser[key] == "") 
                return true
        }
    },

    date( timestamp ){

        const birthDate = new Date(timestamp)
    
        const year = birthDate.getUTCFullYear()
        const month = `0${birthDate.getUTCMonth() + 1}`.slice(-2)
        const day = `0${birthDate.getUTCDate()}`.slice(-2)
    
        return {
            day, 
            month, 
            year, 
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`            
        }
    }
}