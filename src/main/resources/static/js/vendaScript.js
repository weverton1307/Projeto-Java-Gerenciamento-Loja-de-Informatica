$(document).ready(function () {
    $("#buscar").click(function (event) {
        event.preventDefault();

        var id = $("#criterio-pesquisa").val().trim();

        // Validação de entrada para ID
        if (!id || isNaN(id) || id <= 0) {
            alert("Por favor, insira um ID válido.");
            return;
        }

        // Configuração dos dados para a requisição
        var data = { id: id };

        // Realização da chamada AJAX
        $.ajax({
            url: "/buscar-vendas",
            method: "GET",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response);

                // Formatar a data e hora no formato desejado
                let dataHora = new Date(response.venda.dataHora); // Converter para um objeto Date
                let horaFormatada = dataHora.toLocaleTimeString("pt-BR"); // Hora formatada
                let dataFormatada = dataHora.toLocaleDateString("pt-BR"); // Data formatada
                let dataHoraFormatada = `${horaFormatada} ${dataFormatada}`;

                // Preencher os resultados
                $("#resultado-pesquisa-codigo").html(`
                    <h5>ID: ${response.venda.id}</h5>
                    <h5>Status: ${response.venda.statusVenda}</h5>
                    <h5>Data e hora: ${dataHoraFormatada}</h5>
                    <h5>Método de pagamento: ${response.venda.metodoPagamento}</h5>
                    <h5>Vendedor: ${response.venda.vendedor.nome}</h5>
                    <h5>Nome do cliente: ${response.venda.cliente.nome}</h5>
                    <h5>CPF do cliente: ${response.venda.cliente.cpf}</h5>
                `);
            },
            error: function (xhr) {
                if (xhr.status === 404) {
                    alert("Venda não encontrada.");
                } else {
                    alert("Erro ao buscar venda.");
                }
            }
        });
    });
});


$(document).ready(function () {
    $("#botao-relatorio").click(function (event) {
        var dataInicio = document.getElementById("dataInicio").value;
        var dataFinal = document.getElementById("dataFinal").value;

        console.log("Data Início: ", dataInicio);
        console.log("Data Final: ", dataFinal);

        if (!dataInicio || !dataFinal) {
            alert("Por favor, preencha as datas corretamente.");
            return;
        }
        //lucro total
        $.ajax({
            url: "/gerar-relatorio",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: { dataInicio: dataInicio, dataFinal: dataFinal },
            success: function (response) {
                console.log("Resposta do servidor:", response);
                $("#lucro-total").text("Lucro total: R$ " + parseFloat(response).toFixed(2));
            },
            error: function () {
                alert("Erro ao gerar o relatório. Tente novamente.");
            },
        });
         //Método de pagamento mais utilizado
        $.ajax({
            url: "/gerar-relatorioMetodoPagamento",
            type: "POST",
            data: { dataInicio: dataInicio, dataFinal: dataFinal },
            success: function (response) {
                console.log("Resposta do servidor:", response);
                $("#metodo").text("Método de pagamento mais usado: " + response);
            },
            error: function () {
                alert("Erro ao gerar o relatório. Tente novamente.");
            },
        });
      //Média de lucro
      $.ajax({
        url: "/gerar-relatorioMediaLucro",
        type: "POST",
        data: { dataInicio: dataInicio, dataFinal: dataFinal },
        success: function (response) {
            console.log("Resposta do servidor:", response);
            $("#media").text("Média de lucro: " + parseFloat(response).toFixed(2));
        },
        error: function () {
            alert("Erro ao gerar o relatório. Tente novamente.");
        },
    });
     //Produto mais vendido
     $.ajax({
        url: "/gerar-relatorioProdutomaisVendido",
        type: "POST",
        data: { dataInicio: dataInicio, dataFinal: dataFinal },
        success: function (response) {
            console.log("Resposta do servidor:", response);
            $("#produto").text("Produto mais vendido: " + response);
        },
        error: function () {
            alert("Erro ao gerar o relatório. Tente novamente.");
        },
    });
    //Faturamento total
    $.ajax({
        url: "/gerar-relatorioFaturamentoTotal",
        type: "POST",
        data: { dataInicio: dataInicio, dataFinal: dataFinal },
        success: function (response) {
            console.log("Resposta do servidor:", response);
            $("#fatura").text("Faturamento total: " + response);
        },
        error: function () {
            alert("Erro ao gerar o relatório. Tente novamente.");
        },
    });
     //Total vendas
     $.ajax({
        url: "/gerar-relatorioTotalVendas",
        type: "POST",
        data: { dataInicio: dataInicio, dataFinal: dataFinal },
        success: function (response) {
            console.log("Resposta do servidor:", response);
            $("#vendas").text("Total de vendas: " + response);
        },
        error: function () {
            alert("Erro ao gerar o relatório. Tente novamente.");
        },
    });
     //Cliente mais frequente
     $.ajax({
        url: "/gerar-relatorioClienteMaisFrequente",
        type: "POST",
        data: { dataInicio: dataInicio, dataFinal: dataFinal },
        success: function (response) {
            console.log("Resposta do servidor:", response);
            $("#cliente").text("Cliente mais frequente: " + response);
        },
        error: function () {
            alert("Erro ao gerar o relatório. Tente novamente.");
        },
    });
        //Total de produtos devolvidos
        $.ajax({
            url: "/gerar-relatorioTotalDevolvidos",
            type: "POST",
            data: { dataInicio: dataInicio, dataFinal: dataFinal },
            success: function (response) {
                console.log("Resposta do servidor:", response);
                $("#devol").text("Total de produtos devolvidos: " + response);
            },
            error: function () {
                alert("Erro ao gerar o relatório. Tente novamente.");
            },
        });
    });
});
//Limpar
$(document).ready(function () {
    $("#limpar-venda").click(function () {
        // Redefinir os textos do relatório
        $("#lucro-total").text("Lucro total:");
        $("#media").text("Média de lucro:");
        $("#metodo").text("Método de pagamento mais usado:");
        $("#produto").text("Produto mais vendido:");
        $("#devol").text("Total de produtos devolvidos:");
        $("#cliente").text("Cliente mais frequente:");
        $("#fatura").text("Faturamento total:");
        $("#vendas").text("Total de vendas:");

        // Redefinir os textos do container de vendas
        $("#resultado-pesquisa-codigo h5:nth-child(1)").text("id:");
        $("#resultado-pesquisa-codigo h5:nth-child(2)").text("Status:");
        $("#resultado-pesquisa-codigo h5:nth-child(3)").text("Data e hora:");
        $("#resultado-pesquisa-codigo h5:nth-child(4)").text("Método de pagamento:");
        $("#resultado-pesquisa-codigo h5:nth-child(5)").text("Vendedor:");
        $("#resultado-pesquisa-codigo h5:nth-child(6)").text("Nome do cliente:");
        $("#resultado-pesquisa-codigo h5:nth-child(7)").text("CPF do cliente:");
    });
});


