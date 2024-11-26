document.addEventListener("DOMContentLoaded", function () {
    let nomeUsuario = document.getElementById("boasVindasNome").value;
    let tipoUsuario = document.getElementById("boasVindasTipo").value;

    if (nomeUsuario && tipoUsuario) {
        alert("Olá, " + nomeUsuario + " Seja bem-vindo!");
    }
});
//Funcionário
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
document.addEventListener('DOMContentLoaded', function () {
    window.limparCampos = function limparCampos() {
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
    };

    document.getElementById('limpar').addEventListener('click', limparCampos);
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
            url: "/cadastro-cliente",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Cliente cadastrado com sucesso!");
                window.location.href = "/clientes";  // Redireciona para a página de clientes após sucesso
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
                $("#clienteId").val(data.id);
                $("#nomeCliente").val(data.nome);
                $("#enderecoCliente").val(data.endereco);
                $("#cpfCliente").val(data.cpf);
                $("#telefoneCliente").val(data.telefone);
                $("#emailCliente").val(data.email);
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

        // Validações
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

        // Envia a requisição AJAX
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
                $("#devolucaoId").val(data.id);
                $("#codigo-devolucao").val(data.codigoProduto);
                $("#motivo-devolucao").val(data.motivo);
                $("#data-devolucao").val(data.data);
            },
            error: function (xhr) {
                var errorMessage = "Erro ao buscar devolucao.";
                limparCamposDevolucao();
                if (xhr.status === 404) {
                    errorMessage = "Devolução não encontrada.";
                    limparCamposDevolucao();
                }
                alert(errorMessage);
            }
        });
    } else {
        alert("Por favor, insira um ID válido para a devolução.");
        limparCamposDevolucao();
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
         // Validações
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
            alert("Primeiro exclua o produto relacionado a essa devolução");
            if (confirm("Você tem certeza que deseja excluir esta devolução?")) {

                $.ajax({
                    type: "DELETE",
                    url: "/devolucao-excluir",
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
//Registro de vendas







