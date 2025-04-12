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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            if (p.getNomeProduto().trim().equalsIgnoreCase(produto.getNomeProduto().trim()) && p.getStatusProduto().trim().equalsIgnoreCase("Disponível")) {
                quantidadeProduto++;
            }
        }
        for (Produto p : listaprodutos) {
            if (p.getNomeProduto().trim().equalsIgnoreCase(produto.getNomeProduto().trim())) {
                p.setQuantidadeProduto(quantidadeProduto);
                System.out.println("quan"+quantidadeProduto);
                atualizar(p.getId(), p);
               
            }
        }
        Produto p = buscarId(11);
         System.out.println("depois de atualizar: "+ p.getNomeProduto()+ p.getQuantidadeProduto());
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

    public List<Produto> buscarProdutoDevolvido(String devolvido) {
        List<Produto> produtosEncontrados = new ArrayList<>();
        List<Produto> listaProduto = listarProduto();
        for (Produto p : listaProduto) {
            if (p.getStatusProduto().equalsIgnoreCase(devolvido)) {
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

    //Função para contar a quantidade de produtos
    public String contarProdutos() {
        StringBuilder mensagem = new StringBuilder();
        List<Produto> listaProdutos = listarProduto();
    
 
        for (Produto produto : listaProdutos) {
         String nome = produto.getNomeProduto();
         int quantidade = produto.getQuantidadeProduto();
          if(quantidade < 5){
              mensagem.append("• ").append(nome).append(": ").append(quantidade).append(" unidade(s)\n");
            }     
        }
        return mensagem.toString();
    }

    public Produto atualizarStatusVendido(Produto produto) {
        produto.setStatusProduto("Vendido");
        atualizar(produto.getId(), produto);
        return produto;
    }
    
    //Função para pesquisarProdutos
    public ResponseEntity<?> pesquisarProdutos(Integer id, String nome, String modelo, String fabricante, String disponibilidade, String devolvido, String categoria){
        if (id != null) {
            if (id <= 0) {
                return ResponseEntity.badRequest().body("ID inválido.");
            }
            System.out.println(modelo);
            Produto produtoEncontrado = buscarId(id);
            if (produtoEncontrado == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
            }

            return ResponseEntity.ok(produtoEncontrado);
        } else if (nome != null && !nome.trim().isEmpty()) {
            List<Produto> produtosEncontrados = buscarProdutoNome(nome);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (modelo != null && !modelo.trim().isEmpty()) {
            List<Produto> produtosEncontrados = buscarProdutoModelo(modelo);
            System.out.println("Produto encontrado: " + produtosEncontrados);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado para o modelo informado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (fabricante != null && !fabricante.trim().isEmpty()) {
            List<Produto> produtosEncontrados = buscarProdutoFabricante(fabricante);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado para o fabricante informado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (disponibilidade != null && !disponibilidade.trim().isEmpty()) {
            List<Produto> produtosEncontrados = buscarProdutoDisponibilidade(disponibilidade);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto disponível.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (devolvido != null) {
            List<Produto> produtosEncontrados = buscarProdutoDevolvido(devolvido);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto devolvido encontrado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (categoria != null && !categoria.trim().isEmpty()) {
            List<Produto> produtosEncontrados = buscarProdutoCategoria(categoria);
            System.out.println("dsfdssfsd: "+ produtosEncontrados.isEmpty());
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado para a categoria informada.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else {
            return ResponseEntity.badRequest().body("Informe um critério de busca válido.");
        }
       
    }

}
