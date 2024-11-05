
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceUsuario {
    @Autowired
     RepositoryUsuario reposoitoryUsuario;
    
     public Usuario buscarId(Integer id){
        return reposoitoryUsuario.findById(id).orElseThrow();
    }
}
