
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

// PÁGINA INICIAL
// Função parar limpar os campos de login
function limparLogin() {
    document.getElementById('login-usuario').value === "";
    document
}
// Função para exibir mensagem de saudação ao usuário 
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

//PÁGINA PARA CADASTRAR CLIENTES
// Função para cadastrar um cliente
$(document).ready(function () {
    $("#salvarCliente").click(function (event) {
        event.preventDefault();

        const formData = {
            nome: $("#nomeCliente").val().trim(),
            endereco: $("#enderecoCliente").val().trim(),
            cpf: $("#cpfCliente").val().trim(),
            telefone: $("#telefoneCliente").val(),
            email: $("#emailCliente").val(),
            id: $("#clienteId").val() ? parseInt($("#clienteId").val()) : null
        };

        if (formData.nome === "") {
            alert("Por favor, preencha o campo nome.");
            return;
        }
        if (formData.endereco === "") {
            alert("Por favor, preencha o campo endereço.");
            return;
        }
        if (formData.cpf === "") {
            alert("Por favor, preencha o campo CPF.");
            return;
        }
        if (formData.telefone === "") {
            alert("Por favor, preencha o campo Telefone.");
            return;
        }
        const telefoneRegex = /^\(\d{2}\)\d{4}-\d{4}$/;
        if (!telefoneRegex.test(formData.telefone)) {
            alert("Por favor, insira um telefone válido no formato (xx)xxxx-xxxx.");
            return;
        }

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(formData.cpf)) {
            alert("Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx.");
            return;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

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

//PÁGINA PARA PESQUISAR CLIENTES
// Função para listar os clientes
$(document).ready(function () {
    function listarClientes() {
        $.ajax({
            type: "GET",
            url: "/listar-clientes",
            dataType: "json",
            success: function (clientes) {

                $("#tabela-cliente").empty();
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
    listarClientes();

    $(document).on("click", "#tabela-cliente tr.linha-Cliente", function () {
        var id = $(this).find("td").eq(0).text();
        var nome = $(this).find("td").eq(1).text();
        var endereco = $(this).find("td").eq(2).text();
        var cpf = $(this).find("td").eq(3).text();
        var telefone = $(this).find("td").eq(4).text();
        var email = $(this).find("td").eq(5).text();

        $("#clienteId").val(id);
        $("#nomeCliente").val(nome);
        $("#enderecoCliente").val(endereco);
        $("#cpfCliente").val(cpf);
        $("#telefoneCliente").val(telefone);
        $("#emailCliente").val(email);

        document.getElementById("alterarCliente").hidden=false;
    });
});

// Função para limpar os campos da página pesquisarClientes
function limparCamposCliente() {
    $("#alterarCliente").prop("disabled", true);
    document.getElementById('nomeCliente').value = '';
    document.getElementById('enderecoCliente').value = '';
    document.getElementById('cpfCliente').value = '';
    document.getElementById('telefoneCliente').value = '';
    document.getElementById('emailCliente').value = '';
    document.getElementById("alterarCliente").hidden=true;
}

// Esconde o botão alterar
$(document).ready(function () {
   document.getElementById("alterarCliente").hidden=true;
});

// Função para buscar um cliente
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
        if (formData.nome === "") {
            alert("Por favor, preencha o campo nome.");
            return;
        }
        if (formData.endereco === "") {
            alert("Por favor, preencha o campo endereço.");
            return;
        }
        if (formData.cpf === "") {
            alert("Por favor, preencha o campo CPF.");
            return;
        }
        if (formData.telefone === "") {
            alert("Por favor, preencha o campo Telefone.");
            return;
        }
        const telefoneRegex = /^\(\d{2}\)\d{4}-\d{4}$/;
        if (!telefoneRegex.test(formData.telefone)) {
            alert("Por favor, insira um telefone válido no formato (xx)xxxx-xxxx.");
            return;
        }

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(formData.cpf)) {
            alert("Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx.");
            return;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
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

// PÁGINA PARA CADASTRAR FUNCIONÁRIOS
$(document).ready(function () {
    $("#salvarFuncionario").click(function (event) {
        event.preventDefault();
        const formData = {
            nome: $("#nomeFuncionario").val().trim(),
            endereco: $("#endereco").val().trim(),
            cpf: $("#cpf").val().trim(),
            telefone: $("#telefone").val(),
            email: $("#email").val(),
            cargo: {
                nome: $("#cargoFuncionario").val(),
            },
            usuario: {
                login: $("#nomeUsuario").val(),
                senha: $("#senha-funcionario").val(),
                tipoUsuario: $("#cargoFuncionario").val()
            },
            id: $("#funcionarioId").val() ? parseInt($("#funcionarioId").val()) : null
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
        if(formData.usuario.login ===""){
            alert("Por favor, preencha o campo nome de usuário.");
            return; 
        }
        if(formData.usuario.senha ===""){
            alert("Por favor, preencha o campo senha.");
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
        if(formData.cargo.nome === "Selecione um item"){
            alert("Por favor, selecione um cargo.");
            return;   
        }
        
        $.ajax({
            type: "POST",
            url: "/processarFormulario",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Funcionário cadastrado com sucesso!");
                window.location.href = "/cadastrarFuncionario";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});