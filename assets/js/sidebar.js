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
}

function renderCategoryList() {

  let list = document.getElementById('categoryList')

  data.categories.forEach((category) => {
    let item = document.createElement('li')
    item.id = 'cat' + category.id
    item.classList.add("list-group-item", "list-group-item-action")
    item.innerText = category.name
    list.appendChild(item)
  })
}