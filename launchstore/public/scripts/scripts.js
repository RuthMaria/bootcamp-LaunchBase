
const Mask = {
    apply(input, func){
        setTimeout(function () {
            input.value = Mask[func](input.value) // mesma coisa que Mask.formatBRL.value
        }, 1)
    },

    formatBRL(value){
        value = value.replace(/\D/g, "") // Expressão regular que retira tudo o que não for número de forma global

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}