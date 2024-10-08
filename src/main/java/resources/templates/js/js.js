 //Login
 function validarUsuario(){
    const senha = document.getElementById('senha').value;
    if(document.getElementById("usuario").value == ""){
        alert("Por favor, digite o nome de usuário")
    }else if(document.getElementById("senha").value == ""){
        alert("Por favor, digite a senha de usuário")
    }   else if (senha.length < 3 || senha.length > 8) {
        alert("A senha deve ter entre 3 e 8 caracteres.");
        return;
}else{
    alert("Loguin realizado com sucesso!");
    window.location.href = "./menu.html";
}  

}
function sair(){
    window.location.href = "./logout.html";
}
//Fim login
//Produtos
const produto1 = {
    id: "1",
    nomeProduto: "notebook",
    valorCompra:  30000,
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
    }else{
        alert("Produto cadastrado com sucesso!");
        limparCamposProduto();
    }

}
function validarNumero(input) {
    const valor = input.value; 
    if (!/^\d*\.?\d*$/.test(valor)) {
        alert('Por favor, insira apenas números.');
        input.value = "";
    }
}
function alterarProduto(){
    alert("Atualização realizada com sucesso!");
    limparCamposProduto();
}
function buscarProduto(){
    alert("Busca realizada com sucesso!"); 
}
function voltarPagina(){
    window.location.href = "./menu.html";
}

//Fim produtos
//Funcionários

// Função para atualizar a tabela
function atualizarTabela() {
    const funcionario1 = {
        id: "1",
        nomeFuncionario: "Maria Sousa Silva",
        endereço:  "Gama setor leste quadra 7",
        cpf: "456.125.451-41",
        telefone: "(61)99141-9127",
        email: "maria@gmail.com",
        tipoUsuario: "Vendedor",
        ultimoLogin: "07:10 12/10/2024"
    };
    
    const funcionario2 = {
        id: "2",
        nomeFuncionario: "João Pereira Silva",
        endereço:  "Gama setor Oeste quadra 12",
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

//Fim funcionários
