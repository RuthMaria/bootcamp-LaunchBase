
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function () {
        const course = card.getAttribute('id')
        window.location.href = `/courses/${course}` 
    })
}

