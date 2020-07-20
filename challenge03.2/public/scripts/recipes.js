const cards = document.querySelectorAll('.card')
const hide = document.querySelectorAll('.hide')
const datas = document.querySelectorAll('.data')
const content = document.querySelectorAll('.information')
let = 0

for (let i = 0; i < cards.length; i++) {    
    cards[i].addEventListener('click', function () {     
        window.location.href = `/recipes/${i}`
    })
}

for (let element of hide) {
    element.addEventListener('click', function () {  
        if(element.innerText == 'Esconder') {     
                element.innerText = "Mostrar"

                for (const found of content) {
                    if(found.querySelector('.hide').innerText == 'Mostrar')
                        found.querySelector('.data').classList.add('active')
                }
                
        } else {
                element.innerText = "Esconder"

                for (const found of content) {
                    if(found.querySelector('.hide').innerText == 'Esconder')
                        found.querySelector('.data').classList.remove('active')
                }
        }
    })
}
