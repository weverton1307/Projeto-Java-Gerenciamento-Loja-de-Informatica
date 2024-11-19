$("#alterarProduto").prop("disabled", true);
$(document).ready(function () {
    $("#salvarProduto").click(function (event) {
        event.preventDefault();
        const formData = {
            nomeProduto: $("#nome").val().trim(),
            valorCompra: $("#valorCompra").val().trim(),
            valorVenda: $("#valorVenda").val().trim(),
            descricaoTecnica: $("#descricao").val().trim(),
            dataAquisicao: $("#data").val().trim(),
            fabricante: $("#fabricante").val().trim(),
            modelo: $("#modelo").val().trim(),
            notaFiscal: $("#fiscal").val().trim(),
            statusProduto: "Disponível",
            cpf_cliente_devolucao: null,
            categoria:{
              nome: $("#categoria").val().trim()
            },
            troca: null,
            devolucao: null,
            localArmazenamento:{
                numeroPrateleira: $("#prateleira").val().trim(),
                numeroLocalPrateleira: $("#localPrateleira").val().trim(),
            },
            id: $("#produtoId").val() ? parseInt($("#produtoId").val()) : null
        };
        console.log($("#prateleira").val());
console.log($("#localPrateleira").val());


        console.log("Form Data:", formData);

        $.ajax({
            type: "POST",
            url: "/cadastro-produto",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("produto cadastrado com sucesso!");
                window.location.href = "/produtos";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});