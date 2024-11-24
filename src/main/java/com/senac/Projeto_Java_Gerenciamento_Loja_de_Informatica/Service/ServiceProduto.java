package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.ProdutosContado;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryProduto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceProduto {

    @Autowired
    RepositoryProduto reposoitoryProduto;

    public Produto buscarId(Integer id) {
        return reposoitoryProduto.findById(id).orElseThrow();
    }

    public Produto criarProduto(Produto produto) {
        produto.setId(null);
        reposoitoryProduto.save(produto);
        return produto;
    }

    public List<Produto> listarProduto() {
        return reposoitoryProduto.findAll();
    }

    public Produto atualizar(Integer id, Produto produto) {
        Produto vendaEncontrado = buscarId(id);
        vendaEncontrado.setCategoria(produto.getCategoria());
        vendaEncontrado.setCpf_cliente_devolucao(produto.getCpf_cliente_devolucao());
        vendaEncontrado.setDataAquisicao(produto.getDataAquisicao());
        vendaEncontrado.setDescricaoTecnica(produto.getDescricaoTecnica());
        vendaEncontrado.setDevolucao(produto.getDevolucao());
        vendaEncontrado.setFabricante(produto.getFabricante());
        vendaEncontrado.setLocalArmazenamento(produto.getLocalArmazenamento());
        vendaEncontrado.setModelo(produto.getModelo());
        vendaEncontrado.setNomeProduto(produto.getNomeProduto());
        vendaEncontrado.setNotaFiscal(produto.getNotaFiscal());
        vendaEncontrado.setQuantidadeProduto(produto.getQuantidadeProduto());
        vendaEncontrado.setStatusProduto(produto.getStatusProduto());
        vendaEncontrado.setTroca(produto.getTroca());
        vendaEncontrado.setValorCompra(produto.getValorCompra());
        vendaEncontrado.setValorVenda(produto.getValorVenda());
        return reposoitoryProduto.save(vendaEncontrado);
    }

    public void excluir(Integer id) {
        Produto produtoEncontrado = buscarId(id);
        reposoitoryProduto.deleteById(produtoEncontrado.getId());
    }

    public void atualizarQuantidadeproduto(Produto produto) {
        int quantidadeProduto = 0;
        List<Produto> listaprodutos = listarProduto();
        for (Produto p : listaprodutos) {
            if (p.getNomeProduto().equalsIgnoreCase(produto.getNomeProduto())) {
                quantidadeProduto = quantidadeProduto + 1;
            }
        }
        for (Produto p : listaprodutos) {
            if (p.getNomeProduto().equalsIgnoreCase(produto.getNomeProduto())) {
                p.setQuantidadeProduto(quantidadeProduto);
                atualizar(p.getId(), p);
            }
        }
    }

    public List<Produto> buscarProdutoNome(String nome) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();
        for (Produto p : listaProduto) {
            if (p.getNomeProduto().equalsIgnoreCase(nome)) {
                produtosEncontrados.add(p);
            }
        }
        return produtosEncontrados;
    }

    public List<Produto> buscarProdutoModelo(String modelo) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();

        for (Produto p : listaProduto) {
            if (modelo != null && modelo.equalsIgnoreCase(p.getModelo())) {
                produtosEncontrados.add(p);
            }
        }

        // Log de depuração para verificar os produtos filtrados
        produtosEncontrados.forEach(produto
                -> System.out.println("Produto encontrado: " + produto.getModelo()));

        return produtosEncontrados;
    }

    public List<Produto> buscarProdutoFabricante(String fabricante) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();
        for (Produto p : listaProduto) {
            if (p.getFabricante().equalsIgnoreCase(fabricante)) {
                produtosEncontrados.add(p);

            }
        }
        return produtosEncontrados;
    }

    public List<Produto> buscarProdutoDisponibilidade(String disponivel) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();
        for (Produto p : listaProduto) {
            if (p.getStatusProduto().equalsIgnoreCase(disponivel)) {
                produtosEncontrados.add(p);
            }
        }
        return produtosEncontrados;
    }

    public List<Produto> buscarProdutoDevolvido(int codigoDevolvido) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();
        for (Produto p : listaProduto) {
            if (p.getTroca() != null && p.getTroca().getTipo().equalsIgnoreCase("Troca") || p.getDevolucao() != null && p.getDevolucao().getTipo().equalsIgnoreCase("Devolução")) {
                produtosEncontrados.add(p);
            }
        }
        return produtosEncontrados;
    }

    public List<Produto> buscarProdutoCategoria(String categoria) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();
        for (Produto p : listaProduto) {
            if (p.getCategoria().getNome().equalsIgnoreCase(categoria)) {
                produtosEncontrados.add(p);
            }
        }
        return produtosEncontrados;
    }

    public void atualizarTroca(Troca troca) {
        Produto produto = buscarId(troca.getCodigoProduto());
        produto.setTroca(troca);
        produto.setStatusProduto("Devolvido");
        atualizar(produto.getId(), produto);
    }
     public void atualizarDevolucao(Devolucao devolucao) {
        Produto produto = buscarId(devolucao.getCodigoProduto());
        produto.setDevolucao(devolucao);
        produto.setStatusProduto("Devolvido");
        atualizar(produto.getId(), produto);
    }
     
public List<ProdutosContado> contarProdutosPorCategoria() {
    // Supondo que você tenha um repositório de produtos que retorna todos os produtos
    List<Produto> produtos = listarProduto();

    // Lista para armazenar os objetos com nome e quantidade de produto
    List<ProdutosContado> resultado = new ArrayList<>();

    // Contador de produtos
    Map<String, Long> contagemProdutos = new HashMap<>();

    // Contando a quantidade de cada produto
    for (Produto produto : produtos) {
        String nome = produto.getNomeProduto();
        contagemProdutos.put(nome, contagemProdutos.getOrDefault(nome, 0L) + 1);
    }

    // Criando os objetos Produto para retorno
    for (Map.Entry<String, Long> entry : contagemProdutos.entrySet()) {
        String nomeProduto = entry.getKey();
        Long quantidadeProduto = entry.getValue();

        // Adicionando à lista de resultado
        resultado.add(new ProdutosContado(nomeProduto, quantidadeProduto));
    }

    return resultado;
}
public Produto atualizarStatusVendido(Produto produto){
    produto.setStatusProduto("Vendido");
    atualizar(produto.getId(), produto);
    return produto;
}

}
