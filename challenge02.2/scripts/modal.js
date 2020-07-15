const cards = document.querySelectorAll('.card')
const modalContent = document.querySelector('.modal_content')
const modalClose = document.querySelector('.modal_close')

for (let card of cards) {
    card.addEventListener('click', function () {
        modalContent.classList.add('active')
        const figure = card.getAttribute('id')
        modalContent.querySelector('img').src = `${figure}`
        modalContent.querySelector('.recipe_title').innerHTML = card.querySelector('.recipe_title').innerText
        modalContent.querySelector('.author').innerHTML = card.querySelector('.author').innerText

    })
}

modalClose.addEventListener('click', function () {
      modalContent.classList.remove('active')
      modalContent.querySelector('img').src = ''
      modalContent.querySelector('.recipe_title').innerHTML = ''
      modalContent.querySelector('.author').innerHTML = ''
})

