//PÁGINA PESQUISAR PRODUTO
// esconde o botão alterar
$(document).ready(function () {
    $("#alterarProduto").hide();
});
// Função para listar os produtos
function listarProdutos() {
    $.ajax({
        type: "GET",
        url: "/listar-produtos",
        dataType: "json",
        cache: false,
        success: function (produtos) {
            console.log(produtos);
            $("#tabela-produto").empty();

            if (produtos && produtos.length > 0) {
                produtos.forEach(function (produto) {
                    var dataAquisicaoFormatada = "";

                    if (produto.dataAquisicao) {
                        var data = new Date(produto.dataAquisicao + "T00:00:00");
                        dataAquisicaoFormatada = data.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    }
                     
                    var linha = "<tr class='linha-produto' data-id='" + produto.id + "'>" +
                        "<td class='linha'>" + produto.id + "</td>" +
                        "<td >" + produto.nomeProduto + "</td>" +
                        "<td class='linha'>" + produto.valorCompra + "</td>" +
                        "<td>" + produto.valorVenda + "</td>" +
                        "<td>" + produto.quantidadeProduto + "</td>" +
                        "<td class='linha'>" + produto.modelo + "</td>" +
                        "<td class='linha'>" + produto.notaFiscal + "</td>" +
                        "<td class='linha'>" + dataAquisicaoFormatada + "</td>" +
                        "<td class='linha'>" + produto.fabricante + "</td>" +
                        "<td class='linha'>" + (produto.categoria ? produto.categoria.nome : "") + "</td>" +
                        "<td class='linha'>" + (produto.localArmazenamento ? produto.localArmazenamento.numeroPrateleira : "") + "</td>" +
                        "<td class='linha'>" + (produto.localArmazenamento ? produto.localArmazenamento.numeroLocalPrateleira : "") + "</td>" +
                        "<td>" + produto.statusProduto + "</td>" +
                        "</tr>";

                    $("#tabela-produto").append(linha);
                });
            } else {
                alert("Nenhum produto encontrado.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar dados dos produtos:", error);
            alert("Erro ao carregar dados dos produtos.");
        }
    });
}

// Chama a função para listar os produtos quando a página for carregada
$(document).ready(function () {
    listarProdutos();
});

//Preenche os campos da página ao clicar numa linha da tabela
$("#tabela-produto").on("click", "tr.linha-produto", function () {
    var idProduto = $(this).data("id");

    $.ajax({
        url: "/buscar-produto",
        method: "GET",
        data: { id: idProduto },
        dataType: "json",
        success: function (response) {
            console.log(response);
            var dataConvertida = response.dataAquisicao.split('/').reverse().join('-');
            $("#nome").val(response.nomeProduto || "");
            $("#valorCompra").val(response.valorCompra || "");
            $("#valorVenda").val(response.valorVenda || "");
            $("#modelo").val(response.modelo || "");
            $("#fiscal").val(response.notaFiscal || "");
            $("#data").val(dataConvertida || "");
            $("#fabricante").val(response.fabricante || "");
            $("#descricao").val(response.descricaoTecnica || "");
            $("#prateleira").val(response.localArmazenamento?.numeroPrateleira || "");
            $("#localPrateleira").val(response.localArmazenamento?.numeroLocalPrateleira || "");
            $("#categoria").val(response.categoria?.nome || "");
            $("#status").val((response.statusProduto || "Desconhecido"));
            $("#quantidade").val((response.quantidadeProduto || "Desconhecido"));
            $("#produtoId").val(response.id);
            $("#alterarProduto").show();
        },
        error: function (xhr) {
            alert("Erro ao buscar produto.");
        }
    });
});

//Função para limpar os campos
function limparCampos() {
    $("input[type='text'], input[type='number'], input[type='date']").val("");

    $("select").each(function () {
        $(this).val($(this).find("option:first").val());
    });

    listarProdutos();
}
    // Adiciona evento de clique ao botão de limpar
$(document).ready(function () {
    $("#btn-limpar").click(function () {
        limparCampos();
    });
});


