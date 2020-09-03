
module.exports = {
    
    age( timestamp ) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if ( month <= 0 && today.getDate() < birthDate.getDate() ) { 
            --age
        }

        return age
    },

    graduation(education_level) {
        let formation = ""

        if (education_level == "medium") {
            formation = "Ensino Médio Completo"

        } else if (education_level == "graduation") {
            formation = "Ensino Superior Completo"

        } else if (education_level == "master") {
            formation = "Mestrado"

        } else {
            formation = "Doutorado"
        }

        return formation
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
    },

    grade(school_year){
        let formation = ""

        if (school_year == "5 elementary School") {
            formation = "5º ano do ensino fundamental"

        } else if (school_year == "6 elementary School") {
            formation = "6º ano do ensino fundamental"

        } else if (school_year == "7 elementary School") {
            formation = "7º ano do ensino fundamental"

        } else if (school_year == "8 elementary School") {
            formation = "8º ano do ensino fundamental"

        } else if (school_year == "9 elementary School") {
            formation = "9º ano do ensino fundamental"

        } else if (school_year == "1 high school") {
            formation = "1º ano do ensino médio"

        } else if (school_year == "2 high school") {
            formation = "2º ano do ensino médio"

        } else if (school_year == "3 high school") {
            formation = "3º ano do ensino médio"
        }
        
        return formation
    },

    checkEmptyFields(currentUser){
        
        const keys = Object.keys(currentUser)

        for (let key of keys) {
            if(currentUser[key] == "") 
                return true
        }
    },

    ArraysTeachers(_teachers){
        const teachers = []

            for( teacher of _teachers ){
                teachers.push(
                    {
                        ...teacher,
                        occupation_area: teacher.occupation_area.split(",")
                    })        
            }

            return teachers
    }
}
