//PÁGINA PESQUISAR PRODUTO
// Inicia a página escondendo elementos
$(document).ready(function () {
    $("#alterarProduto").hide();
    $("#categoriaProduto").hide();
    $("#pesquisarProduto_campo").hide();
    
});
//Função para listar os produtos
function listarProdutos() {
    $.ajax({
        type: "GET",
        url: "/listar-produtos",
        dataType: "json",
        cache: false,
        success: function (produtos) {
            console.log(produtos);
            $("#tabela-produto").empty();

            if (produtos && produtos.length > 0) {
                produtos.forEach(function (produto) {
                    var dataAquisicaoFormatada = "";

                    if (produto.dataAquisicao) {
                        var data = new Date(produto.dataAquisicao + "T00:00:00");
                        dataAquisicaoFormatada = data.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    }

                    var linha = "<tr class='linha-produto' data-id='" + produto.id + "'>" +
                        "<td class='linha'>" + produto.id + "</td>" +
                        "<td >" + produto.nomeProduto + "</td>" +
                        "<td class='linha'>" + produto.valorCompra + "</td>" +
                        "<td>" + produto.valorVenda + "</td>" +
                        "<td>" + produto.quantidadeProduto + "</td>" +
                        "<td class='linha'>" + produto.modelo + "</td>" +
                        "<td class='linha'>" + produto.notaFiscal + "</td>" +
                        "<td class='linha'>" + dataAquisicaoFormatada + "</td>" +
                        "<td class='linha'>" + produto.fabricante + "</td>" +
                        "<td class='linha'>" + (produto.categoria ? produto.categoria.nome : "") + "</td>" +
                        "<td class='linha'>" + (produto.localArmazenamento ? produto.localArmazenamento.numeroPrateleira : "") + "</td>" +
                        "<td class='linha'>" + (produto.localArmazenamento ? produto.localArmazenamento.numeroLocalPrateleira : "") + "</td>" +
                        "<td>" + produto.statusProduto + "</td>" +
                        "</tr>";

                    $("#tabela-produto").append(linha);
                });
            } else {
                alert("Nenhum produto encontrado.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar dados dos produtos:", error);
            alert("Erro ao carregar dados dos produtos.");
        }
    });
}

// Chama a função para listar os produtos quando a página for carregada
$(document).ready(function () {
    listarProdutos();
});

//Preenche os campos da página ao clicar numa linha da tabela
$("#tabela-produto").on("click", "tr.linha-produto", function () {
    var idProduto = $(this).data("id");
    limpar()
    $.ajax({
        url: "/buscar-produto",
        method: "GET",
        data: { id: idProduto },
        dataType: "json",
        success: function (response) {
            console.log(response);
            var dataConvertida = response.dataAquisicao.split('/').reverse().join('-');
            $("#nome").val(response.nomeProduto || "");
            $("#valorCompra").val(response.valorCompra || "");
            $("#valorVenda").val(response.valorVenda || "");
            $("#modelo").val(response.modelo || "");
            $("#fiscal").val(response.notaFiscal || "");
            $("#data").val(dataConvertida || "");
            $("#fabricante").val(response.fabricante || "");
            $("#descricao").val(response.descricaoTecnica || "");
            $("#prateleira").val(response.localArmazenamento?.numeroPrateleira || "");
            $("#localPrateleira").val(response.localArmazenamento?.numeroLocalPrateleira || "");
            $("#categoria").val(response.categoria?.nome || "");
            $("#status").val((response.statusProduto || "Desconhecido"));
            $("#quantidade").val((response.quantidadeProduto || "Desconhecido"));
            $("#produtoId").val(response.id);
            $("#alterarProduto").show();
        },
        error: function (xhr) {
            alert("Produto não encontrado, por favor tente novamente.");
            $("#alterarProduto").hide();
            $("#pesquisarProduto_campo").hide();
            $("#categoriaProduto").hide();
            $("#pesquisarProduto_criterio").val("");
            limparCampos();
        }
    });
});

//Função para limpar os campos
function limpar() {
    $("#alterarProduto").hide();
    $("#categoriaProduto").hide();
    $("#pesquisarProduto_campo").hide();
    $("#nome").val("");
    $("#valorCompra").val("");
    $("#valorVenda").val("");
    $("#modelo").val("");
    $("#data").val("");
    $("#fiscal").val("");
    $("#fabricante").val("");
    $("#descricao").val("");

    $("#prateleira").val("");
    $("#localPrateleira").val("");
    $("#categoria").val("");

    $("#status").val("");
    $("#quantidade").val("");

}
//função para limpar tudo
function limparCampos() {
    limpar();
    listarProdutos();
}
//Esconde selects
$(".select").on("change", function () {
    var criterio = $("#pesquisarProduto_criterio").val();
    if (criterio === "Categoria") {
        $("#pesquisarProduto_campo").hide();
        $("#categoriaProduto").show();
    } else {
        $("#pesquisarProduto_campo").show().val("").attr("placeholder", "Digite o valor do " + criterio);
        $("#categoriaProduto").hide();
    }
    if (criterio === "Devolvido") {
        $("#pesquisarProduto_campo").hide();
    } else if (criterio === "Disponibilidade") {
        $("#pesquisarProduto_campo").hide();
    }
});

//Função pa pesquisar produtos
$(document).ready(function () {
    $("#search-button").click(function (event) {
        event.preventDefault();
        var criterio = $("#pesquisarProduto_criterio").val().trim();
        var valor = $("#pesquisarProduto_campo").val().trim();
        var categoria = $("#categoriaProduto").val();
        if (criterio === "") {
            alert("Por favor, selecione um critério de busca.");
            limparCampos();
            return;
        }

        if (criterio === "categoria" && categoria === "Selecione uma categoria") {
            alert("Por favor, selecione uma categoria válida.");
            limparCampos();
            return;
        }

        var data = {};

        if (criterio === "Código") {
            if (isNaN(valor)) {
                alert("Por favor, insira um código válido.");
                limparCampos();
                return;
            }
            data.id = valor;
        } else if (criterio === "Nome") {
            data.nome = valor;
        } else if (criterio === "Fabricante") {
            data.fabricante = valor;
        } else if (criterio === "Modelo") {
            if (!valor) {
                alert("Por favor, insira um modelo válido.");
                limparCampos();
                return;
            }
            data.modelo = valor;
        } else if (criterio === "Disponibilidade") {
            data.disponibilidade = "Disponível";
        } else if (criterio === "Devolvido") {
            data.devolvido = "Devolvido";
        } else if (criterio === "Categoria") {
            data.categoria = categoria;
        }
        limpar()
        // Realização da chamada AJAX
        $.ajax({
            url: "/buscar-produto",
            method: "GET",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response);

                // Limpa a tabela antes de inserir os resultados
                $("#tabela-produto").empty();

                // Manipulação para critério "codigo"
                if (criterio === "Código") {
                    listarProdutos();
                    $("#alterarProduto").show();
                    $("#nome").val(response.nomeProduto || "");
                    $("#valorCompra").val(response.valorCompra || "");
                    $("#valorVenda").val(response.valorVenda || "");
                    $("#modelo").val(response.modelo || "");
                    $("#fiscal").val(response.notaFiscal || "");
                    $("#data").val(response.dataAquisicao || "");
                    $("#fabricante").val(response.fabricante || "");
                    $("#descricao").val(response.descricaoTecnica || "");
                    $("#prateleira").val(response.localArmazenamento?.numeroPrateleira || "");
                    $("#localPrateleira").val(response.localArmazenamento?.numeroLocalPrateleira || "");
                    $("#categoria").val(response.categoria?.nome || "");
                    $("#status").val((response.statusProduto || "Desconhecido"));
                    $("#quantidade").val((response.quantidadeProduto || "Desconhecido"));
                    $("#produtoId").val(data.id);
                    $("#pesquisarProduto_criterio").val("");
                }

                // Limpa a tabela antes de inserir os resultados
                $("#tabela-produto").empty();

                // Popula a tabela com os resultados da busca
                response.forEach(function (produto) {
                    var linha = `
                       <tr class="linha-produto" data-id="${produto.id}">
                            <td>${produto.id}</td>
                            <td>${produto.nomeProduto}</td>
                            <td>${produto.valorCompra}</td>
                            <td>${produto.valorVenda}</td>
                            <td>${produto.quantidadeProduto}</td>
                            <td>${produto.modelo}</td>
                            <td>${produto.notaFiscal}</td>
                            <td>${produto.dataAquisicao}</td>
                            <td>${produto.fabricante}</td>
                            <td>${produto.categoria?.nome || ""}</td>
                            <td>${produto.localArmazenamento?.numeroPrateleira || ""}</td>
                            <td>${produto.localArmazenamento?.numeroLocalPrateleira || ""}</td>
                            <td>${produto.statusProduto || ""}</td>
                        </tr>
                    `;
                    $("#tabela-produto").append(linha);
                    $("#pesquisarProduto_criterio").val("");
                   
                });
            },
            error: function (xhr) {
                alert("Produto não encontrado, por favor tente novamente.");
                $("#alterarProduto").hide();
                $("#pesquisarProduto_campo").hide();
                $("#categoriaProduto").hide();
                $("#pesquisarProduto_criterio").val("");
                limparCampos();
            }
        });
    });
});

//Função para alertar produtos com menos de 5 unidade
$(document).ready(function() {
    $.ajax({
        url: '/quantidade-produto',
        method: 'GET',
        success: function(mensagem) {            
            let listaProdutos = "<ul style='list-style-type: none; padding-left: 0;'>";         
                mensagem.split('\n').forEach(function(produto) {
                    listaProdutos += "<li>" + produto + "</li>";
                });
                listaProdutos += "</ul>";
                
                Swal.fire({
                    title: 'Produtos com menos de 5 unidades',
                    icon: 'warning', 
                    html: listaProdutos,  
                    confirmButtonText: 'OK'
                });  
        },
        error: function(xhr, status, error) {
            console.error("Erro ao carregar os produtos: " + error);
        }
    });
});




