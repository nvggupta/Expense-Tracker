const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    hamburgerMenu.addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });