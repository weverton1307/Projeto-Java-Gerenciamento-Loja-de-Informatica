
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceVenda {
     @Autowired
     RepositoryVenda reposoitoryVenda;
     
      public Venda buscarId(Integer id){
        return reposoitoryVenda.findById(id).orElseThrow();
    }
}
