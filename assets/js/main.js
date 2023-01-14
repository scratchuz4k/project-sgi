



let quantity = 1

const data = {
    products: [
        { id: 1, img: "./assets/img/products/prod_01.png", collection: "LA REDOUTE INTERIEURS", description: "Móvel tv/hifi em pinho maciço e palhinha, gabin natural", discount: 0.30, price: 1000.00, url: './pages/produto.html', },
        { id: 2, img: "./assets/img/products/prod_02.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel para tv, 180 cm, fachada com relevo, jerem nogueira", discount: 0.2, price: 989.00, url: './pages/produto.html', },
        { id: 3, img: "./assets/img/products/prod_03.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel para tv em folha de carvalho, 3 portas, madria carvalho", discount: 0.2, price: 935.00, url: './pages/produto.html', },
        { id: 4, img: "./assets/img/products/prod_04.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel vintage, ronda nogueira", discount: 0.2, price: 407.00, url: './pages/produto.html', },
        { id: 5, img: "./assets/img/products/prod_05.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel para tv, em carvalho e palhinha, 160 cm, waska carvalho", discount: 0.25, price: 780.00, url: './pages/produto.html', },
        { id: 6, img: "./assets/img/products/prod_06.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel para TV, 2 portas de correr, Wapong", discount: 0.27, price: 989.00, url: './pages/produto.html', },
        { id: 7, img: "./assets/img/products/prod_07.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel para TV/hifi vintage, em nogueira e palhinha, Dalqui", discount: 0.28, price: 1209.00, url: './pages/produto.html', },
        { id: 7, img: "./assets/img/products/prod_08.webp", collection: "LA REDOUTE INTERIEURS", description: "Móvel para TV, carvalho maciço encaixado e aço, Hiba", discount: 0.27, price: 615.00, url: './pages/produto.html', }
    ],
    categories: [
        { id: 1, name: 'Sofás', url: './pages/main.html', },
        { id: 2, name: 'Cadeirões, pufes', url: './pages/main.html' },
        { id: 3, name: 'Tapetes', url: './pages/main.html' },
        { id: 4, name: 'Meas de centro', url: './pages/main.html' },
        { id: 5, name: 'Móveis TV', url: './pages/main.html' },
        { id: 6, name: 'Candeeiros', url: './pages/main.html' },
        { id: 7, name: 'Estantes', url: './pages/main.html' }
    ],
}

function addCarrinho() {
    let carrinho = document.querySelector(".carrinho-icon")
    carrinho.innerHTML = ''
    let div = document.createElement("div")
    div.classList.add("carrinho-amount")
    div.innerHTML = quantity < 10 ? quantity : "9+"
    quantity++
    carrinho.appendChild(div)
    let img = document.createElement("img")
    img.classList.add("header-icon")
    img.src = './assets/img/bag.png'

    carrinho.appendChild(img)
}

function renderProductList() {

    let list = document.getElementById('productList')

    data.products.forEach((product) => {

        let price = product.price.toFixed(2)
        let discount = product.discount
        let discountPercentage = discount * 100
        let finalPrice = (price - (price * discount)).toFixed(2)

        let divCol = document.createElement('div')
        divCol.classList.add("col-sm-12", "col-md-6", "col-lg-4", "col-xl-3", "card")
        list.appendChild(divCol)

        let divLink = document.createElement('div')
        divLink.id = 'prod' + product.id
        divLink.style.cursor = 'pointer'
        divLink.onclick = () => {
            goToUrl(product.url)
        }
        divCol.appendChild(divLink)

        let img = document.createElement('img')
        img.classList.add("card-img-top")
        img.src = product.img
        divLink.appendChild(img)

        let cardBody = document.createElement('div')
        cardBody.classList.add("card-body")
        divLink.appendChild(cardBody)

        let cardTitle = document.createElement('h6')
        cardTitle.classList.add("card-title")
        cardTitle.innerText = product.collection
        cardBody.appendChild(cardTitle)

        let cardText = document.createElement('p')
        cardText.classList.add("card-text")
        cardText.innerText = product.description
        cardBody.appendChild(cardText)

        let cardPrice = document.createElement('p')
        cardPrice.innerHTML = '<span class="card-price">' + price + ' €</span><span class="card-discount">-' + discountPercentage + '%</span>'
        cardBody.appendChild(cardPrice)

        let cardFinalPrice = document.createElement('h5')
        cardFinalPrice.classList.add('card-discounted-price')
        cardFinalPrice.innerText = finalPrice + ' €'
        cardBody.appendChild(cardFinalPrice)
    })
}

function renderCategoryList() {
    let list = document.getElementById('categoryList')
    list.innerHTML = ''
    data.categories.forEach((category) => {
        let item = document.createElement('li')
        item.id = 'cat' + category.id
        item.onclick = () => {
            goBack(category.url)
            toggleSidebar()
        }
        item.classList.add("list-group-item", "list-group-item-action")
        item.innerText = category.name
        list.appendChild(item)
    })
}

function toggleSidebar() {
    let sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

window.onload = function () {
    let burger = document.querySelectorAll('.burger-btn');
    if (burger.length) {
        burger.forEach((e) => {
            e.addEventListener('click', () => {
                toggleSidebar()
            })
        })
    }
    let carrinhoReset = document.querySelector(".carrinho-icon")

    carrinhoReset.addEventListener("click", function () {
        quantity = 0
        addCarrinho()
    })

}

