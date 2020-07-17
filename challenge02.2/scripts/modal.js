const cards = document.querySelectorAll('.card')
const modalContent = document.querySelector('.modal_content')
const modalClose = document.querySelector('.modal_close')

for (let card of cards) {
    card.addEventListener('click', function () {
        const url_figure = card.getAttribute('id')
        const recipe_title = card.querySelector('.recipe_title').innerText
        const author = card.querySelector('.author').innerText

        modalContent.classList.add('active')
        modalContent.querySelector('img').src = url_figure
        modalContent.querySelector('.recipe_title').innerHTML = recipe_title
        modalContent.querySelector('.author').innerHTML = author

    })
}

modalClose.addEventListener('click', function () {
      modalContent.classList.remove('active')
      modalContent.querySelector('img').src = ''
      modalContent.querySelector('.recipe_title').innerHTML = ''
      modalContent.querySelector('.author').innerHTML = ''
})

