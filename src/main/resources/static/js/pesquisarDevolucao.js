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