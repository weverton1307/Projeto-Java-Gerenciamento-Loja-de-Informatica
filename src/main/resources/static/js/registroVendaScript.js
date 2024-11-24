


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






