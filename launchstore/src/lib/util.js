
module.exports = {
    
    date ( timestamp ) {
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
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        } 
    }    
}