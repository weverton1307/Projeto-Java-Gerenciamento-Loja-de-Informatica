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
