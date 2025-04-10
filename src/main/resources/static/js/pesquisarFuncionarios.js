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
