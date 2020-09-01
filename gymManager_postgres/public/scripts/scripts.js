const currentPage = location.pathname /*pega a URL da página atual*/
const menuItems = document.querySelectorAll("header .links a")

for (const item of menuItems) {
    /* verifica se a página atual tem uma substring igual a '/instructor' ou '/members'*/
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function pagination(totalPage, selectedPage) {

    let pages = []
    let oldPage

    for( let currentPage = 1; currentPage <= totalPage; currentPage++ ){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPage
        const pagesAfterSelectedPage = currentPage <= (selectedPage + 2)
        const pagesBeforeSelectedPage = currentPage >= (selectedPage - 2)

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}
