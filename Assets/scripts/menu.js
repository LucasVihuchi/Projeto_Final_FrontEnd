const menuModal = document.querySelector('.menu-modal-mobile');

abreModal();
fechaModal();

function abreModal() { 
    const menuButton = document.querySelector('.menu-open');
    menuButton.addEventListener('click', () => {       
        menuModal.classList.remove('menu-modal-mobile-oculto');
    });
}

function fechaModal() {
    const closeButton = document.querySelector('.menu-close');
    closeButton.addEventListener('click', () => {
        menuModal.classList.add('menu-modal-mobile-oculto');
    });
}