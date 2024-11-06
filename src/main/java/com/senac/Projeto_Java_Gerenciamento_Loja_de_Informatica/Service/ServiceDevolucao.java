
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryDevolucao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceDevolucao {
     @Autowired
     RepositoryDevolucao reposoitoryDevolucao;
     
      public Devolucao buscarId(Integer id){
        return reposoitoryDevolucao.findById(id).orElseThrow();
    }
      
           public Devolucao criarDevolucao(Devolucao devolucao){
        devolucao.setId(null);
         reposoitoryDevolucao.save(devolucao);
         return devolucao;
    }
}
