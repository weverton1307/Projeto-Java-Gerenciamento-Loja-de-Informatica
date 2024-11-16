document.addEventListener("DOMContentLoaded", function () {
    let nomeUsuario = document.getElementById("boasVindasNome").value;
    let tipoUsuario = document.getElementById("boasVindasTipo").value;

    if (nomeUsuario && tipoUsuario) {
        alert("Olá, " + nomeUsuario + "! Sua permissão é de " + tipoUsuario + ". Seja bem-vindo!");
    }
});
$("#alterarFuncionario").prop("disabled", true);

$(document).ready(function () {
    $("#salvarFuncionario").click(function (event) {
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
            type: "POST",
            url: "/funcionarios",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Funcionário cadastrado com sucesso!");
                window.location.href = "/funcionarios";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});


function buscarFuncionario(event) {
    event.preventDefault();

    var id = $("#pesquisar").val().trim();
    $("#alterarFuncionario").prop("disabled", false);
    $("#salvarFuncionario").prop("disabled", true);
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-funcionario",
            method: "GET",
            data: { id: id },
            dataType: "json", // Garantir que o retorno seja interpretado como JSON
            success: function (data) {
                // Preenche o formulário com os dados do funcionário
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
                var errorMessage = "Erro ao buscar funcionário.";
                if (xhr.status === 404) {
                    errorMessage = "Funcionário não encontrado.";
                }
                alert(errorMessage);
            }
        });
    } else {
        alert("Por favor, insira um ID válido para o funcionário.");
    }
}



document.addEventListener('DOMContentLoaded', function () {
    function limparCampos() {
        $("#alterarFuncionario").prop("disabled", true);
        $("#salvarFuncionario").prop("disabled", false);
        document.getElementById('nomeFuncionario').value = '';
        document.getElementById('endereço').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('nomeUsuario').value = '';
        document.getElementById('senha-funcionario').value = '';
        document.getElementById('funcionarioId').value = '';
        document.getElementById('cargoFuncionario').value = 'Selecione um item';

        // NÃO limpar o campo de pesquisa para permitir busca consecutiva
    }

    document.getElementById('limpar').addEventListener('click', limparCampos);
   
});

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
            url: "/atualizar-fubcionario",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Funcionário atualizado com sucesso!");
                window.location.href = "/funcionarios";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});






