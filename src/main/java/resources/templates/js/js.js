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
//função para atualizar produto cadastrado
function alterarProduto(){
    alert("Atualização realizada com sucesso!");
    limparCamposProduto();
}//função para buscar produto cadastrado
function buscarProduto(){
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
        }else {
            alert("Busca realizada com sucesso!"); 
            document.getElementById("campo").value = "";
        }
        document.getElementById("campo").value = "";
    } else if (document.getElementById('radio3').checked) { 
        const campoPesquisa = document.getElementById("campo").value;
        if (campoPesquisa === "") {
            alert("Por favor, digite o modelo do produto");
        }else {
            alert("Busca realizada com sucesso!"); 
            document.getElementById("campo").value = "";
        }
        document.getElementById("campo").value = "";
    } else if (document.getElementById('radio4').checked) {
        const campoPesquisa = document.getElementById("campo").value;
        if (campoPesquisa === "") {
            alert("Por favor, digite o fabricante do produto");
        }else {
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
        
        // Validação: Verifica se o valor da categoria é válido
        if (categoria === "Selecione uma categoria" || !categoria) {
            alert('Por favor, selecione uma categoria');
            return; // Impede a continuação da busca se a categoria não foi selecionada
        }
        
        alert("Busca realizada com sucesso!");
        atualizarTabelaCategoria(categoria);
        return;
    } else {
        alert('Selecione um critério de pesquisa.');
        return;
    }
    
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
function alterarFuncionario(){
    alert("Atualização realizada com sucesso!");
    limparCamposProduto();
}
//função apara buscar funcionário cadastrado
function buscarFuncionario(){
    const codigo =document.getElementById("pesquisar").value;
    if(codigo == "" ){
        alert("Por favor, preenche o campo pesquisar com o código  do funcionário");
    }else if (!/^\d+$/.test(codigo)) { 
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("pesquisar").value = "";
    }else {
        alert("Busca realizada com sucesso!"); 
        document.getElementById("pesquisar").value = "";
    }  
}
//função para atualizar funcionário cadastrado
function alterarFuncionario(){
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
function atualizarTabelaClientes() {
    const cliente1 = {
        id: "1",
        nomeCliente: "Samara dos Santos",
        endereço:  "Santa maria quadra 314 lote 3",
        cpf: "333.443.554-21",
        telefone: "(61)9458-2254",
        email: "samara@gmail.com",
        totalCompras: 5
    };
    
    const cliente2 = {
        id: "2",
        nomeCliente: "Paulo Ferreira Costa",
        endereço:  "Gama setor sul quadra 13 lote 3",
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
function salvarCliente(){
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
function buscarCliente(){
    const codigo =document.getElementById("pesquisar").value;
    if(codigo == "" ){
        alert("Por favor, preenche o campo pesquisar com o código  do cliente");
    }else if (!/^\d+$/.test(codigo)) { 
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("pesquisar").value = "";
    }else {
        alert("Busca realizada com sucesso!"); 
        document.getElementById("pesquisar").value = "";
    }  
    limparCamposFuncionario(); 
}
function alterarCliente(){
    alert("Atualização realizada com sucesso!");
    limparCamposFuncionario();
}
function limparCamposCliente(){
    document.getElementById('nomeCliente').value = '';
    document.getElementById('endereçoCliente').value = '';
    document.getElementById('cpfCliente').value = '';
    document.getElementById('telefoneCliente').value = '';
    document.getElementById('emailCliente').value = '';
}
//Fim clientes
//Devolução ou Troca
function atualizarTabelaDevolucaoOuTroca() {
    const devolvido = {
        id: "1",
        codigoProduto: "3",
        motivo: "O motivo é que o mouse está com o botão esquerdo sem funcionar",
        tipo:  "Devolução",
        data: "02/10/2024",
    };
    
    const troca = {
        id: "2",
        codigoProduto: "10",
        motivo: "O motivo é que o teclado está com o botão enter sem funcionar",
        tipo:  "troca",
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

function alterarDevolvido(){
    alert("Atualizado com sucesso!");
    limparCamposDevolvido();
}
function excluirDevolvido(){
    alert("Exclusão realizada com sucesso!");
    limparCamposDevolvido();
}
function buscarDevolvido(){
    const codigo =document.getElementById("pesquisar-devolucaoOuTroca").value;
    if(codigo == "" ){
        alert("Por favor, preenche o campo pesquisar com o código  do cliente");
    }else if (!/^\d+$/.test(codigo)) { 
        alert("Por favor, digite um número inteiro válido.");
        document.getElementById("pesquisar-devolucaoOuTroca").value = "";
    }else {
        alert("Busca realizada com sucesso!"); 
        document.getElementById("pesquisar-devolucaoOuTroca").value = "";
    }  
    limparCamposDevolvido();
}
function limparCamposDevolvido(){
    document.getElementById("codigo-devolucaoOuTroca").value = "";
    document.getElementById("motivo-devolucaoOuTroca").value = "";
    document.getElementById("data-devolucaoOuTroca").value = "";
    document.getElementById("pesquisar-devolucaoOuTroca").value = "";
}
//Fim Devolução ou Troca