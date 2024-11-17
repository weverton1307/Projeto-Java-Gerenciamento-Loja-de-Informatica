$("#alterarTroca").prop("disabled", true);
$("#excluirTroca").prop("disabled", true);
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