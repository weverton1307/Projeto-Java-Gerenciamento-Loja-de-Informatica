
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
                    <td class='linha'>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td class='linha'>${cliente.endereco}</td>
                    <td class='linha'>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.email}</td>
                    <td class='linha'>${cliente.total_compras || 'N/A'}</td>
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
    //Função para carregar os dados do cliente na tabela
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

        document.getElementById("alterarCliente").hidden = false;
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
    document.getElementById("alterarCliente").hidden = true;
}

// Esconde o botão alterar
$(document).ready(function () {
    document.getElementById("alterarCliente").hidden = true;
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
                document.getElementById("alterarCliente").hidden = false;
            },
            error: function (xhr) {
                var errorMessage = "Busca inválida! Por favor, tente novamente.";
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
                alert("Atualização inválida! Por favor, tente novamente.");
            }
        });
    });
});

// PÁGINA PARA CADASTRAR FUNCIONÁRIOS
//Função para cadastrar funcionário
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
        if (formData.usuario.login === "") {
            alert("Por favor, preencha o campo nome de usuário.");
            return;
        }
        if (formData.usuario.senha === "") {
            alert("Por favor, preencha o campo senha.");
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
        if (formData.cargo.nome === "Selecione um item") {
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

// PÁGINA PARA PESQUISAR FUNCIONÁRIOS
// Esconde o botão alterar
$(document).ready(function () {
    document.getElementById("alterarFuncionario").hidden = true;
});

// Função para listar os funcionários
$(document).ready(function () {
    function listarFuncionarios() {
        $.ajax({
            type: "GET",
            url: "/listar-funcionarios",
            dataType: "json",
            success: function (funcionarios) {
                $("#tabela-funcionario").empty();
                funcionarios.forEach(function (funcionario) {
                    var ultimoLoginFormatado = "";

                    if (funcionario.usuario.ultimo_login) {
                        var data = new Date(funcionario.usuario.ultimo_login + "T00:00:00");
                        ultimoLoginFormatado = data.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    }
                    var linha = "<tr class='linha-funcionario' data-id='" + funcionario.id + "'>" +
                        "<td class='linha'>" + funcionario.id + "</td>" +
                        "<td>" + funcionario.nome + "</td>" +
                        "<td class='linha'>" + funcionario.endereco + "</td>" +
                        "<td class='linha'>" + funcionario.email + "</td>" +
                        "<td>" + funcionario.cargo.nome + "</td>" +
                        "<td>" + funcionario.telefone + "</td>" +
                        "<td class='linha'>" + funcionario.cpf + "</td>" +
                        "<td class='linha'>" + funcionario.usuario.tipoUsuario + "</td>" +
                        "<td class='linha'>" + ultimoLoginFormatado + "</td>" +
                        "</tr>";

                    $("#tabela-funcionario").append(linha);
                });
            },
            error: function (xhr, status, error) {
                alert("Erro ao carregar dados dos funcionários: " + error);
            }
        });
    }

    listarFuncionarios();

    // Função para preencher os campos com os dados do funcionário ao clicar na linha da tabela
    $("#tabela-funcionario").on("click", "tr.linha-funcionario", function () {

        limparCampos();

        let id = $(this).find("td").eq(0).text();
        let nome = $(this).find("td").eq(1).text();
        let endereco = $(this).find("td").eq(2).text();
        let email = $(this).find("td").eq(3).text();
        let cargo = $(this).find("td").eq(4).text();
        let telefone = $(this).find("td").eq(5).text();
        let cpf = $(this).find("td").eq(6).text();

        $("#funcionarioId").val(id);
        $("#nomeFuncionario").val(nome);
        $("#endereço").val(endereco);
        $("#email").val(email);
        $("#telefone").val(telefone);
        $("#cpf").val(cpf);
        $("#cargoFuncionario").val(cargo);
        document.getElementById("alterarFuncionario").hidden = false;
    });

    // Função para limpar os campos da página
    window.limparCampos = function limparCampos() {
        document.getElementById("alterarFuncionario").hidden = true;
        document.getElementById('nomeFuncionario').value = '';
        document.getElementById('endereço').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('nomeUsuario').value = '';
        document.getElementById('senha-funcionario').value = '';
        document.getElementById('funcionarioId').value = '';
        document.getElementById('cargoFuncionario').value = 'Selecione um item';
        document.getElementById('pesquisar').value = '';
    };

    document.getElementById('limpar').addEventListener('click', limparCampos);
});

//Função para pesquisar funcionário cadastrado
function buscarFuncionario(event) {
    event.preventDefault();
    document.getElementById("alterarFuncionario").hidden = false;
    var id = $("#pesquisar").val().trim();
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-funcionario",
            method: "GET",
            data: { id: id },
            dataType: "json",
            success: function (data) {

                $("#nomeFuncionario").val(data.nome);
                $("#endereço").val(data.endereco);
                $("#cpf").val(data.cpf);
                $("#telefone").val(data.telefone);
                $("#email").val(data.email);
                $("#cargoFuncionario").val(data.cargo.nome);
                $("#nomeUsuario").val(data.usuario.login);
                $("#senha-funcionario").val(data.usuario.senha);
                $("#funcionarioId").val(data.id);
            },
            error: function (xhr) {
                var errorMessage = "Busca inválida! Por favor, tente novamente.";
                limparCampos();
                if (xhr.status === 404) {
                    errorMessage = "Funcionário não encontrado.";
                    limparCampos();
                }
                alert(errorMessage);
            }
        });
    } else {
        alert("Por favor, insira um ID válido para o funcionário.");
        limparCampos();
    }
}

$(document).ready(function () {
    $("#alterarFuncionario").click(function (event) {
        event.preventDefault();
        const formData = {
            nome: $("#nomeFuncionario").val().trim(),
            endereco: $("#endereço").val().trim(),
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

        $.ajax({
            type: "PUT",
            url: "/atualizar-funcionario",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Funcionário atualizado com sucesso!");
                window.location.href = "/pesquisarFuncionarios";
            },
            error: function (xhr, status, error) {
                alert("Atualização inválida! Por favor, tente novamente. ");
            }
        });
    });
});

//PÁGINA DE REGISTRAR DEVOLUÇÃO
//Função para cadastrar devolucao
$(document).ready(function () {
    $("#salvarDevolucao").click(function (event) {
        event.preventDefault();

        const formData = {
            codigoProduto: $("#codigo-devolucao").val().trim(),
            motivo: $("#motivo-devolucao").val().trim(),
            tipo: "Devolução",
            data: $("#data-devolucao").val().trim(),
            id: $("#devolucaoId").val() ? parseInt($("#devolucaoId").val()) : null,
            nome_produto: $("#NomeProdutoDevolucao").val() ? parseInt($("#NomeProdutoDevolucao").val()) : null
        };

        console.log("Form Data:", formData);

        if (formData.codigoProduto === "") {
            alert("Por favor, preencha o campo código do produto.");
            return;
        }

        if (!/^\d+$/.test(formData.codigoProduto) || parseInt(formData.codigoProduto) === 0) {
            alert("O código do produto deve conter apenas números inteiros positivos maiores que zero.");
            return;
        }

        if (formData.motivo === "") {
            alert("Por favor, preencha o campo motivo.");
            return;
        }

        if (formData.data === "") {
            alert("Por favor, preencha o campo data.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/cadastro-devolucao",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Devolução realizada com sucesso!");
                window.location.href = "/registrarDevolucao";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

//PÁGINA DE PESQUISAR DEVOLUÇÃO
//Esconde o botão alterar
$(document).ready(function () {
    document.getElementById("alterarDevolucao").hidden = true;
});

//função para listar a tabela de devolução
$(document).ready(function () {
    function listarDevolucao() {
        limparCamposDevolucao();
        $.ajax({
            type: "GET",
            url: "/listar-devolucao",
            dataType: "json",
            success: function (devolucao) {
                $("#tabela-devolucao").empty();
                devolucao.forEach(function (item) {
                    var dataFormatada = "";

                    if (item.data) {
                        var data = new Date(item.data);
                        dataFormatada = data.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    }
                    console.log("Form Data:", item.motivo);
                    var linha = `
                        <tr class='linha-devolucao' data-id='${item.id}'>
                            <td class='linha'>${item.id}</td>
                            <td >${item.motivo}</td>
                            <td> ${item.nome_produto} </td>
                            <td>${item.codigoProduto}</td>
                            <td class="linha">${dataFormatada}</td>
                        </tr>
                    `;
                    $("#tabela-devolucao").append(linha);
                });
            },
            error: function (xhr, status, error) {
                alert("Erro ao carregar dados das devoluções: " + error);
            }
        });
    }
    listarDevolucao();

    //Função para preencher os campos com os dados da devolução ao clicar na linha da tabela
    $("#tabela-devolucao").on("click", "tr.linha-devolucao", function () {
        var id = $(this).find("td").eq(0).text();
        var codigoProduto = $(this).find("td").eq(3).text();
        var motivo = $(this).find("td").eq(1).text();
        var nomeProduto = $(this).find("td").eq(2).text();
        var data = $(this).find("td").eq(4).text();

        var dataConvertida = data.split('/').reverse().join('-');

        $("#devolucaoId").val(id);
        $("#codigo-devolucao").val(codigoProduto);
        $("#motivo-devolucao").val(motivo);
        $("#data-devolucao").val(dataConvertida);
        $("#alterarDevolucao").show();
    });
});

//Função para limpar os campos da página
function limparCamposDevolucao() {
   $("#alterarDevolucao").hide();
    document.getElementById('codigo-devolucao').value = '';
    document.getElementById('motivo-devolucao').value = '';
    document.getElementById('data-devolucao').value = '';
    document.getElementById('pesquisarDevolucaoId').value = '';
}

//Função para pesquisar devolução
function buscarDevolucao(event) {
    event.preventDefault();
    $("#alterarDevolucao").show();
    var id = $("#pesquisarDevolucaoId").val().trim();
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-devolucao",
            method: "GET",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                $("#devolucaoId").val(data.id);
                $("#codigo-devolucao").val(data.codigoProduto);
                $("#motivo-devolucao").val(data.motivo);
                $("#data-devolucao").val(data.data);
            },
            error: function (xhr, status, errorThrown) {
                var errorMessage = "Busca inválida! Por favor, tente novamente.";
                if (xhr.status === 404) {
                    errorMessage = "Devolução não encontrada.";
                }
                alert(errorMessage);
                limparCamposDevolucao();
            }
        });
    } else {
        alert("Por favor, insira um ID válido para a devolução.");
        limparCamposDevolucao();
    }
}
//Função para atualizar dados de uma devolução cadastrada
$(document).ready(function () {
    $("#alterarDevolucao").click(function (event) {
        event.preventDefault();
        const formData = {
            codigoProduto: $("#codigo-devolucao").val().trim(),
            motivo: $("#motivo-devolucao").val().trim(),
            tipo: "Devolução",
            data: $("#data-devolucao").val().trim(),
            id: $("#devolucaoId").val() ? parseInt($("#devolucaoId").val()) : null
        };

        console.log("Form Data:", formData);
        if (formData.codigoProduto === "") {
            alert("Por favor, preencha o campo código do produto.");
            return;
        }

        if (!/^\d+$/.test(formData.codigoProduto) || parseInt(formData.codigoProduto) === 0) {
            alert("O código do produto deve conter apenas números inteiros positivos maiores que zero.");
            return;
        }

        if (formData.motivo === "") {
            alert("Por favor, preencha o campo motivo.");
            return;
        }

        if (formData.data === "") {
            alert("Por favor, preencha o campo data.");
            return;
        }

        $.ajax({
            type: "PUT",
            url: "/atualizar-devolucao",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Devolução atualizada com sucesso!");
                window.location.href = "/pesquisarDevolucao";
            },
            error: function (xhr, status, errorThrown) {
                alert("Atualização inválida! Por favor, tente novamente. ");
                limparCamposDevolucao();
            }
        });
    });
});
// PÁGINA REGISTRAR TROCA
// Função para registrar uma troca de produto
$(document).ready(function () {
    $("#salvarTroca").click(function (event) {
        event.preventDefault();
        const formData = {
            codigoProduto: $("#codigo-troca").val().trim(),
            motivo: $("#motivo-troca").val().trim(),
            tipo: "Troca",
            data: $("#data-troca").val().trim(),
            id: $("#trocaId").val() ? parseInt($("#trocaId").val()) : null
        };
        console.log("Form Data:", formData);
        if (formData.codigoProduto === "") {
            alert("Por favor, preencha o campo código do produto.");
            return;
        }

        if (!/^\d+$/.test(formData.codigoProduto) || parseInt(formData.codigoProduto) === 0) {
            alert("O código do produto deve conter apenas números inteiros positivos maiores que zero.");
            return;
        }

        if (formData.motivo === "") {
            alert("Por favor, preencha o campo motivo.");
            return;
        }

        if (formData.data === "") {
            alert("Por favor, preencha o campo data.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/cadastro-troca",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                console.log("Resposta do servidor:", response);
                alert("troca realizada com sucesso!");
                location.reload();
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

// PÁGINA PESQUISAR TROCA
//Esconde o botão alterar
$(document).ready(function () {
    $("#alterarTroca").hide();
});

// Função para listar trocas
$(document).ready(function () {
    function listarTroca() {
        $.ajax({
            type: "GET",
            url: "/listar-troca",
            dataType: "json",
            success: function (troca) {

                $("#tabela-troca").empty();

                troca.forEach(function (item) {
                    var dataFormatada = "";

                    if (item.data) {
                        var data = new Date(item.data);
                        dataFormatada = data.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    }

                    var linha = `
                        <tr class='linha-troca' data-id='${item.id}'>
                            <td class="linha">${item.id}</td>
                            <td >${item.codigoProduto}</td>
                            <td>${item.motivo}</td>
                            <td>${item.nome_produto}</td>
                            <td class="linha">${dataFormatada}</td>
                        </tr>
                    `;
                    $("#tabela-troca").append(linha);
                });
            },
            error: function (xhr, status, error) {
                alert("Erro ao carregar dados das trocas: " + error);
            }
        });
    }

    listarTroca();
    //Função para preencher os campos com os dados da troca ao clicar na linha da tabela
    $("#tabela-troca").on("click", "tr.linha-troca", function () {
        var id = $(this).find("td").eq(0).text();
        var codigoProduto = $(this).find("td").eq(1).text();
        var motivo = $(this).find("td").eq(2).text();
        var tipo = $(this).find("td").eq(3).text();
        var data = $(this).find("td").eq(4).text();

        var dataConvertida = data.split('/').reverse().join('-');

        $("#trocaId").val(id);
        $("#codigo-troca").val(codigoProduto);
        $("#motivo-troca").val(motivo);
        $("#data-troca").val(dataConvertida);

        $("#alterarTroca").show();
    });

});

//Função para limpar os campos da página
function limparCamposTroca() {
    $("#alterarTroca").hide();
    document.getElementById('pesquisar-trocaCodigo').value = '';
    document.getElementById('codigo-troca').value = '';
    document.getElementById('motivo-troca').value = '';
    document.getElementById('data-troca').value = '';
}
//Função para pesquisar uma troca cadastrada
function buscarTroca(event) {
    event.preventDefault();
    var id = $("#pesquisar-trocaCodigo").val().trim();

    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-troca",
            method: "GET",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                $("#trocaId").val(data.id);
                $("#codigo-troca").val(data.codigoProduto);
                $("#motivo-troca").val(data.motivo);
                $("#data-troca").val(data.data);
                $("#alterarTroca").show();
            },
            error: function (xhr, status, errorThrown) {
                var errorMessage = "Busca inválida! Por favor, tente novamente.";
                if (xhr.status === 404) {
                    errorMessage = "Troca não encontrada.";
                }
                alert(errorMessage);
                limparCamposTroca();
            }
        });
    } else {
        alert("Por favor, insira um ID válido para a troca.");
        limparCamposTroca();
    }
}

