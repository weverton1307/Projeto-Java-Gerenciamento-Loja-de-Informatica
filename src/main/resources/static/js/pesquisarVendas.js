function limparCampos() {
  $("#pesquisarProduto_criterio").val("Selecione um critério de pesquisa")
  $("#buscar-venda").hide();
  $("#btn-limpar").hide();
  $("#search-button").hide();

}
limparCampos();

function mostrarCampo() {
  if ($("#pesquisarProduto_criterio").val() !== "Selecione um critério de pesquisa") {
    $("#buscar-venda").show();
    $("#btn-limpar").show();
    $("#search-button").show();
  } else {
    $("#buscar-venda").hide();
    $("#btn-limpar").hide();
    $("#search-button").hide();
  }
}

function listarVendas(){
  $.ajax({
    url: "/pesquisarVenda/data",
    method: "GET",
    dataType: "json",
    success: function(itensVendas){
      if(itensVendas && itensVendas.length > 0){
        itensVendas.forEach((item)=>{

          let linha = "<tr class= 'linha-venda' vendaId = '"+item.venda.id +"'>"+
          "<td class='linha'>" + item.venda.id + "</td>" +
          "<td >" + item.produto.nomeProduto + "</td>" +
          "<td class='linha'>" + item.cliente.nome + "</td>" +
          "<td>" + item.venda.vendedor.nome + "</td>" +
           "<td>" + item.venda.metodoPagamento + "</td>" +
           "<td>" + item.venda.statusVenda + "</td>" +
           "</tr>";
           $("#tabela-venda").append(linha);
        });
      }else {
                alert("Nenhuma venda encontrada.");
            }
    }

  })
}
function pesquisarPorCodigo() {
  console.log($("#pesquisarProduto_criterio").val())
  if ($("#pesquisarProduto_criterio").val() === "Código") {
    const codigo = $("#buscar-venda").val();
    let totalItens = 0;
    let valorTotal = 0;

    $.ajax({
      url: "/pesquisarVenda/codigo",
      method: "GET",
      dataType: "json",
      success: function (response) {
        response.forEach((item) => {
          if (item.venda && item.venda.id == codigo) {
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
      }
    });
  }else{
    Swal.fire("Selecione o critério 'Código' para pesquisar.");
  
  }
}

