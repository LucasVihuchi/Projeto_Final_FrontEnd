let menuModal;

carregaModal();
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
    const sectionMenuItem = document.querySelectorAll('.menu-item-mobile-section');
    closeButton.addEventListener('click', () => {
        menuModal.classList.add('menu-modal-mobile-oculto');
    });
    sectionMenuItem.forEach((item) => {
        item.addEventListener('click', () => {
            menuModal.classList.add('menu-modal-mobile-oculto');
        });
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function carregaModal() {
    do {
        await sleep(100);
        menuModal = document.querySelector('.menu-modal-mobile');
    } while(menuModal == null);
}