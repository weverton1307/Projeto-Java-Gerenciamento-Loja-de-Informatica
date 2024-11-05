
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.ItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryItensVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceItensVenda {
    @Autowired
     RepositoryItensVenda reposoitoryItensVenda;
    
     public ItensVenda buscarId(Integer id){
        return reposoitoryItensVenda.findById(id).orElseThrow();
    }
}
