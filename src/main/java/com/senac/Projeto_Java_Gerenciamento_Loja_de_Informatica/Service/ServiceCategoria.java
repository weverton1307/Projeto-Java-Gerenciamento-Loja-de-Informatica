
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Categoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCategoria {
     @Autowired
     RepositoryCategoria reposoitoryCategoria;
     
      public Categoria buscarId(Integer id){
        return reposoitoryCategoria.findById(id).orElseThrow();
    }
}