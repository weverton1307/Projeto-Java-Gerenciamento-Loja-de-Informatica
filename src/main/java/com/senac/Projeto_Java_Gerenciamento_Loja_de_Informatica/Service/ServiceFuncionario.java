
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryFuncionario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceFuncionario {
    @Autowired
     RepositoryFuncionario reposoitoryFuncionario;
    
     public Funcionario buscarId(Integer id){
        return reposoitoryFuncionario.findById(id).orElseThrow();
    }
}
