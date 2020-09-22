
const Mask = {
    apply(input, func){
        setTimeout(function () {
            input.value = Mask[func](input.value) // mesma coisa que Mask.formatBRL(input.value)
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

const PhotosUpload = {

    uploadLimit:6,

    preview: document.querySelector('#photos-preview'),

    handleFileInput(event) {
        const { files: filesList} = event.target
        
        if( PhotosUpload.hasLimit(event) ) return

        // from transforma em array
        Array.from(filesList).forEach(file => {
            const reader = new FileReader() // permite ler arquivo

            // quando o arquivo já estiver pronto para ser lido, ele é executado
            reader.onload = () => {
                const image = new Image() // equivale a tag <img> do html
                image.src = String(reader.result)
                
                const div = PhotosUpload.getContainer(image)
                
                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file) // carrega o arquivo que será lido
        })
    },

    hasLimit(event){
        const { uploadLimit } = PhotosUpload
        const { files: filesList} = event.target

        if(filesList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        return false
    },

    getContainer(image){        
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = () => alert('remover foto')

        div.appendChild(image)
        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },

    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"

        return button
    }
}