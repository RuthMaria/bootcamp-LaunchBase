const currentPage = location.pathname
const hide = document.querySelectorAll('.hide')
const content = document.querySelectorAll('.information')
let = 0

const menuItemsUser = document.querySelectorAll('.menu a')
const menuItemsAdmin = document.querySelectorAll('#links a')

function selectedMenu(menuItems){
    for (let item of menuItems) {
        if (currentPage.includes(item.getAttribute('href'))) {
            item.classList.add('active')
        }
    }
}

selectedMenu(menuItemsUser)
selectedMenu(menuItemsAdmin)

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

function addIngredient() {
    const ingredients = document.querySelector(".ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
    
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
      true
    );
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = ""; 
    ingredients.appendChild(newField);
  }
  
  document.querySelector(".add-ingredient").addEventListener("click", addIngredient);

function addPreparation() {
    const preparations = document.querySelector(".preparations");
    const fieldContainer = document.querySelectorAll(".preparation");
    
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
        true
    );
    
    if (newField.children[0].value == "") return false;
    
    newField.children[0].value = ""; 
    preparations.appendChild(newField);
    }
    
    document.querySelector(".add-preparation").addEventListener("click", addPreparation);

    