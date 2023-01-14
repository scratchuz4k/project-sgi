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