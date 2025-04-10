//PÁGINA CADASTRO PRODUTO
//Função para cadastrar um produto
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
            categoria: {
                nome: $("#categoria").val().trim()
            },
            troca: null,
            devolucao: null,
            localArmazenamento: {
                numeroPrateleira: $("#prateleira").val().trim(),
                numeroLocalPrateleira: $("#localPrateleira").val().trim(),
            },
            id: $("#produtoId").val() ? parseInt($("#produtoId").val()) : null
        };
        console.log($("#prateleira").val());
        console.log($("#localPrateleira").val());
        console.log("Form Data:", formData);

        if (formData.nomeProduto === "") {
            alert("Por favor, preencha o nome do produto.");
            return;
        }

        if (formData.valorCompra === "" || isNaN(formData.valorCompra)) {
            alert("Por favor, preencha um valor de compra válido.");
            return;
        }

        if (formData.valorVenda === "" || isNaN(formData.valorVenda)) {
            alert("Por favor, preencha um valor de venda válido.");
            return;
        }

        if (formData.descricaoTecnica === "") {
            alert("Por favor, preencha a descrição técnica do produto.");
            return;
        }

        if (formData.dataAquisicao === "") {
            alert("Por favor, preencha a data de aquisição.");
            return;
        }

        if (formData.fabricante === "") {
            alert("Por favor, preencha o fabricante.");
            return;
        }

        if (formData.modelo === "") {
            alert("Por favor, preencha o modelo.");
            return;
        }

        if (formData.notaFiscal === "") {
            alert("Por favor, preencha a nota fiscal.");
            return;
        }

        const numeroRegex = /^[+]?\d+(\.\d+)?$/;


        if (!numeroRegex.test(formData.valorCompra) || parseFloat(formData.valorCompra) <= 0) {
            alert("O valor da compra deve ser um número positivo maior que zero e não pode conter letras.");
            return;
        }

        if (!numeroRegex.test(formData.valorVenda) || parseFloat(formData.valorVenda) <= 0) {
            alert("O valor da venda deve ser um número positivo maior que zero e não pode conter letras.");
            return;
        }
        if (formData.categoria.nome === "Selecione um item") {
            alert("Por favor, selecione uma categoria.");
            return;
        }
        if (formData.localArmazenamento.numeroPrateleira === "Selecione um item") {
            alert("Por favor, selecione uma prateleira.");
            return;
        }
        if (formData.localArmazenamento.numeroLocalPrateleira === "Selecione um item") {
            alert("Por favor, selecione um local da prateleira.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/cadastro-produto",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("produto cadastrado com sucesso!");
                window.location.href = "/cadastroProduto";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

