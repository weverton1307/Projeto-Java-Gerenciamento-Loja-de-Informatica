const itens = [];
const dadosVenda = {
  cpf: $("#cpf-cliente").val().trim(),
  metodoPagamento: $("#metodo-pagamento").val(),
  itens: itens
};
function verificarCpf(event) {
  event.preventDefault();
  const cpfDigitado = $("#cpf-cliente").val().trim();
  if (!cpfDigitado) {

    return;
  }
  $.ajax({
    url: "listarClientes",
    method: "GET",
    dataType: "json",
    success: function (clientes) {
      const cpfExiste = clientes.some((cliente) => cliente.cpf === cpfDigitado);
      if (!cpfExiste) {
        alert("CPF não encontrado. Por favor, digite o cpf de um cliente cadastrado")
      }
    }
  })
}

function buscarProdudo(event) {
  event.preventDefault();
  let id = $("#codigoProdut").val().trim();
  console.log(id);
  zero = 0;
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
      const desconto = false;
      let item = [codigo, nome, valor, subTotal, quantidade, desconto];

      itens.push(item);

      itens.forEach((item) => {
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

function excluirItem(index) {
  removerDesconto(index);
  itens.splice(index, 1);
  adicionarItens(new Event("update"));
  calcularTotalItens();
}

function calcularTotalItens() {
  let totalItens = 0;
  let valorTotal = 0;

  itens.forEach(item => {
    totalItens += item[4];
    valorTotal += item[2] * item[4];
  });
  $("#total-itens").text(totalItens);
  $("#valor-total").text("R$ " + valorTotal.toFixed(2).replace('.', ','));
}
function removerDesconto(index){
 itens[index].desconto = false;
}
function adicionarItens(event) {
  event.preventDefault();
  const cpfCliente = $("#cpf-cliente").val().trim();
  const tbody = $("#corpoTabelaVenda");
  tbody.empty();

  $.ajax({
    url: "/listarClientes",
    method: "GET",
    dataType: "json",
    success: function (clientes) {
      let clienteVenda = null;

      clientes.forEach((cliente) => {
        if (cliente.cpf === cpfCliente) {
          clienteVenda = cliente;
        }
      });

      if (!clienteVenda) {
        alert("Cliente não encontrado.");
        return;
      }

      itens.forEach(function (item, index) {
        let count = clienteVenda.total_compras / 5;
         if (Number.isInteger(count) && !item.desconto && $("#corpoTabelaVenda").val() !== item.nome) {
        item.desconto = true; // marca que o desconto já foi aplicado
        item[2] = item[2] * 0.95; // aplica desconto no preço unitário
        item[3] = item[3] * 0.95; // aplica desconto no subtotal
    }

        const linha = `
          <tr>
            <td><div class="nome-produto-venda"><span>${item[1]}</span></div></td>
            <td><div class="preço-produto-venda"><span>R$ ${item[2].toFixed(2)}</span></div></td>
            <td><div class="subTotal-produto-venda"><span>R$ ${item[3].toFixed(2)}</span></div></td>
            <td>
              <div class="quant-venda">
                <button onclick="diminuirQuantidade(${index})">-</button>
                <span>${item[4]}</span>
                <button onclick="aumentarQuantidade(${index})">+</button>
              </div>
            </td>
            <td><a href="#" onclick="excluirItem(${index})"><i class="bi bi-trash3"></i></a></td>
          </tr>
        `;
        tbody.append(linha);
        calcularTotalItens();
      });
    },
    error: function (xhr) {
      var errorMessage = "Erro ao buscar cliente.";
      if (xhr.status === 404) {
        errorMessage = "Cliente não encontrado.";
      }
      alert(errorMessage);
    }
  });
}


