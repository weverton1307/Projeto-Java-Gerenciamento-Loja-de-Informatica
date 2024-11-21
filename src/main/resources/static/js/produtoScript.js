$("#alterarProduto").prop("disabled", true);
$(document).ready(function () {
    $("#salvarProduto").click(function (event) {
        event.preventDefault();
        const formData = {
            nomeProduto: $("#nome").val().trim(),
            valorCompra: $("#valorCompra").val().trim(),
            valorVenda: $("#valorVenda").val().trim(),
            descricaoTecnica: $("#descricao").val().trim(),
            dataAquisicao: $("#data").val().trim(),
            fabricante: $("#fabricante").val().trim(),
            modelo: $("#modelo").val().trim(),
            notaFiscal: $("#fiscal").val().trim(),
            statusProduto: "Disponível",
            cpf_cliente_devolucao: null,
            categoria:{
              nome: $("#categoria").val().trim()
            },
            troca: null,
            devolucao: null,
            localArmazenamento:{
                numeroPrateleira: $("#prateleira").val().trim(),
                numeroLocalPrateleira: $("#localPrateleira").val().trim(),
            },
            id: $("#produtoId").val() ? parseInt($("#produtoId").val()) : null
        };
        console.log($("#prateleira").val());
console.log($("#localPrateleira").val());


        console.log("Form Data:", formData);

        $.ajax({
            type: "POST",
            url: "/cadastro-produto",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("produto cadastrado com sucesso!");
                window.location.href = "/produtos";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});
$(document).ready(function () {
    $("#search-button").click(function (event) {
        event.preventDefault();

        var criterio = $("input[name='pesquisar']:checked").val();
        var valor = $("#campo").val().trim();
        var categoria = $("#item-categoria").val();

        // Validação de seleção de critério
        if (!criterio) {
            alert("Por favor, selecione um critério de busca.");
            return;
        }

        // Validação específica para o critério "categoria"
        if (criterio === "categoria" && categoria === "Selecione uma categoria") {
            alert("Por favor, selecione uma categoria válida.");
            return;
        }

        var data = {};

        // Construção dos dados com base no critério
        if (criterio === "codigo") {
            if (isNaN(valor)) {
                alert("Por favor, insira um código válido.");
                return;
            }
            data.id = valor;
        } else if (criterio === "nome") {
            data.nome = valor;
        } else if (criterio === "fabricante") {
            data.fabricante = valor;
        } else if (criterio === "modelo") {
            if (!valor) {
                alert("Por favor, insira um modelo válido.");
                return;
            }
            data.modelo = valor;
        } else if (criterio === "disponibilidade") {
            data.disponibilidade = valor;
        } else if (criterio === "devolvido") {
            data.devolvido = valor;
        } else if (criterio === "categoria") {
            data.categoria = categoria;
        }

        // Realização da chamada AJAX
        $.ajax({
            url: "/buscar-produto",
            method: "GET",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response);

                // Limpa a tabela antes de inserir os resultados
                $("#tabela-reservas").empty();

                // Manipulação para critério "codigo"
                if (criterio === "codigo") {
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
                    $("#status").text("Status: " + (response.statusProduto || "Desconhecido"));
                    $("#quantidade").text("Quantidade do produto: " + (response.quantidadeProduto || "Desconhecido"));
                }

                // Limpa a tabela antes de inserir os resultados
                $("#tabela-reservas").empty();

                // Popula a tabela com os resultados da busca
                response.forEach(function (produto) {
                    var linha = `
                        <tr class="linha-produto">
                            <td>${produto.id}</td>
                            <td>${produto.nomeProduto}</td>
                            <td>${produto.valorCompra}</td>
                            <td>${produto.valorVenda}</td>
                            <td>${produto.quantidadeProduto}</td>
                            <td>${produto.modelo}</td>
                            <td>${produto.notaFiscal}</td>
                            <td>${produto.dataAquisicao}</td>
                            <td>${produto.fabricante}</td>
                            <td>${produto.descricaoTecnica}</td>
                            <td>${produto.categoria?.nome || ""}</td>
                            <td>${produto.localArmazenamento?.numeroPrateleira || ""}</td>
                            <td>${produto.localArmazenamento?.numeroLocalPrateleira || ""}</td>
                            <td>${produto.statusProduto || ""}</td>
                        </tr>
                    `;
                    $("#tabela-reservas").append(linha);
                });

                // Função para carregar os dados da linha clicada na tabela
                $("#tabela-reservas").on("click", "tr.linha-produto", function () {
                    // Seleciona as células da linha
                    var id = $(this).find("td").eq(0).text();
                    var nomeProduto = $(this).find("td").eq(1).text();
                    var valorCompra = $(this).find("td").eq(2).text();
                    var valorVenda = $(this).find("td").eq(3).text();
                    var quantidadeProduto = $(this).find("td").eq(4).text();
                    var modelo = $(this).find("td").eq(5).text();
                    var notaFiscal = $(this).find("td").eq(6).text();
                    var dataAquisicao = $(this).find("td").eq(7).text();
                    var fabricante = $(this).find("td").eq(8).text();
                    var descricaoTecnica = $(this).find("td").eq(9).text();
                    var categoria = $(this).find("td").eq(10).text();
                    var numeroPrateleira = $(this).find("td").eq(11).text();
                    var numeroLocalPrateleira = $(this).find("td").eq(12).text();
                    var statusProduto = $(this).find("td").eq(13).text();

                    // Preenche os campos do formulário com os dados da linha
                    $("#codigo").val(id);
                    $("#nome").val(nomeProduto);
                    $("#valorCompra").val(valorCompra);
                    $("#valorVenda").val(valorVenda);
                    $("#quantidade").text("Quantidade do produto: " + quantidadeProduto);
                    $("#modelo").val(modelo);
                    $("#fiscal").val(notaFiscal);
                    $("#data").val(dataAquisicao);
                    $("#fabricante").val(fabricante);
                    $("#descricao").val(descricaoTecnica);
                    $("#prateleira").val(numeroPrateleira);
                    $("#localPrateleira").val(numeroLocalPrateleira);
                    $("#categoria").val(categoria);
                    $("#status").text("Status: " + statusProduto);
                });
            },
            error: function (xhr) {
                alert("Erro ao buscar produto.");
            }
        });
    });
});
//Função para limpar os campos
function limparCampos() {
    // Limpa todos os inputs de texto
    $("input[type='text'], input[type='number'], input[type='date']").val("");

    // Reseta os selects para a opção padrão (assumindo que a opção padrão tem value vazio)
    $("select").each(function () {
        $(this).val($(this).find("option:first").val());
    });

    // Limpa os textos de quantidade e status
    $("#quantidade").text("");
    $("#status").text("");
    $("#descricao").val("");
    listarProdutos();
}
$(document).ready(function () {
    // Adiciona evento de clique ao botão de limpar
    $("#btn-limpar").click(function () {
        limparCampos();
    });

    // Adiciona evento de mudança nos radios para limpar os campos
    $("input[type='radio'][name='pesquisar']").change(function () {
        limparCampos();
    });
});

