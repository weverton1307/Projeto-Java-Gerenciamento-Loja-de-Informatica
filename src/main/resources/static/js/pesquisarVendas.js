function limparCampos() {

  $("#pesquisarProduto_criterio").val("Selecione um critério de pesquisa");
   $("#resultadoPesquisa").hide();
  $("#buscar-venda").val("").hide();
   $("#opcaoStatus").hide();
   $("#opcaoPagamento").hide();
  $("#btn-limpar").hide();
  $("#search-button").hide();
  $("#corpoTabelaVenda").empty();
  $("#id").text("ID:");
  $("#cliente").text("Cliente:");
  $("#vendedor").text("Vendedor:");
  $("#metodoPagamento").text("Método de pagamento:");
  $("#status").text("Status:");
  $("#total-itens").text("0");
  $("#valor-total").text("R$ 0,00");
  $("#resultadoPesquisa").show();
  listarVendas();
}

limparCampos();

function mostrarCampo() {
  if ($("#pesquisarProduto_criterio").val() !== "Selecione um critério de pesquisa") {
   if($("#pesquisarProduto_criterio").val() ==="Código"){
     $("#buscar-venda").show();
     $("#opcaoStatus").hide();
     $("#opcaoPagamento").hide();
    $("#buscar-venda").attr("placeholder", "Digite o código da venda");
   }else if($("#pesquisarProduto_criterio").val() ==="CPF do cliente"){
     $("#buscar-venda").show();
     $("#opcaoStatus").hide();
     $("#opcaoPagamento").hide();
    $("#buscar-venda").attr("placeholder", "xxx.xxx.xxx-xx");
   }
   else if($("#pesquisarProduto_criterio").val() ==="Nome do vendedor"){
     $("#buscar-venda").show();
     $("#opcaoStatus").hide();
     $("#opcaoPagamento").hide();
    $("#buscar-venda").attr("placeholder", "Digite o nome do vendedor");
   }else if($("#pesquisarProduto_criterio").val() ==="Status"){
    $("#buscar-venda").hide();
     $("#opcaoStatus").show();
     $("#opcaoPagamento").hide();
   }else if($("#pesquisarProduto_criterio").val() ==="Data da venda"){
     $("#buscar-venda").show();
     $("#opcaoStatus").hide();
     $("#opcaoPagamento").hide();
    $("#buscar-venda").attr("placeholder", "dd/mm/aaaa");
   }else if($("#pesquisarProduto_criterio").val() ==="Método de pagamento"){
    $("#buscar-venda").hide();
     $("#opcaoPagamento").show();
     $("#opcaoStatus").hide();
   }
    $("#btn-limpar").show();
    $("#search-button").show();
  } else {
    $("#buscar-venda").hide();
    $("#btn-limpar").hide();
    $("#search-button").hide();
  }
}

let todasAsVendas = [];

function listarVendas() {
   $("#resultadoPesquisa").hide();
  $.ajax({
    url: "/listarVendas",
    method: "GET",
    dataType: "json",
    success: function (itensVendas) {
      let idsExibidos = new Set();
      todasAsVendas = itensVendas; // armazenar todas as vendas

      if (itensVendas && itensVendas.length > 0) {
        $("#tabela-venda").empty(); // limpa a tabela antes de preencher

        itensVendas.forEach((item) => {
          if (!idsExibidos.has(item.venda.id)) {
            idsExibidos.add(item.venda.id);

            let nomeCliente = item.cliente?.nome ?? "Cliente não informado";

            let linha = `
              <tr class='linha-venda' data-id='${item.venda.id}'>
                <td class='linha'>${item.venda.id}</td>
                <td>${item.produto.nomeProduto}</td>
                <td class='linha'>${nomeCliente}</td>
                <td class='linha'>${item.venda.vendedor.nome}</td>
                <td>${item.venda.metodoPagamento}</td>
                <td>${item.venda.statusVenda}</td>
              </tr>
            `;
            $("#tabela-venda").append(linha);
          }
        });
      } else {
        alert("Nenhuma venda encontrada.");
      }
    }
  });
}

// Evento de clique em uma linha da tabela
$(document).on("click", "#tabela-venda tr.linha-venda", function () {
   $("#resultadoPesquisa").show();
  let idSelecionado = $(this).data("id");

  // Filtrar os itens da venda com o ID correspondente
  let itensDaVenda = todasAsVendas.filter(item => item.venda.id === idSelecionado);

  if (itensDaVenda.length > 0) {
    let venda = itensDaVenda[0].venda;
    let cliente = itensDaVenda[0].cliente?.nome ?? "";

    // Preencher os dados no painel de resultado
    $("#id").text("ID: " + venda.id);
    $("#cliente").text("Cliente: " + cliente);
    $("#vendedor").text("Vendedor: " + venda.vendedor.nome);
    $("#metodoPagamento").text("Método de pagamento: " + venda.metodoPagamento);
    $("#status").text("Status: " + venda.statusVenda);

    // Preencher os produtos
    let corpoTabela = $("#corpoTabelaVenda");
    corpoTabela.empty();
    let totalItens = 0;
    let valorTotal = 0;

    itensDaVenda.forEach(item => {
      let subtotal = item.produto.valorVenda * item.quantidade;
      totalItens += item.quantidade;
      valorTotal += subtotal;

      let linhaProduto = `
        <tr>
          <td>${item.produto.nomeProduto}</td>
          <td>R$ ${item.produto.valorVenda.toFixed(2)}</td>
          <td>R$ ${subtotal.toFixed(2)}</td>
          <td>${item.quantidade}</td>
        </tr>
      `;
      corpoTabela.append(linhaProduto);
    });

    $("#total-itens").text(totalItens);
    $("#valor-total").text("R$ " + valorTotal.toFixed(2));
  }
});

$(document).ready(function () {
  listarVendas();
});


function pesquisar() {
  if ($("#pesquisarProduto_criterio").val() === "Código") {
    const numero = $("#buscar-venda").val();
    if (!/^\d+$/.test(numero) || parseInt(numero, 10) < 1) {
    alert("Valor inválido. Insira apenas números inteiros positivos.");
     $("#buscar-venda").val("");
    return;
  }else {
  const codigo = parseInt(numero, 10);
      let totalItens = 0;
      let valorTotal = 0;

      $.ajax({
        url: "/pesquisarVenda/codigo",
        method: "GET",
        dataType: "json",
        success: function (response) {
          $("#corpoTabelaVenda").empty();
          $("#buscar-venda").val("");
          response.forEach((item) => {
            if (item.venda && item.venda.id == codigo) {
              $("#resultadoPesquisa").show();
              $("#id").text("ID: " + item.venda.id);
              $("#cliente").text("Cliente: " + item.venda.cliente.nome);
              $("#vendedor").text("Vendedor: " + item.venda.vendedor.nome);
              $("#metodoPagamento").text("Método de pagamento: " + item.venda.metodoPagamento);
              $("#status").text("Status: " + item.venda.statusVenda);
              let subtotal = item.produto.valorVenda * item.quantidade;
              const linha = `
              <tr>
                <td>${item.produto.nomeProduto}</td>
                <td>R$ ${item.produto.valorVenda.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td>${item.quantidade}</td>
              </tr>
            `;
              $("#corpoTabelaVenda").append(linha);

              totalItens += item.quantidade;
              valorTotal += subtotal;

            }

          });
          $("#total-itens").text(totalItens);
          $("#valor-total").text("R$ " + valorTotal.toFixed(2));
        },
        error: function (xhr) {
          alert("Erro ao buscar venda: " + xhr.responseText);
          limparCampos();
        }
      });
    }

  } else if ($("#pesquisarProduto_criterio").val() === "Data da venda") {
    let dataBr = $("#buscar-venda").val();
    let partes = dataBr.split("/");

    if (partes.length !== 3) {
      alert("Formato de data inválido. Use dd/mm/aaaa.");
      return;
    }

    let dataVenda = `${partes[2]}-${partes[1]}-${partes[0]}`;
    console.log("dataVenda: " + dataVenda);
    $.ajax({
      url: "/pesquisarVenda/data",
      method: "GET",
      data: { data: dataVenda },
      dataType: "json",
      success: function (itensVendas) {
        $("#corpoTabelaVenda").empty();
        $("#tabela-venda").empty();
        $("#buscar-venda").val("");
        let idsExibidos = new Set();
        if (itensVendas && itensVendas.length > 0) {
          itensVendas.forEach((item) => {
            if (!idsExibidos.has(item.venda.id)) {
              idsExibidos.add(item.venda.id);

              let nomeCliente = item.cliente?.nome ?? "Cliente não informado";
              let linha = `
              <tr class='linha-venda' data-id='${item.venda.id}'>
                <td class='linha'>${item.venda.id}</td>
                <td>${item.produto.nomeProduto}</td>
                <td class='linha'>${nomeCliente}</td>
                <td>${item.venda.vendedor.nome}</td>
                <td>${item.venda.metodoPagamento}</td>
                <td>${item.venda.statusVenda}</td>
              </tr>
            `;
              $("#tabela-venda").append(linha);
              $("#resultadoPesquisa").hide();
            }
          });
        } else {
          alert("Nenhuma venda encontrada.");
          limparCampos();
        }
      },
      error: function (xhr) {
        alert("Erro ao buscar vendas por data: " + xhr.responseText);
      }
    });

  } else if ($("#pesquisarProduto_criterio").val() === "Status") {

    let status =  $("#opcaoStatus").val();

    $.ajax({
      url: "/pesquisarVenda/status",
      method: "GET",
      data: { status: status },
      dataType: "json",
      success: function (itensVendas) {
        $("#corpoTabelaVenda").empty();
        $("#tabela-venda").empty();
        $("#buscar-venda").val("");
        let idsExibidos = new Set();
        if (itensVendas && itensVendas.length > 0) {
          itensVendas.forEach((item) => {
            if (!idsExibidos.has(item.venda.id)) {
              idsExibidos.add(item.venda.id);

              let nomeCliente = item.cliente?.nome ?? "Cliente não informado";
              let linha = `
              <tr class='linha-venda' data-id='${item.venda.id}'>
                <td class='linha'>${item.venda.id}</td>
                <td>${item.produto.nomeProduto}</td>
                <td class='linha'>${nomeCliente}</td>
                <td>${item.venda.vendedor.nome}</td>
                <td>${item.venda.metodoPagamento}</td>
                <td>${item.venda.statusVenda}</td>
              </tr>
            `;
              $("#tabela-venda").append(linha);
              $("#resultadoPesquisa").hide();
            }
          });
        } else {
          alert("Nenhuma venda encontrada.");
          limparCampos();
        }
      },
      error: function (xhr) {
        alert("Erro ao buscar vendas por status: " + xhr.responseText);
        limparCampos();
      }
    });
  } else if ($("#pesquisarProduto_criterio").val() === "CPF do cliente") {
    let cpfCliente = $("#buscar-venda").val().trim();
    $.ajax({
      url: "/pesquisarVenda/cpf",
      method: "GET",
      data: { cpf: cpfCliente },
      dataType: "json",
      success: function (itensVendas) {
        $("#corpoTabelaVenda").empty();
        $("#tabela-venda").empty();
        $("#buscar-venda").val("");
        let idsExibidos = new Set();
        if (itensVendas && itensVendas.length > 0) {
          itensVendas.forEach((item) => {
            if (!idsExibidos.has(item.venda.id)) {
              idsExibidos.add(item.venda.id);

              let nomeCliente = item.cliente?.nome ?? "Cliente não informado";
              let linha = `
              <tr class='linha-venda' data-id='${item.venda.id}'>
                <td class='linha'>${item.venda.id}</td>
                <td>${item.produto.nomeProduto}</td>
                <td class='linha'>${nomeCliente}</td>
                <td>${item.venda.vendedor.nome}</td>
                <td>${item.venda.metodoPagamento}</td>
                <td>${item.venda.statusVenda}</td>
              </tr>
            `;
              $("#tabela-venda").append(linha);
              $("#resultadoPesquisa").hide();
            }
          });
        } else {
          alert("Nenhuma venda encontrada.");
          limparCampos();
        }
      },
      error: function (xhr) {
        alert("Erro ao buscar vendas por cpf do cliente: " + xhr.responseText);
        limparCampos();
      }

    });


  } else if ($("#pesquisarProduto_criterio").val() === "Nome do vendedor") {
    let nomeVendedor = $("#buscar-venda").val().trim()
    $.ajax({
      url: "/pesquisarVenda/vendedor",
      method: "GET",
      data: { vendedor: nomeVendedor },
      dataType: "json",
      success: function (itensVendas) {
        $("#corpoTabelaVenda").empty();
        $("#tabela-venda").empty();
        $("#buscar-venda").val("");
        let idsExibidos = new Set();
        if (itensVendas && itensVendas.length > 0) {
          itensVendas.forEach((item) => {
            if (!idsExibidos.has(item.venda.id)) {
              idsExibidos.add(item.venda.id);

              let nomeCliente = item.cliente?.nome ?? "Cliente não informado";
              let linha = `
              <tr class='linha-venda' data-id='${item.venda.id}'>
                <td class='linha'>${item.venda.id}</td>
                <td>${item.produto.nomeProduto}</td>
                <td class='linha'>${nomeCliente}</td>
                <td>${item.venda.vendedor.nome}</td>
                <td>${item.venda.metodoPagamento}</td>
                <td>${item.venda.statusVenda}</td>
              </tr>
            `;
              $("#tabela-venda").append(linha);
              $("#resultadoPesquisa").hide();
            }
          });
        } else {
          alert("Nenhuma venda encontrada.");
          limparCampos();
        }
      },
      error: function (xhr) {
        alert("Erro ao buscar vendas por vendedor: " + xhr.responseText);
        limparCampos();
      }

    });


  } else if ($("#pesquisarProduto_criterio").val() === "Método de pagamento") {
    let metodoPagamento =  $("#opcaoPagamento").val();
    $.ajax({
      url: "/pesquisarVenda/metodoPagamento",
      method: "GET",
      data: { metodoPagamento: metodoPagamento },
      dataType: "json",
      success: function (itensVendas) {
        $("#corpoTabelaVenda").empty();
        $("#tabela-venda").empty();
        $("#buscar-venda").val("");
        let idsExibidos = new Set();
        if (itensVendas && itensVendas.length > 0) {
          itensVendas.forEach((item) => {
            if (!idsExibidos.has(item.venda.id)) {
              idsExibidos.add(item.venda.id);

              let nomeCliente = item.cliente?.nome ?? "Cliente não informado";
              let linha = `
              <tr class='linha-venda' data-id='${item.venda.id}'>
                <td class='linha'>${item.venda.id}</td>
                <td>${item.produto.nomeProduto}</td>
                <td class='linha'>${nomeCliente}</td>
                <td>${item.venda.vendedor.nome}</td>
                <td>${item.venda.metodoPagamento}</td>
                <td>${item.venda.statusVenda}</td>
              </tr>
            `;
              $("#tabela-venda").append(linha);
              $("#resultadoPesquisa").hide();
            }
          });
        } else {
          alert("Nenhuma venda encontrada.");
          limparCampos();
        }
      },
      error: function (xhr) {
        alert("Erro ao buscar vendas por metódo de pagamento: " + xhr.responseText);
        limparCampos();
      }

    });


  } else {
    Swal.fire("Selecione o critério para pesquisar.");

  }
}




