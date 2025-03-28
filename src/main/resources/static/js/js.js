// Tela inicial
document.addEventListener("DOMContentLoaded", function () {
    let nomeUsuario = document.getElementById("boasVindasNome").value;
    let tipoUsuario = document.getElementById("boasVindasTipo").value;

    if (nomeUsuario && tipoUsuario) {
        alert("Olá, " + nomeUsuario + "! Sua permissão é de " + tipoUsuario + ". Seja bem-vindo!");
    }
    if(tipoUsuario === "Vendedor") {
        let elementosAdm = document.querySelectorAll('.adm');
        elementosAdm.forEach(function(elemento) {
            elemento.style.display = 'none';
        });
    }
});

// Abrir e fechar menu para telas menores
document.addEventListener('DOMContentLoaded', function () {
    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overLay = document.getElementById('overlay-menu');

    btnMenu.addEventListener('click', () => {
        menu.classList.add('abrir-menu');
    });

    menu.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
    });

    overLay.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
    });
});

// Página de pesquisar Produtos

// Esconder tags de pesquisa
document.getElementById('categoriaProduto').hidden = true;

