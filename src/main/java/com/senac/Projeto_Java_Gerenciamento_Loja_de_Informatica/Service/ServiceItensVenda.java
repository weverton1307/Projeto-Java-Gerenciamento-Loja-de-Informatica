
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Itens_venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryItensVenda;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceItensVenda {
    @Autowired
     RepositoryItensVenda reposoitoryItensVenda;
    
     public Itens_venda buscarId(Integer id){
        return reposoitoryItensVenda.findById(id).orElseThrow();
    }
     
          public Itens_venda criarItensVenda(Itens_venda itensVenda){
        itensVenda.setId(null);
         reposoitoryItensVenda.save(itensVenda);
         return itensVenda;
    }
          
          public List<Itens_venda> listarItensVenda() {
        return reposoitoryItensVenda.findAll();
    }
          
             public Itens_venda atualizar(Integer id, Itens_venda itensVenda){
        Itens_venda itensVendaEncontrada = buscarId(id);
       itensVendaEncontrada.setProduto(itensVenda.getProduto());
       itensVendaEncontrada.setQuantidade(itensVenda.getQuantidade());
       itensVendaEncontrada.setVenda(itensVenda.getVenda());
        return reposoitoryItensVenda.save(itensVendaEncontrada);
    }
             
                 public void excluir(Integer id){
        Itens_venda itensVendaEncontrada = buscarId(id);
        reposoitoryItensVenda.deleteById(itensVendaEncontrada.getId());
    }

}
