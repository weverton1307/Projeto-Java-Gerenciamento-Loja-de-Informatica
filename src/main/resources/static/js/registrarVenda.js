
function buscarProdudo(event) {
  event.preventDefault();
  let id = $("#codigoProdut").val().trim();
  console.log(id);

  $.ajax({
    url: "/buscarProduto",
    method: "GET",
    data: { id: id },
    dataType: "json",
    success: function (data) {
      $("#nomeProduto").text(data.nomeProduto);
      $("#valorProduto").text("R$ " + data.valorVenda.toFixed(2));

    },
    error: function (xhr) {
      var errorMessage = "Erro ao buscar produto.";
      if (xhr.status === 404) {
        errorMessage = "Produto não encontrado.";
      }
      alert(errorMessage);
    }
  })


}