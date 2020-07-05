/*Crie um programa que armazena dados da company Rocketseat dentro de um objeto chamado company. Os dados a serem armazenados são:

    name: Rocketseat

    color: Roxo

    focus: Programação

    Endereço:
        street: street Guilherme Gembala
        Número: 260

    saída: A company Rocketseat está localizada em street Guilherme Gembala, 260
 */

const user = {
    name: "Diego",
    company: {
        name: "Rocketseat",
        color: "Roxo",
        focus: "Programação",
        address: {
            street: "street Guilherme Gembala",
            number: "260"
        }
    }
}
 console.log(`The company ${user.company.name} is localized in ${user.company.address.street}, ${user.company.address.number}`)

