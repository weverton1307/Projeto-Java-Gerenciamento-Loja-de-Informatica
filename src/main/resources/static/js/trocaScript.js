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

function buscarTroca(event) {
    event.preventDefault();

    var id = $("#pesquisar-devolucaoOuTroca").val().trim();
    $("#alterarTroca").prop("disabled", false);
    $("#excluirTroca").prop("disabled", false);
    $("#salvarTroca").prop("disabled", true);
    if (id && !isNaN(id)) {
        $.ajax({
            url: "/buscar-troca",
            method: "GET",
            data: { id: id },
            dataType: "json", 
            success: function (data) {

                $("#codigo-troca").val(data.codigoProduto);
                $("#motivo-troca").val(data.motivo);
                $("#data-troca").val(data.data);
            },
            error: function (xhr) {
                var errorMessage = "Erro ao buscar troca.";
                if (xhr.status === 404) {
                    errorMessage = "Troca não encontrada.";
                }
                alert(errorMessage);
            }
        });
    } else {
        alert("Por favor, insira um ID válido para a troca.");
    }
}

function limparCamposTrocao() {
    $("#alterarTroca").prop("disabled", true);
    $("#excluirTroca").prop("disabled", true);
    $("#salvarTroca").prop("disabled", false);
    document.getElementById('codigo-troca').value = '';
    document.getElementById('motivo-troca').value = '';
    document.getElementById('data-troca').value = '';
}

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

        $.ajax({
            type: "PUT",
            url: "/atualizar-troca",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Troca atualizada com sucesso!");
                window.location.href = "/troca";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

$(document).ready(function () {

    $("#excluirTroca").click(function (event) {
        event.preventDefault();

        const trocaId = $("#trocaId").val();

        if (trocaId) {
    
            if (confirm("Você tem certeza que deseja excluir esta troca?")) {

                $.ajax({
                    type: "DELETE",
                    url: "/troca-excluir",
                    contentType: "application/json",
                    data: JSON.stringify({ id: trocaId }),
                    success: function (response) {
                        alert("Troca excluída com sucesso!");
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        alert("Ocorreu um erro ao excluir a troca: " + xhr.responseText);
                    }
                });
            }
        } else {
            alert("Nenhuma troca selecionada para exclusão.");
        }
    });
});