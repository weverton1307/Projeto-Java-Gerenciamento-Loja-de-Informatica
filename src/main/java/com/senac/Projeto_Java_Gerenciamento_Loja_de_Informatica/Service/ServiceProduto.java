
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryProduto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceProduto {
    @Autowired
     RepositoryProduto reposoitoryProduto;
    
     public Produto buscarId(Integer id){
        return reposoitoryProduto.findById(id).orElseThrow();
    }
     
          public Produto criarProduto(Produto produto){
        produto.setId(null);
         reposoitoryProduto.save(produto);
         return produto;
    }
          
          public List<Produto> listarProduto() {
        return reposoitoryProduto.findAll();
    }
          
             public Produto atualizar(Integer id, Produto produto){
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

}
