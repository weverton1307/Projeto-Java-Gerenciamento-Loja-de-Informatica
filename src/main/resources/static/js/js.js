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

$(document).ready(function () {
    // Função para listar os clientes
    function listarClientes() {
        $.ajax({
            type: "GET",
            url: "/listar-clientes",
            dataType: "json",
            success: function (clientes) {
                // Limpa a tabela antes de preenchê-la novamente
                $("#tabela-cliente").empty();

                // Itera sobre os clientes retornados e cria as linhas da tabela
                clientes.forEach(function (cliente) {
                    var linha = `
                <tr class='linha-Cliente' data-id='${cliente.id}'>
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.endereco}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.total_compras || 'N/A'}</td>
                </tr>
            `;
                    $("#tabela-cliente").append(linha);
                });
            },
            error: function (xhr, status, error) {
                alert("Erro ao carregar dados dos clientes: " + error);
            }
        });
    }

    // Carrega os clientes ao carregar a página
    listarClientes();

    // Evento para selecionar uma linha da tabela
    $(document).on("click", "#tabela-cliente tr.linha-Cliente", function () {
        var id = $(this).find("td").eq(0).text();
        var nome = $(this).find("td").eq(1).text();
        var endereco = $(this).find("td").eq(2).text();
        var cpf = $(this).find("td").eq(3).text();
        var telefone = $(this).find("td").eq(4).text();
        var email = $(this).find("td").eq(5).text();

        // Preenche os campos do formulário com os dados da linha selecionada
        $("#clienteId").val(id);
        $("#nomeCliente").val(nome);
        $("#enderecoCliente").val(endereco);
        $("#cpfCliente").val(cpf);
        $("#telefoneCliente").val(telefone);
        $("#emailCliente").val(email);

        // Ajusta os botões
        document.getElementById("alterarCliente").hidden=false;
    });
});
function limparCamposCliente() {
    $("#alterarCliente").prop("disabled", true);
    document.getElementById('nomeCliente').value = '';
    document.getElementById('enderecoCliente').value = '';
    document.getElementById('cpfCliente').value = '';
    document.getElementById('telefoneCliente').value = '';
    document.getElementById('emailCliente').value = '';
    document.getElementById("alterarCliente").hidden=true;
}
// Função para buscar um cliente
$(document).ready(function () {
   document.getElementById("alterarCliente").hidden=true;
});


function buscarCliente(event) {
    event.preventDefault();
    var id = $("#pesquisar").val().trim();
    $("#pesquisar").val("");
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-cliente",
            method: "GET",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                    if (!data || Object.keys(data).length === 0) {
                        alert("Cliente não encontrado.");
                        limparCamposCliente();
                        return;
                    }
                $("#clienteId").val(data.id);
                $("#nomeCliente").val(data.nome);
                $("#enderecoCliente").val(data.endereco);
                $("#cpfCliente").val(data.cpf);
                $("#telefoneCliente").val(data.telefone);
                $("#emailCliente").val(data.email);
                document.getElementById("alterarCliente").hidden=false;
            },
            error: function (xhr) {
                var errorMessage = "Erro ao buscar cliente.";
                limparCamposCliente();
                if (xhr.status === 404) {
                    errorMessage = "Cliente não encontrado.";
                }
                alert(errorMessage);
                limparCamposCliente();
            }
        });
    } else {
        alert("Por favor, insira um ID válido para o funcionário.");
        limparCamposCliente();
    }
}
// Função para atualizar cliente
$(document).ready(function () {
    $("#alterarCliente").click(function (event) {
        event.preventDefault();
        const formData = {
            nome: $("#nomeCliente").val().trim(),
            endereco: $("#enderecoCliente").val().trim(),
            cpf: $("#cpfCliente").val().trim(),
            telefone: $("#telefoneCliente").val(),
            email: $("#emailCliente").val(),
            id: $("#clienteId").val() ? parseInt($("#clienteId").val()) : null
        };

        console.log("Form Data:", formData);
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

        $.ajax({
            type: "PUT",
            url: "/atualizar-Cliente",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Cliente atualizado com sucesso!");
                window.location.href = "/pesquisarClientes";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});
