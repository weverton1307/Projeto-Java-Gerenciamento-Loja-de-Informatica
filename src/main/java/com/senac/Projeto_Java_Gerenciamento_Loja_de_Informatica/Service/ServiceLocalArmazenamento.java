
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.LocalArmazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryLocalArmazenamento;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceLocalArmazenamento {
    @Autowired
     RepositoryLocalArmazenamento reposoitoryLocalArmazenamento;
    
     public LocalArmazenamento buscarId(Integer id){
        return reposoitoryLocalArmazenamento.findById(id).orElseThrow();
    }
     
          public LocalArmazenamento criarLocalArmazenamento(LocalArmazenamento localArmazenamento){
        localArmazenamento.setId(null);
         reposoitoryLocalArmazenamento.save(localArmazenamento);
         return localArmazenamento;
    }
          
          public List<LocalArmazenamento> listarLocalArmazenamento() {
        return reposoitoryLocalArmazenamento.findAll();
    }
}
