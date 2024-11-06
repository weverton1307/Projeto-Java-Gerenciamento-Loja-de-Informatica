
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
}
