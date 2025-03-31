// Tela inicial
function limparLogin() {
    document.getElementById('login-usuario').value === "";
    document
}
document.addEventListener("DOMContentLoaded", function () {
    let nomeUsuario = document.getElementById("boasVindasNome").value;
    let tipoUsuario = document.getElementById("boasVindasTipo").value;

    if (nomeUsuario && tipoUsuario) {
        alert("Olá, " + nomeUsuario + "! Sua permissão é de " + tipoUsuario + ". Seja bem-vindo!");
    }
    if (tipoUsuario === "Vendedor") {
        let elementosAdm = document.querySelectorAll('.adm');
        elementosAdm.forEach(function (elemento) {
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

// Página cadastrar clientes
//clientes
$("#alterarCliente").prop("disabled", true);
$(document).ready(function () {
    $("#salvarCliente").click(function (event) {
        event.preventDefault();

        // Coleta os dados do formulário
        const formData = {
            nome: $("#nomeCliente").val().trim(),
            endereco: $("#enderecoCliente").val().trim(),
            cpf: $("#cpfCliente").val().trim(),
            telefone: $("#telefoneCliente").val(),
            email: $("#emailCliente").val(),
            id: $("#clienteId").val() ? parseInt($("#clienteId").val()) : null
        };

        // Validação dos campos
        if (formData.nome === "") {
            alert("Por favor, preencha o campo nome.");
            return;  // Interrompe a execução, não envia a requisição
        }
        if (formData.endereco === "") {
            alert("Por favor, preencha o campo endereço.");
            return;  // Interrompe a execução
        }
        if (formData.cpf === "") {
            alert("Por favor, preencha o campo CPF.");
            return;  // Interrompe a execução
        }
        if (formData.telefone === "") {
            alert("Por favor, preencha o campo Telefone.");
            return;
        }
        const telefoneRegex = /^\(\d{2}\)\d{4}-\d{4}$/; // Formato esperado: (xx)xxxx-xxxx
        if (!telefoneRegex.test(formData.telefone)) {
            alert("Por favor, insira um telefone válido no formato (xx)xxxx-xxxx.");
            return;  // Interrompe a execução
        }

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato esperado: xxx.xxx.xxx-xx
        if (!cpfRegex.test(formData.cpf)) {
            alert("Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx.");
            return; // Interrompe a execução
        }
        // Validação do e-mail (caso preenchido)
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Por favor, insira um e-mail válido.");
            return;  // Interrompe a execução
        }

        // Se passou em todas as validações, faz a requisição AJAX
        $.ajax({
            type: "POST",
            url: "/cadastrarClientes/salvar",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Cliente cadastrado com sucesso!");
                window.location.href = "/cadastrarClientes"; 
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

