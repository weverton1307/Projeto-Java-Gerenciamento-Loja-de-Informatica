//PÁGINA DE REGISTRAR DEVOLUÇÃO
//Função para cadastrar devolucao
$(document).ready(function () {
    $("#salvarDevolucao").click(function (event) {
        event.preventDefault();

        const formData = {
            codigoProduto: $("#codigo-devolucao").val().trim(),
            motivo: $("#motivo-devolucao").val().trim(),
            tipo: "Devolução",
            data: $("#data-devolucao").val().trim(),
            id: $("#devolucaoId").val() ? parseInt($("#devolucaoId").val()) : null,
            nome_produto: $("#NomeProdutoDevolucao").val() ? parseInt($("#NomeProdutoDevolucao").val()) : null
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
            type: "POST",
            url: "/cadastro-devolucao",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Devolução realizada com sucesso!");
                window.location.href = "/registrarDevolucao";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});