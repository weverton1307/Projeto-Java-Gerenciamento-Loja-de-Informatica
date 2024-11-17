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
//clientes
$("#alterarCliente").prop("disabled", true);
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


        console.log("Form Data:", formData);

        $.ajax({
            type: "POST",
            url: "/cadastro-cliente",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Cliente cadastrado com sucesso!");
                window.location.href = "/clientes";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});
// Função para buscar um cliente
function buscarCliente(event) {
    event.preventDefault();

    var id = $("#pesquisar").val().trim();
    $("#alterarCliente").prop("disabled", false);
    $("#salvarCliente").prop("disabled", true);
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-cliente",
            method: "GET",
            data: { id: id },
            dataType: "json", 
            success: function (data) {

                $("#nomeCliente").val(data.nome);
                $("#enderecoCliente").val(data.endereco);
                $("#cpfCliente").val(data.cpf);
                $("#telefoneCliente").val(data.telefone);
                $("#emailCliente").val(data.email);
            },
            error: function (xhr) {
                var errorMessage = "Erro ao buscar cliente.";
                if (xhr.status === 404) {
                    errorMessage = "Cliente não encontrado.";
                }
                alert(errorMessage);
            }
        });
    } else {
        alert("Por favor, insira um ID válido para o funcionário.");
    }
}


    function limparCamposCliente() {
        $("#alterarCliente").prop("disabled", true);
        $("#salvarCliente").prop("disabled", false);
        document.getElementById('nomeCliente').value = '';
        document.getElementById('enderecoCliente').value = '';
        document.getElementById('cpfCliente').value = '';
        document.getElementById('telefoneCliente').value = '';
        document.getElementById('emailCliente').value = '';
    }

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
    
            $.ajax({
                type: "PUT",
                url: "/atualizar-Cliente",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (response) {
                    alert("Cliente atualizado com sucesso!");
                    window.location.href = "/clientes";
                },
                error: function (xhr, status, error) {
                    alert("Ocorreu um erro: " + xhr.responseText);
                }
            });
        });
    });
//Devolução
limparCamposDevolucao();
$("#alterarDevolucao").prop("disabled", true);
$("#excluirDevolucao").prop("disabled", true);
$(document).ready(function () {
    $("#salvarDevolucaoOuTroca").click(function (event) {
        event.preventDefault();
        const formData = {
            codigoProduto: $("#codigo-devolucao").val().trim(),
            motivo: $("#motivo-devolucao").val().trim(),
            tipo: "Devolução",
            data: $("#data-devolucao").val().trim(),
            id: $("#devolucaoId").val() ? parseInt($("#devolucaoId").val()) : null
        };


        console.log("Form Data:", formData);

        $.ajax({
            type: "POST",
            url: "/cadastro-devolucao",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Devolução realizada com sucesso!");
                window.location.href = "/devolucao";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

function buscarDevolucao(event) {
    event.preventDefault();

    var id = $("#pesquisar-devolucaoOuTroca").val().trim();
    $("#alterarDevolucao").prop("disabled", false);
    $("#excluirDevolucao").prop("disabled", false);
    $("#salvarDevolucaoOuTroca").prop("disabled", true);
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-devolucao",
            method: "GET",
            data: { id: id },
            dataType: "json", 
            success: function (data) {

                $("#codigo-devolucao").val(data.codigoProduto);
                $("#motivo-devolucao").val(data.motivo);
                $("#data-devolucao").val(data.data);
            },
            error: function (xhr) {
                var errorMessage = "Erro ao buscar devolucao.";
                if (xhr.status === 404) {
                    errorMessage = "Devolução não encontrada.";
                }
                alert(errorMessage);
            }
        });
    } else {
        alert("Por favor, insira um ID válido para a devolução.");
    }
}

function limparCamposDevolucao() {
    $("#alterarDevolucao").prop("disabled", true);
    $("#excluirDevolucao").prop("disabled", true);
    $("#salvarDevolucaoOuTroca").prop("disabled", false);
    document.getElementById('codigo-devolucao').value = '';
    document.getElementById('motivo-devolucao').value = '';
    document.getElementById('data-devolucao').value = '';
}

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

        $.ajax({
            type: "PUT",
            url: "/atualizar-devolucao",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Devolução atualizada com sucesso!");
                window.location.href = "/devolucao";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

$(document).ready(function () {

    $("#excluirDevolucao").click(function (event) {
        event.preventDefault();

        const devolucaoId = $("#devolucaoId").val();

        if (devolucaoId) {
    
            if (confirm("Você tem certeza que deseja excluir esta devolução?")) {

                $.ajax({
                    type: "DELETE",
                    url: "/buscar-excuir",
                    contentType: "application/json",
                    data: JSON.stringify({ id: devolucaoId }),
                    success: function (response) {
                        alert("Devolução excluída com sucesso!");
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        alert("Ocorreu um erro ao excluir a devolução: " + xhr.responseText);
                    }
                });
            }
        } else {
            alert("Nenhuma devolução selecionada para exclusão.");
        }
    });
});
//troca



$("#salvarTroca").click(function () {
    alert("Teste do console");
});





