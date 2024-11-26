
$("#atualizarProduto").prop("disabled", true);
limparCampos();
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
            categoria: {
                nome: $("#categoria").val().trim()
            },
            troca: null,
            devolucao: null,
            localArmazenamento: {
                numeroPrateleira: $("#prateleira").val().trim(),
                numeroLocalPrateleira: $("#localPrateleira").val().trim(),
            },
            id: $("#produtoId").val() ? parseInt($("#produtoId").val()) : null
        };
        console.log($("#prateleira").val());
        console.log($("#localPrateleira").val());
        console.log("Form Data:", formData);
         // Validações dos campos
         if (formData.nomeProduto === "") {
            alert("Por favor, preencha o nome do produto.");
            return;
        }

        if (formData.valorCompra === "" || isNaN(formData.valorCompra)) {
            alert("Por favor, preencha um valor de compra válido.");
            return;
        }

        if (formData.valorVenda === "" || isNaN(formData.valorVenda)) {
            alert("Por favor, preencha um valor de venda válido.");
            return;
        }

        if (formData.descricaoTecnica === "") {
            alert("Por favor, preencha a descrição técnica do produto.");
            return;
        }

        if (formData.dataAquisicao === "") {
            alert("Por favor, preencha a data de aquisição.");
            return;
        }

        if (formData.fabricante === "") {
            alert("Por favor, preencha o fabricante.");
            return;
        }

        if (formData.modelo === "") {
            alert("Por favor, preencha o modelo.");
            return;
        }

        if (formData.notaFiscal === "") {
            alert("Por favor, preencha a nota fiscal.");
            return;
        }
       
        const numeroRegex = /^[+]?\d+(\.\d+)?$/;


        if (!numeroRegex.test(formData.valorCompra) || parseFloat(formData.valorCompra) <= 0) {
            alert("O valor da compra deve ser um número positivo maior que zero e não pode conter letras.");
            return;
        }

        if (!numeroRegex.test(formData.valorVenda) || parseFloat(formData.valorVenda) <= 0) {
            alert("O valor da venda deve ser um número positivo maior que zero e não pode conter letras.");
            return;
        }
         if (formData.categoria.nome === "Selecione um item") {
            alert("Por favor, selecione uma categoria.");
            return;
         }
         if (formData.localArmazenamento.numeroPrateleira === "Selecione um item") {
            alert("Por favor, selecione uma prateleira.");
            return;
         }
         if (formData.localArmazenamento.numeroLocalPrateleira === "Selecione um item") {
            alert("Por favor, selecione um local da prateleira.");
            return;
         }
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
        $("#atualizarProduto").prop("disabled", false);
        $("#salvarProduto").prop("disabled", true);
        var criterio = $("input[name='pesquisar']:checked").val();
        var valor = $("#campo").val().trim();
        var categoria = $("#item-categoria").val();

        // Validação de seleção de critério
        if (!criterio) {
            alert("Por favor, selecione um critério de busca.");
            limparCampos();
            return;
        }

        // Validação específica para o critério "categoria"
        if (criterio === "categoria" && categoria === "Selecione uma categoria") {
            alert("Por favor, selecione uma categoria válida.");
            limparCampos();
            return;
        }

        var data = {};

        // Construção dos dados com base no critério
        if (criterio === "codigo") {
            if (isNaN(valor)) {
                alert("Por favor, insira um código válido.");
                limparCampos();
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
                limparCampos();
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
                    $("#produtoId").val(data.id);
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

         
            },
            error: function (xhr) {
                alert("Erro ao buscar produto.");
                limparCampos();
            }
        });
    });
});
//Função para limpar os campos
function limparCampos() {
    $("#salvarProduto").prop("disabled", false);
    $("#atualizarProduto").prop("disabled", true);
    // Limpa todos os inputs de texto
    $("input[type='text'], input[type='number'], input[type='date']").val("");

    // Reseta os selects para a opção padrão (assumindo que a opção padrão tem value vazio)
    $("select").each(function () {
        $(this).val($(this).find("option:first").val());
    });

    // Limpa os textos de quantidade e status
    $("#quantidade").text("Quantidade do produto:");
    $("#status").text("Status:");
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
//Função para atualizar produto
$(document).ready(function () {
    $("#atualizarProduto").click(function (event) {
        event.preventDefault();
        const formData = {
            id: $("#produtoId").val() ? parseInt($("#produtoId").val()) : null,
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
            categoria: {
                nome: $("#categoria").val().trim()
            },
            troca: null,
            devolucao: null,
            localArmazenamento: {
                numeroPrateleira: $("#prateleira").val().trim(),
                numeroLocalPrateleira: $("#localPrateleira").val().trim(),
            },
            id: $("#produtoId").val() ? parseInt($("#produtoId").val()) : null
        };
        console.log($("#prateleira").val());
        console.log($("#localPrateleira").val());


        console.log("Form Data:", formData);

        $.ajax({
            type: "PUT",
            url: "/atualizar-produto",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("produto atualizado com sucesso!");
                window.location.href = "/produtos";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});

