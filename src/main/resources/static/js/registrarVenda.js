const itens = [];
$("#registrarVenda").hide();
$("#cancelarVenda").hide();
$("#adicionarProduto").hide();

function limparCampos(event) {
  event.preventDefault();
  $("#registrarVenda").hide();
  $("#cancelarVenda").hide();
  $("#adicionarProduto").hide();
  $("#cpf-cliente").val("");
  $("#metodo-pagamento").val("selecione um item");
  $("#codigoProdut").val("")
  $("#nomeProduto").text("");
  $("#valorProduto").text("");
   const tbody = $("#corpoTabelaVenda");
  tbody.empty();
  $("#total-itens").text(" 0");
   $("#valor-total").text(" R$ 0,00")
}
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
function verificarProdutoDisponivel(callback, id) {
  let produtoDisponivel = true;

  $.ajax({
    url: "/listarProdutos",
    method: "GET",
    dataType: "json",
    success: function (produtos) {
 
      produtos.forEach((produto) => {
        if (produto.id === id && produto.statusProduto !== "Disponível") {
          produtoDisponivel = false;
        }
      });
      callback(produtoDisponivel);
    },
    error: function () {
      callback(false);
    }
  });
}


function buscarProdudo(event) {
  event.preventDefault();
  let id = parseInt($("#codigoProdut").val().trim());
  let metodoPagamento = $("#metodo-pagamento").val();
  verificarProdutoDisponivel(function (disponivel) {
    if (!disponivel) {
      alert("Produto não disponível, por favor tente novamente");
    }else if(metodoPagamento ==="selecione um item"){
alert("Por favor, selecione um método de pagamento");
    } else {
      $.ajax({
        url: "/buscarProduto",
        method: "GET",
        data: { id: id },
        dataType: "json",
        success: function (data) {
          const codigo = data.id;
          const nome = data.nomeProduto;
          const valor = data.valorVenda;
          const quantidade = 1;
          const subTotal = quantidade * valor;
          const desconto = false;
          let item = [codigo, nome, valor, subTotal, quantidade, desconto];
          let tanaLista = itens.some((item) => item[1] === nome);
          if (tanaLista) {
            alert("O produto já está na lista de selecionados");
          } else {
            $("#nomeProduto").text(data.nomeProduto);
            $("#valorProduto").text("R$ " + data.valorVenda.toFixed(2));
            itens.push(item);
            $("#adicionarProduto").show();
            tanaLista = false;
          }

        },
        error: function (xhr) {
          var errorMessage = "Por favor, digitr um id válido.";
          if (xhr.status === 404) {
            errorMessage = "Produto não encontrado.";
          }
          alert(errorMessage);
        }
      });
    }
  }, id);
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
function removerDesconto(index) {
  itens[index].desconto = false;
}
function adicionarItens(event) {
  event.preventDefault();
  let cpfCliente = $("#cpf-cliente").val().trim();
  const tbody = $("#corpoTabelaVenda");
  tbody.empty();
  if (cpfCliente === "") {
    cpfCliente = "111.111.111-11";
  }
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
      itens.forEach(function (item, index) {
        let count = clienteVenda.total_compras / 5;
        if (Number.isInteger(count) && !item.desconto && count > 0) {
          item.desconto = true;
          item[2] = item[2] * 0.95;
          item[3] = item[3] * 0.95;
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
        $("#adicionarProduto").hide();
        $("#codigoProdut").val("")
        $("#nomeProduto").text("");
        $("#valorProduto").text("");
        $("#registrarVenda").show();
        $("#cancelarVenda").show();
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

function registrarVenda(event) {
  event.preventDefault

  itens.forEach((item, index) => {
    if (item.desconto === true) {
      removerDesconto(index);
    }
  })
  const itensFormatados = itens.map(item => {
    return {
      codigo: item[0],
      nome: item[1],
      valor: item[2],
      subTotal: item[3],
      quantidade: item[4],
      desconto: item[5]
    };
  });
  let cpfCliente = $("#cpf-cliente").val().trim();
  if (cpfCliente === "") {
    cpfCliente = "111.111.111-11";
  }
  const dadosVenda = {
    cpf: cpfCliente,
    metodoPagamento: $("#metodo-pagamento").val(),
    itens: itensFormatados
  };
  $.ajax({
    url: "/registrarVenda",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(dadosVenda),

    success: function (success) {
      alert("Venda realizada com sucesso");
      limparCampos(event);
    },

    error: function (xhr, status, error) {
      alert("Ocorreu um erro: " + xhr.responseText);
      console.log(dadosVenda)
    }
  });
}





