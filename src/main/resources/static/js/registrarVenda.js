const itens = [];


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
        const codigo = data.id;
      const nome = data.nomeProduto;
      const valor = data.valorVenda;
      const quantidade = 1;
      const subTotal = quantidade * valor;
        // Criando o item agora com os valores definidos
      let item = [codigo, nome, valor, subTotal, quantidade];
     
      // Adicionando ao array principal
      itens.push(item);

      itens.forEach((item)=>{
        console.log("teste: " + item[1]);
      })
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
function diminuirQuantidade(index) {
  if (itens[index][4] > 1) {
    itens[index][4] -= 1;
    itens[index][3] = itens[index][2] * itens[index][4]; 
    adicionarItens(new Event("update")); 
  }
}
function aumentarQuantidade(index) {
  itens[index][4] += 1;
  itens[index][3] = itens[index][2] * itens[index][4];
  adicionarItens(new Event("update"));
}
function adicionarItens(event){
  event.preventDefault();
  const tbody =$("#corpoTabelaVenda");
  
  tbody.empty();
  itens.forEach(function(item, index){

      const linha = `
      <tr>
        <td><div class="nome-produto-venda"><span>${item[1]}</span></div></td>
        <td><div class="preço-produto-venda"><span>R$ ${item[2]}</span></div></td>
        <td><div class="subTotal-produto-venda"><span>R$ ${item[3].toFixed(2)}</span></div></td>
        <td>
          <div class="quant-venda">
            <button onclick="diminuirQuantidade(${index})">-</button>
            <span>${item[4]}</span>
            <button onclick="aumentarQuantidade(${index})">+</button>
          </div>
        </td>
        <td><a href="#"><i class="bi bi-trash3"></i></a></td>
      </tr>
    `;
     tbody.append(linha);
  })
}