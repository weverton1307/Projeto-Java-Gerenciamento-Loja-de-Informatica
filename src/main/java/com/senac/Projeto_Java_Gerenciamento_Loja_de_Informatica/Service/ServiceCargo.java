
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryCargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCargo {
     @Autowired
     RepositoryCargo reposoitoryCargo;
     
      public Cargo buscarId(Integer id){
        return reposoitoryCargo.findById(id).orElseThrow();
    }
}