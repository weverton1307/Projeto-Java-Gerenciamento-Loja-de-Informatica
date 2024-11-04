//Login
//Função para para validar usuário
function validarUsuario() {
    const senha = document.getElementById('senha').value;
    if (document.getElementById("usuario").value == "") {
        alert("Por favor, digite o nome de usuário")
    } else if (document.getElementById("senha").value == "") {
        alert("Por favor, digite a senha de usuário")
    } else if (senha.length < 3 || senha.length > 8) {
        alert("A senha deve ter entre 3 e 8 caracteres.");
        return;
    } else {
        alert("Loguin realizado com sucesso!");
        window.location.href = "./menu.html";
    }

}
//Função para sair do sistema
function sair() {
    window.location.href = "./logout.html";
}
//Fim login
//Produtos
const produto1 = {
    id: "1",
    nomeProduto: "notebook",
    valorCompra: 30000,
    modelo: "XPS (15)",
    notaFiscal: "nf243232",
    dataAquisicao: "12/12/2023",
    fabricante: "Dell",
    descricaoTecnica: "Processado i5, memória ram 8gb ssd 250gb",
    localArmazenamento: {
        numeroPrateleira: "1",
        numeroLocalPrateleira: "1"
    },
    categoria: {
        nome: "Dispositivos computacionais"
    },
    statusProduto: "Disponível"
};

const produto2 = {
    id: "2",
    nomeProduto: "mouse",
    valorCompra: 30,
    modelo: "sem fio",
    notaFiscal: "nf545645",
    dataAquisicao: "10/10/2023",
    fabricante: "positivo",
    descricaoTecnica: "Mouse sem fio cor preta",
    localArmazenamento: {
        numeroPrateleira: "1",
        numeroLocalPrateleira: "2"
    },
    categoria: {
        nome: "Periférico"
    },
    statusProduto: "Disponível"
};

const produtos = [produto1, produto2];
const tabelaReservas = document.getElementById('tabela-reservas');

produtos.forEach(produto => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nomeProduto}</td>
        <td>${produto.valorCompra}</td>
        <td>${produto.valorVenda || 'N/A'}</td>
        <td>${produto.quantidade || 'N/A'}</td>
        <td>${produto.modelo}</td>
        <td>${produto.notaFiscal}</td>
        <td>${produto.dataAquisicao}</td>
        <td>${produto.fabricante}</td>
        <td>${produto.descricaoTecnica}</td>
        <td>${produto.categoria.nome}</td>
        <td>${produto.localArmazenamento.numeroPrateleira}</td>
        <td>${produto.localArmazenamento.numeroLocalPrateleira}</td>
        <td>${produto.statusProduto}</td>
    `;
    tabelaReservas.appendChild(row);
});

//Função para limpar os campos
function limparCamposProduto() {

    document.getElementById('nome').value = '';
    document.getElementById('valorCompra').value = '';
    document.getElementById('valorVenda').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('fiscal').value = '';
    document.getElementById('data').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('prateleira').value = 'Selecione um item';
    document.getElementById('localPrateleira').value = 'Selecione um item';
    document.getElementById('categoria').value = 'Selecione um item';
}
//Função para para cadastrar produto
function salvarProduto() {
    const nome = document.getElementById('nome').value.trim();
    const valorCompra = document.getElementById('valorCompra').value.trim();
    const valorVenda = document.getElementById('valorVenda').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const fiscal = document.getElementById('fiscal').value.trim();
    const dataAquisicao = document.getElementById('data').value.trim();
    const fabricante = document.getElementById('fabricante').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const prateleira = document.getElementById('prateleira').value.trim();
    const localPrateleira = document.getElementById('localPrateleira').value.trim();
    const categoria = document.getElementById('categoria').value.trim();

    if (!nome || !valorCompra || !valorVenda || !modelo || !fiscal || !dataAquisicao ||
        !fabricante || !descricao || prateleira == "Selecione um item" ||
        localPrateleira == "Selecione um item" || categoria == "Selecione um item") {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    } else {
        alert("Produto cadastrado com sucesso!");
        limparCamposProduto();
    }

}
function validarNumero(input) {
    const valor = input.value;
    if (!/^\d*[.,]?\d*$/.test(valor)) {
        alert('Por favor, insira apenas números.');
        input.value = "";
    }
}
//função para atualizar produto cadastrado
function alterarProduto() {
    alert("Atualização realizada com sucesso!");
    limparCamposProduto();
}//função para buscar produto cadastrado
function buscarProduto() {
    if (document.getElementById('radio1').checked) {
        const campoPesquisa = document.getElementById("campo").value;

        if (campoPesquisa === "") {
            alert("Por favor, digite o código do produto");
        }
        else if (!/^\d+$/.test(campoPesquisa)) {
            alert("Por favor, digite um número inteiro válido.");
            document.getElementById("campo").value = "";
        }
        else {
            alert("Busca realizada com sucesso!");
            document.getElementById("campo").value = "";
        }
    } else if (document.getElementById('radio2').checked) {
        const campoPesquisa = document.getElementById("campo").value;
        if (campoPesquisa === "") {
            alert("Por favor, digite o nome do produto");
        } else {
            alert("Busca realizada com sucesso!");
            document.getElementById("campo").value = "";
        }
        document.getElementById("campo").value = "";
    } else if (document.getElementById('radio3').checked) {
        const campoPesquisa = document.getElementById("campo").value;
        if (campoPesquisa === "") {
            alert("Por favor, digite o modelo do produto");
        } else {
            alert("Busca realizada com sucesso!");
            document.getElementById("campo").value = "";
        }
        document.getElementById("campo").value = "";
    } else if (document.getElementById('radio4').checked) {
        const campoPesquisa = document.getElementById("campo").value;
        if (campoPesquisa === "") {
            alert("Por favor, digite o fabricante do produto");
        } else {
            alert("Busca realizada com sucesso!");
            document.getElementById("campo").value = "";
        }
        document.getElementById("campo").value = "";
    } else if (document.getElementById('radio5').checked) {
        alert("Busca realizada com sucesso!");
        atualizarTabelaStatus("Disponível");
        return;
    } else if (document.getElementById('radio6').checked) {
        alert("Busca realizada com sucesso!");
        atualizarTabelaDevolvido('Devolvido');
        return;
    } else if (document.getElementById('radio7').checked) {
        const categoria = document.getElementById('item-categoria').value;

        if (categoria === "Selecione uma categoria" || !categoria) {
            alert('Por favor, selecione uma categoria');
            return;
        }

        alert("Busca realizada com sucesso!");
        atualizarTabelaCategoria(categoria);
        return;
    } else {
        alert('Selecione um critério de pesquisa.');
        return;
    }

}
//Função para voltar para o menu
function voltarPagina() {
    window.location.href = "./menu.html";
}

//Fim produtos
//Funcionários

// Função para atualizar a tabela
function atualizarTabela() {
    const funcionario1 = {
        id: "1",
        nomeFuncionario: "Maria Sousa Silva",
        endereço: "Gama setor leste quadra 7",
        cpf: "456.125.451-41",
        telefone: "(61)99141-9127",
        email: "maria@gmail.com",
        tipoUsuario: "Vendedor",
        ultimoLogin: "07:10 12/10/2024"
    };

    const funcionario2 = {
        id: "2",
        nomeFuncionario: "João Pereira Silva",
        endereço: "Gama setor Oeste quadra 12",
        cpf: "455.212.777-74",
        telefone: "(61)99177-9128",
        email: "joao@gmail.com",
        tipoUsuario: "Gerente",
        ultimoLogin: "16:00 07/10/2024"
    };

    const funcionarios = [funcionario1, funcionario2];
    const tabelaFuncionario = document.getElementById('tabela-funcionario');
    tabelaFuncionario.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nomeFuncionario}</td>
            <td>${funcionario.endereço}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.tipoUsuario}</td>
            <td>${funcionario.telefone}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.tipoUsuario}</td>
            <td>${funcionario.ultimoLogin}</td>
        `;
        tabelaFuncionario.appendChild(row);
    });
}
//Função para limpar os campos 
function limparCamposFuncionario() {
    document.getElementById('nomeFuncionario').value = '';
    document.getElementById('endereço').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cargo').value = 'Selecione um item';
    document.getElementById('nomeUsuario').value = '';
    document.getElementById('senha').value = '';
}

//Função para cadastrar funcionários
function salvarFuncionario() {
    if (!validarCampos()) {
        return false;
    }
    const nomeFuncionario = document.getElementById('nomeFuncionario').value.trim();
    const EnderecoFuncionario = document.getElementById('endereço').value.trim();
    const cpfFuncionario = document.getElementById('cpf').value.trim();
    const telefoneFuncionario = document.getElementById('telefone').value.trim();
    const emailFuncionario = document.getElementById('email').value.trim();
    const cargoFuncionario = document.getElementById('cargo').value.trim();
    const usuarioFuncionario = document.getElementById('nomeUsuario').value.trim();
    const senhaFuncionario = document.getElementById('senha').value.trim();
    const tipoUsuarioFuncionario = cargoFuncionario;

    if (!nomeFuncionario || !EnderecoFuncionario || !cpfFuncionario || !telefoneFuncionario || !emailFuncionario || cargoFuncionario === "Selecione um item" ||
        !usuarioFuncionario || !senhaFuncionario) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    } else {
        alert("Funcionário cadastrado com sucesso!");
        limparCamposFuncionario();
    }

    return true;
}
//função para atualizar funcionário cadastrado
function alterarFuncionario() {
    alert("Atualização realizada com sucesso!");
    limparCamposProduto();
}
//função apara buscar funcionário cadastrado
function buscarFuncionario() {
    const codigo = document.getElementById("pesquisar").value;
    if (codigo == "") {
        alert("Por favor, preenche o campo pesquisar com o código  do funcionário");
    } else if (!/^\d+$/.test(codigo)) {
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("pesquisar").value = "";
    } else {
        alert("Busca realizada com sucesso!");
        document.getElementById("pesquisar").value = "";
    }
}
//função para atualizar funcionário cadastrado
function alterarFuncionario() {
    alert("Atualização realizada com sucesso!");
}
//validar campos
function validarCampos() {
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        alert('Por favor, insira o CPF no formato: xxx.xxx.xxx-xx');
        return false;
    }

    const telefoneRegex = /^\(\d{2}\)\d{4}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, insira o telefone no formato: (xx)xxxx-xxxx');
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido no formato: exemplo@dominio.com');
        return false;
    }

    return true;
}
//Fim funcionários
//Clientes
//Função para atualizar tabela de clientes
function atualizarTabelaClientes() {
    const cliente1 = {
        id: "1",
        nomeCliente: "Samara dos Santos",
        endereço: "Santa maria quadra 314 lote 3",
        cpf: "333.443.554-21",
        telefone: "(61)9458-2254",
        email: "samara@gmail.com",
        totalCompras: 5
    };

    const cliente2 = {
        id: "2",
        nomeCliente: "Paulo Ferreira Costa",
        endereço: "Gama setor sul quadra 13 lote 3",
        cpf: "112.221.221-76",
        telefone: "(61)3323-6767",
        email: "paulo@gmail.com",
        totalCompras: 2
    };

    const clientes = [cliente1, cliente2];
    const tabelaClientes = document.getElementById('tabela-cliente');
    tabelaClientes.innerHTML = '';

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nomeCliente}</td>
            <td>${cliente.endereço}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.totalCompras}</td>
        `;
        tabelaClientes.appendChild(row);
    });
}
//validar campos
function validarCamposCliente() {
    const cpf = document.getElementById('cpfCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    const email = document.getElementById('emailCliente').value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        alert('Por favor, insira o CPF no formato: xxx.xxx.xxx-xx');
        return false;
    }

    const telefoneRegex = /^\(\d{2}\)\d{4}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, insira o telefone no formato: (xx)xxxx-xxxx');
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido no formato: exemplo@dominio.com');
        return false;
    }

    return true;
}
//função para cadastrar clientes
function salvarCliente() {
    if (!validarCamposCliente()) {
        return false;
    }
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const EnderecoCliente = document.getElementById('endereçoCliente').value.trim();
    const cpfCliente = document.getElementById('cpfCliente').value.trim();
    const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
    const emailCliente = document.getElementById('emailCliente').value.trim();
    if (!nomeCliente || !EnderecoCliente || !cpfCliente || !telefoneCliente || !emailCliente) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    } else {
        alert("Cliente cadastrado com sucesso!");
        limparCamposCliente();
    }

    return true;
}
//Função para buscar cliente
function buscarCliente() {
    const codigo = document.getElementById("pesquisar").value;
    if (codigo == "") {
        alert("Por favor, preenche o campo pesquisar com o código  do cliente");
    } else if (!/^\d+$/.test(codigo)) {
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("pesquisar").value = "";
    } else {
        alert("Busca realizada com sucesso!");
        document.getElementById("pesquisar").value = "";
    }
    limparCamposFuncionario();
}
//Função para atualizar cliente
function alterarCliente() {
    alert("Atualização realizada com sucesso!");
    limparCamposFuncionario();
}
//Função para limpar campos de cliente
function limparCamposCliente() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('endereçoCliente').value = '';
    document.getElementById('cpfCliente').value = '';
    document.getElementById('telefoneCliente').value = '';
    document.getElementById('emailCliente').value = '';
}
//Fim clientes
//Devolução ou Troca
//Função para atualizar tabela de produtos devolvidos
function atualizarTabelaDevolucaoOuTroca() {
    const devolvido = {
        id: "1",
        codigoProduto: "3",
        motivo: "O motivo é que o mouse está com o botão esquerdo sem funcionar",
        tipo: "Devolução",
        data: "02/10/2024",
    };

    const troca = {
        id: "2",
        codigoProduto: "10",
        motivo: "O motivo é que o teclado está com o botão enter sem funcionar",
        tipo: "troca",
        data: "03/10/2024",
    };

    const devolvidos = [devolvido, troca];
    const tabelaDevolvidos = document.getElementById('tabela-devolucaoOuTroca');
    tabelaDevolvidos.innerHTML = '';

    devolvidos.forEach(devolvido => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${devolvido.id}</td>
            <td>${devolvido.codigoProduto}</td>
            <td>${devolvido.motivo}</td>
            <td>${devolvido.tipo}</td>
            <td>${devolvido.data}</td>
        `;
        tabelaDevolvidos.appendChild(row);
    });
}
//Função para para cadastrar produto devolvido
function salvarDevolvido() {
    const devolucao = document.getElementById("radioDevolucao").checked;
    const troca = document.getElementById("radioTroca").checked;
    const codigoProduto = document.getElementById("codigo-devolucaoOuTroca").value;
    const motivo = document.getElementById("motivo-devolucaoOuTroca").value;
    const data = document.getElementById("data-devolucaoOuTroca").value;

    if (!devolucao && !troca) {
        alert("Por favor, selecione Devolução ou Troca.");
        return;
    }

    if (!codigoProduto || !motivo || !data) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    if (!/^\d+$/.test(codigoProduto)) {
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("codigo-devolucaoOuTroca").value = "";
        return;
    }
    alert("Salvo com sucesso!");
    limparCamposDevolvido();
}
//Função para atualizar produto devolvido
function alterarDevolvido() {
    alert("Atualizado com sucesso!");
    limparCamposDevolvido();
}
//Função para excluir produto devolvido
function excluirDevolvido() {
    alert("Exclusão realizada com sucesso!");
    limparCamposDevolvido();
}
//Função para buscar produto devolvido
function buscarDevolvido() {
    const codigo = document.getElementById("pesquisar-devolucaoOuTroca").value;
    if (codigo == "") {
        alert("Por favor, preenche o campo pesquisar com o código  do cliente");
    } else if (!/^\d+$/.test(codigo)) {
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("pesquisar-devolucaoOuTroca").value = "";
    } else {
        alert("Busca realizada com sucesso!");
        document.getElementById("pesquisar-devolucaoOuTroca").value = "";
    }
    limparCamposDevolvido();
}
//Função para limpar campos de produto devolvido
function limparCamposDevolvido() {
    document.getElementById("codigo-devolucaoOuTroca").value = "";
    document.getElementById("motivo-devolucaoOuTroca").value = "";
    document.getElementById("data-devolucaoOuTroca").value = "";
    document.getElementById("pesquisar-devolucaoOuTroca").value = "";
}
//Fim Devolução ou Troca
//Registro de venda
const produto4 = {
    id: "1",
    nomeProduto: "notebook",
    valorCompra: 30000,
    modelo: "XPS (15)",
    notaFiscal: "nf243232",
    dataAquisicao: "12/12/2023",
    fabricante: "Dell",
    descricaoTecnica: "Processado i5, memória ram 8gb ssd 250gb",
    localArmazenamento: {
        numeroPrateleira: "1",
        numeroLocalPrateleira: "1"
    },
    categoria: {
        nome: "Dispositivos computacionais"
    },
    statusProduto: "Disponível"
};

const produto3 = {
    id: "2",
    nomeProduto: "mouse",
    valorCompra: 30,
    modelo: "sem fio",
    notaFiscal: "nf545645",
    dataAquisicao: "10/10/2023",
    fabricante: "positivo",
    descricaoTecnica: "Mouse sem fio cor preta",
    localArmazenamento: {
        numeroPrateleira: "1",
        numeroLocalPrateleira: "2"
    },
    categoria: {
        nome: "Periférico"
    },
    statusProduto: "Disponível"
};
//Função para limpar campos do registro de venda
function limparCampoRegistroVenda() {
    document.getElementById("cpfClienteVenda").value = "";
    document.getElementById("codigoProduto-venda").value = "";
    document.getElementById("quantidadeProduto-venda").value = "";
    document.getElementById("metodo-pagamento").value = "selecione um item";
    document.getElementById("funcionario-venda").value = "selecione um item";
    document.getElementById("codigoProduto-venda").disabled = true;
    document.getElementById("quantidadeProduto-venda").disabled = true;
    document.getElementById("buscar-produto").disabled = true;
    document.getElementById("cancelar-venda").disabled = true;
    document.getElementById("finalizar-venda").disabled = true;
    document.getElementById("Adicionar-venda").disabled = true;
    document.getElementById("tabela-registro").innerHTML = "";
}
//Função para gerar venda
function gerarVenda() {
    const metodoPagamento = document.getElementById("metodo-pagamento").value;
    const funcionario = document.getElementById("funcionario-venda").value;

    if (metodoPagamento === "selecione um item") {
        alert("Por favor, selecione um método de pagamento")
    } else if (funcionario === "selecione um item") {
        alert("Por favor, selecione um funcionário")
    } else {
        validarCamposRegistroVenda();
    }
}
//Função para buscar produtos para venda
function buscarprodutosRegistroVenda() {
    const codigo = document.getElementById("codigoProduto-venda").value;
    const quantidade = document.getElementById("quantidadeProduto-venda").value;
    if (codigo === "" || quantidade === "") {
        alert("Por favor, preenche os campos vazios")
    } else {
        validarProdutoBuscado();
    }
}
//Função para adicionar um produto
function adicionar() {
    const produto = "Teclado";
    const quantidade = document.getElementById("quantidadeProduto-venda").value;
    const valor = 30;
    const subTotal = valor * quantidade;

    document.getElementById("venda-numero").innerHTML = '<h2 id="venda-numero">Venda: 1</h2>';

    document.getElementById("itens-Registro").innerHTML = '<h2 id="itens-Registro">R$ ' + subTotal + ',00</h2>';

    const tabelaRegistro = document.getElementById('tabela-registro');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${produto}</td>
        <td>${quantidade}</td>
        <td>${valor}</td>
        <td>${subTotal}</td>
    `;
    tabelaRegistro.appendChild(row);
    document.getElementById("finalizar-venda").disabled = false;
}
//Função para registrar venda
function registrarVenda() {
    alert("Venda realizada com sucesso!");
    limparCampoRegistroVenda();
    document.getElementById("venda-numero").innerHTML = '<h2 id="venda-numero">Venda</h2>';
    document.getElementById("itens-Registro").textContent = 'Itens';

}
//Função para cancelar venda
function cancelarVenda() {
    limparCampoRegistroVenda();
    document.getElementById("venda-numero").innerHTML = '<h2 id="venda-numero">Venda</h2>';
    document.getElementById("itens-Registro").textContent = 'Itens';

    alert("Venda cancelada com sucesso!")
}
//Função para validar campos do registro de venda
function validarCamposRegistroVenda() {
    const cpf = document.getElementById('cpfClienteVenda').value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (cpf === "") {
        document.getElementById("codigoProduto-venda").disabled = false;
        document.getElementById("quantidadeProduto-venda").disabled = false;
        document.getElementById("buscar-produto").disabled = false;
        document.getElementById("cancelar-venda").disabled = false;
    } else if (cpf != "") {
        if (!cpfRegex.test(cpf)) {
            alert('Por favor, insira o CPF no formato: xxx.xxx.xxx-xx');
            return false;
        } else {
            document.getElementById("codigoProduto-venda").disabled = false;
            document.getElementById("quantidadeProduto-venda").disabled = false;
            document.getElementById("buscar-produto").disabled = false;
            document.getElementById("cancelar-venda").disabled = false;
        }
    }
}
//Função para validar produto buscado
function validarProdutoBuscado() {
    const codigo = document.getElementById("codigoProduto-venda").value;
    const quantidade = document.getElementById("quantidadeProduto-venda").value;
    if (!/^\d+$/.test(codigo)) {
        alert("Por favor, digite no campo código um número inteiro válido.");
    } else if (!/^\d+$/.test(quantidade)) {
        alert("Por favor, digite no campo quantidade um número inteiro válido.")
    } else {
        document.getElementById("h6").innerHTML = `
        <h6>Nome do produto: Teclado</h6><br>
        <h6>Valor: R$ 30,00 reais</h6><br>
        <h6>Cliente: João da Silva</h6><br>
    `;
        document.getElementById("Adicionar-venda").disabled = false;
    }
}

//Fim registro de venda
//vendas
//Função para gerar relatório
function gerarRelatorio() {
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFinal = new Date(document.getElementById('dataFinal').value);

    const minDate = new Date('1950-01-01');
    const maxDate = new Date('2100-12-31');

    if (document.getElementById("dataInicio").value == "") {
        alert("Por favor, digite uma data de início")
    } else if (document.getElementById("dataFinal").value == "") {
        alert("Por favor, digite uma data final")
    } else if (dataInicio < minDate || dataInicio > maxDate || dataFinal < minDate || dataFinal > maxDate) {
        alert("As datas devem estar entre 1950 e 2100.");
    } else {
        let produtosMaisVendidos = "<ol><li>Teclado</li><li>Mouse</li><li>Cartucho de Impressora</li><li>Placa de Vídeo</li><li>Notebook</li></ol>";
        let totalVendas = "<li>120 vendas</li>";
        let mediaLucro = "<li>R$ 500,00</li>";
        let totalProdutosDevolvido = "<li>10 produtos devolvidos</li>";
        let metodoPagamentoMaisUsado = "<li>Cartão de crédito</li>";
        let clientesMaisFrequentes = "<li>Sandra Pereira Sousa</li><li>Marcio Gonçalves</li><li>Aline dos Santos</li>";
        let faturamentoTotal = "<li>R$ 35.000,00</li>";
        let lucroTotal = "<li>R$ 4.000,00</li>";
        localStorage.setItem('relatorioProdutosMaisVendidos', produtosMaisVendidos);
        localStorage.setItem('relatorioTotalVendas', totalVendas);
        localStorage.setItem('relatorioMediaLucro', mediaLucro);
        localStorage.setItem('relatorioTotalProdutosDevolvido', totalProdutosDevolvido);
        localStorage.setItem('relatorioMetodoPagamentoMaisUsado', metodoPagamentoMaisUsado);
        localStorage.setItem('relatorioClientesMaisFrequentes', clientesMaisFrequentes);
        localStorage.setItem('relatorioFaturamentoTotal', faturamentoTotal);
        localStorage.setItem('relatorioLucroTotal', lucroTotal);
        window.location.href = "./relatorio.html";
    }
}
//Função para buscar vendas por critério
function pesquisarVenda() {
    if (document.getElementById("criterio-selecionar").value == "id") {
        if (document.getElementById("criterio-pesquisa").value == "") {
            alert("Por favor, preencha o campo de pesquisar.");
        } else if (!/^\d+$/.test(document.getElementById("criterio-pesquisa").value)) {
            alert("Por favor, digite um número inteiro válido.");
            document.getElementById("criterio-pesquisa").value = "";
        } else {
            document.getElementById("resultado-pesquisa-codigo").innerHTML =
                `<h5>id: 1</h5>
                 <h5>Status: Vendido </h5>
                 <h5>Data e hora:12/12/2023 16:00</h5>
                 <h5>Método de pagamento: Pix</h5>
                 <h5>Nome do vendedor: João</h5>
                 <h5>Nome do cliente:Maria</h5>
                 <h5>CPF do cliente: 545.548.541-78</h5>`;


            let tabelaItens = document.getElementById("tabela-pesquisa");
            tabelaItens.innerHTML = "";

            let novaLinha = `
                <tr>
                    <td>teclado</td> 
                    <td>2</td> 
                    <td>30</td>
                    <td>60</td> 
                </tr>`;
            tabelaItens.innerHTML += novaLinha;
            document.getElementById("criterio-pesquisa").value = "";
        }


    } else if (document.getElementById("criterio-selecionar").value == "CPF do cliente") {
        const cpf = document.getElementById('criterio-pesquisa').value;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (document.getElementById("criterio-pesquisa").value == "") {
            alert('Por favor, preencha o campo de pesquisar');
        } else if (!cpfRegex.test(cpf)) {
            alert('Por favor, insira o CPF no formato: xxx.xxx.xxx-xx');
            document.getElementById('criterio-pesquisa').value ="";
            return false;
        } else {
            document.getElementById("resultado-pesquisa-codigo").innerHTML =
                `<h5>id: 2</h5>
             <h5>Status: Cancelado </h5>
             <h5>Data e hora:14/12/2023 15:00</h5>
             <h5>Método de pagamento: Dinheiro</h5>
             <h5>Nome do vendedor: João</h5>
             <h5>Nome do cliente:Snadra</h5>
             <h5>CPF do cliente: 885.544.541-58</h5>`;


            let tabelaItens = document.getElementById("tabela-pesquisa");
            tabelaItens.innerHTML = "";

            let novaLinha = `
            <tr>
                <td>mouse</td> 
                <td>1</td> 
                <td>20</td>
                <td>20</td> 
            </tr>`;
            tabelaItens.innerHTML += novaLinha;
            document.getElementById('criterio-pesquisa').value ="";
        }

    } else if (document.getElementById("criterio-selecionar").value == "Nome do vendedor") {
        if (document.getElementById("criterio-pesquisa").value == "") {
            alert('Por favor, preencha o campo de pesquisar');
        } else {
            let tabelaItens = document.getElementById("tabela-busca");
            tabelaItens.innerHTML = "";

            let novaLinha = `
                    <tr> 
                        <td>4</td> 
                        <td>placa de vídeo</td> 
                    </tr>`;
            tabelaItens.innerHTML += novaLinha;
        }

    } else if (document.getElementById("criterio-selecionar").value == "Data da venda") {
        const dataPesquisa = new Date(document.getElementById('criterio-pesquisa').value);

        const minDate = new Date('1950-01-01');
        const maxDate = new Date('2100-12-31');

        if (document.getElementById("criterio-pesquisa").value == "") {
            alert('Por favor, preencha o campo de pesquisar');
        } else if (dataPesquisa < minDate || dataPesquisa > maxDate) {
            alert("A data deve estar entre 1950 e 2100.");
        } else {
            let tabelaItens = document.getElementById("tabela-busca");
            tabelaItens.innerHTML = "";

            let novaLinha = `
                    <tr> 
                        <td>5</td> 
                        <td>mouse sem fio</td> 
                    </tr>`;
            tabelaItens.innerHTML += novaLinha;
        }


    } else if (document.getElementById("criterio-selecionar").value == "Status") {
        if (document.getElementById("criterio-pesquisa").value == "") {
            alert('Por favor, preencha o campo de pesquisar');
        } else if (document.getElementById("criterio-pesquisa").value !== "Vendido" && 
        document.getElementById("criterio-pesquisa").value !== "Cancelada") {
   alert('Por favor, insira o status: "Vendido" ou "Cancelada"');
} else {
         if(document.getElementById("criterio-pesquisa").value === "Vendido"){
 let tabelaItens = document.getElementById("tabela-busca");
            tabelaItens.innerHTML = "";

            let novaLinha = `
                    <tr> 
                        <td>6</td> 
                        <td>HD</td> 
                    </tr>`;
            tabelaItens.innerHTML += novaLinha;
         }else{
            let tabelaItens = document.getElementById("tabela-busca");
            tabelaItens.innerHTML = "";

            let novaLinha = `
                    <tr> 
                        <td>8</td> 
                        <td>Monitor</td> 
                    </tr>`;
                    
            tabelaItens.innerHTML += novaLinha;
         }
           
        }

    } else if (document.getElementById("criterio-selecionar").value == "Método de pagamento") {
        const pesquisa = document.getElementById("criterio-pesquisa").value;
        if (pesquisa == "") {
            alert('Por favor, preencha o campo de pesquisar');
        } else if (pesquisa !== "Pix" && 
            pesquisa !== "Dinheiro" && 
            pesquisa !== "Cartão de crédito" && 
            pesquisa !== "Cartão de débito") {
       alert('Por favor, insira o método de pagamento: "Pix" ou "Dinheiro" ou "Cartão de crédito" ou "Cartão de débito"');
   } else {
            let tabelaItens = document.getElementById("tabela-busca");
            tabelaItens.innerHTML = "";

            if (pesquisa === "Pix") {
                let novaLinha = `
                    <tr>
                        <td>1</td>
                        <td>SSD</td>
                    </tr>`;
                tabelaItens.innerHTML += novaLinha;
            
            } else if (pesquisa === "Dinheiro") {
                let novaLinha = `
                    <tr>
                        <td>2</td>
                        <td>Mouse</td>
                    </tr>`;
                tabelaItens.innerHTML += novaLinha;
            
            } else if (pesquisa === "Cartão de crédito") {
                let novaLinha = `
                    <tr>
                        <td>3</td>
                        <td>Teclado</td>
                    </tr>`;
                tabelaItens.innerHTML += novaLinha;
            
            } else if (pesquisa === "Cartão de débito") {
                let novaLinha = `
                    <tr>
                        <td>4</td>
                        <td>Notebook</td>
                    </tr>`;
                tabelaItens.innerHTML += novaLinha;
            
            } else {
                let novaLinha = `
                    <tr>
                        <td>5</td>
                        <td>Produto desconhecido</td>
                    </tr>`;
                tabelaItens.innerHTML += novaLinha;
        }

    }
 }else {
        alert("Por favor, selecione um critério de pesquisa")
    }
}
// Função para limpar os campos
function limparTudo() {

    document.getElementById('dataInicio').value = '';
    document.getElementById('dataFinal').value = '';

    document.getElementById('criterio-pesquisa').value = '';
    document.getElementById('criterio-selecionar').selectedIndex = 0;

    document.getElementById('tabela-pesquisa').innerHTML = '';
    document.getElementById('tabela-busca').innerHTML = '';

    document.getElementById('resultado-pesquisa-codigo').innerHTML = `
        <h5>id:</h5>
        <h5>Status:</h5>
        <h5>Data e hora:</h5>
        <h5>Método de pagamento:</h5>
        <h5>Nome do vendedor:</h5>
        <h5>Nome do cliente:</h5>
        <h5>CPF do cliente:</h5>
    `;
}
//Fim vendas