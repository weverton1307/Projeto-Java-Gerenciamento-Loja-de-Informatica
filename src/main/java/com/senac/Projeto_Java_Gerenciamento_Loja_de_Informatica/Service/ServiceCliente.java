
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCliente {
     @Autowired
     RepositoryCliente reposoitoryCliente;
     
      public Cliente buscarId(Integer id){
        return reposoitoryCliente.findById(id).orElseThrow();
    }
      
           public Cliente criarCliente(Cliente cliente){
        cliente.setId(null);
         reposoitoryCliente.save(cliente);
         return cliente;
    }
}
