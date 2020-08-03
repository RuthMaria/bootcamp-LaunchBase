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
    }
}