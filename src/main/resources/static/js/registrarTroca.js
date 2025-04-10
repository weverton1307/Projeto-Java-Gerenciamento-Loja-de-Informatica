// PÁGINA REGISTRAR TROCA
// Função para registrar uma troca de produto
$(document).ready(function () {
    $("#salvarTroca").click(function (event) {
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
            url: "/cadastro-troca",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                console.log("Resposta do servidor:", response);
                alert("troca realizada com sucesso!");
                location.reload();
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});