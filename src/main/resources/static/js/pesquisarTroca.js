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

//Função para atualizar dados de uma troca cadastrada
$(document).ready(function () {
    $("#alterarTroca").click(function (event) {
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

        if (!/^\d+$/.test(formData.codigoProduto)) {
            alert("O código do produto deve conter apenas números inteiros positivos.");
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
            url: "/atualizar-troca",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Troca atualizada com sucesso!");
                window.location.href = "/pesquisarTroca";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});
