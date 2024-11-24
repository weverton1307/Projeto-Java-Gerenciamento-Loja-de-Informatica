


$(document).ready(function () {
    $("#gerar-venda").click(function (event) {
        event.preventDefault();

        const formData = {
            cliente: {
                cpf: $("#cpfClienteVenda").val().trim()
            },
            metodoPagamento: $("#metodo-pagamento").val().trim(),
            vendedor: {
                nome: $("#funcionario-venda").val().trim(),
            },
            id: $("#vendaId").val() ? parseInt($("#vendaId").val()) : null
        };

        $.ajax({
            type: "POST",
            url: "/cadastra-venda",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                window.location.href = "/registroVendaProduto";
                alert("Venda gerada com sucesso! Por favor, adicione um produto na venda");

                // Desativa o botão "Gerar Venda"
                $("#gerar-venda").prop("disabled", true);

                // Habilita os campos e o botão "Buscar Produto"
                $("#codigoProduto-venda").prop("disabled", false);
                $("#quantidadeProduto-venda").prop("disabled", false);
                $("#buscar-produto").prop("disabled", false);

            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

$(document).ready(function () {
    $("#buscar-produto").click(function (event) {
        event.preventDefault();

        const formData = {
            codigoProduto: $("#codigoProduto-venda").val().trim(),
            quantidade: $("#quantidadeProduto-venda").val().trim()
        };

        $.ajax({
            type: "POST",
            url: "/procurar-produto",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
    if (response.produto) {
        alert("Por favor, adicione o produto")
        $("#h6 h6:nth-of-type(1)").text("Nome do produto: " + response.produto.nomeProduto);
        $("#h6 h6:nth-of-type(2)").text("Valor: R$ " + response.produto.valorVenda.toFixed(2));
    } else {
        alert("Produto não encontrado!");
    }
            },
            error: function (xhr, status, error) {
                console.error("Erro ao buscar o produto: " + xhr.responseText);
                alert("Ocorreu um erro ao buscar o produto. Tente novamente.");
            }
        });
    });
});
// listar tabela
$(document).ready(function () {
    // Ao clicar no botão "Adicionar"
    $("#adicionar-venda").click(function () {
        $.ajax({
            type: "GET",
            url: "/listar-itens",
            success: function (response) {
                console.log("Itens recebidos:", response); // Verifique o que está sendo retornado

                // Limpa a tabela antes de preenchê-la
                $("#tabela-registro").empty();

                let valorTotal = 0; // Variável para armazenar o valor total

                // Preenche a tabela com os itens retornados
                response.forEach(function (item) {
                    // Calcula o subTotal para cada item
                    const subTotal = (item.quantidade * item.produto.valorVenda).toFixed(2);

                    // Adiciona o subtotal ao valor total
                    valorTotal += parseFloat(subTotal);

                    // Preenche a tabela com o item
                    $("#tabela-registro").append(`
                        <tr>
                            <td>${item.produto.nomeProduto}</td>
                            <td>${item.quantidade}</td>
                            <td>R$ ${item.produto.valorVenda.toFixed(2)}</td>
                            <td>R$ ${subTotal}</td>
                        </tr>
                    `);
                });

                // Atualiza o valor total na tag <h2 id="itens-Registro">
                $("#itens-Registro").text(`Valor Total: R$ ${valorTotal.toFixed(2)}`);
            },
            error: function (xhr, status, error) {
                console.error("Erro ao listar itens de venda:", xhr.responseText);
                alert("Ocorreu um erro ao listar os itens da venda. Tente novamente.");
            }
        });
    });
});




