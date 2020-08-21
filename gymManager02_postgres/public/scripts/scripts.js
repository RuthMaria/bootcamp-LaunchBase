const currentPage = location.pathname /*pega a URL da página atual*/
const menuItems = document.querySelectorAll("header .links a")

for (const item of menuItems) {
    /* verifica se a página atual tem uma substring igual a '/instructor' ou '/members'*/
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}
