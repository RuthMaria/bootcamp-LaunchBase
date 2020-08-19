
module.exports = {
    age: function ( timestamp ) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if ( month <= 0 && today.getDate() < birthDate.getDate() ) { // getDate pega o dia do mês
            age = age - 1
        }

        return age
    },

    date: function ( timestamp ) {
        const date = new Date(timestamp)

        // UTC pega o tempo universal, sem se preocupar com a localização, evita bugs
        const year = date.getUTCFullYear() 
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // soma 1 porque o mês vai de 0 á 11
        const day = `0${date.getUTCDate()}`.slice(-2) // slice pegará só os dois últimos dígitos

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`, // esse formato de retorno da data é de acordo com o tipo iso
            birthDay: `${day}/${month}`
        } 
    }    
}