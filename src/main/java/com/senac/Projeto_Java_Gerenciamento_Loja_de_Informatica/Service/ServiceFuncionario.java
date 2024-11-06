
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryFuncionario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceFuncionario {
    @Autowired
     RepositoryFuncionario reposoitoryFuncionario;
    
     public Funcionario buscarId(Integer id){
        return reposoitoryFuncionario.findById(id).orElseThrow();
    }
     
          public Funcionario criarFuncionario(Funcionario funcionario){
        funcionario.setId(null);
         reposoitoryFuncionario.save(funcionario);
         return funcionario;
    }
          
          public List<Funcionario> listarFuncionario() {
        return reposoitoryFuncionario.findAll();
    }
          
             public Funcionario atualizar(Integer id, Funcionario funcionario){
        Funcionario funcionarioEncontrado = buscarId(id);
        funcionarioEncontrado.setCargo(funcionario.getCargo());
        funcionarioEncontrado.setCpf(funcionario.getCpf());
        funcionarioEncontrado.setEmail(funcionario.getEmail());
        funcionarioEncontrado.setEndereco(funcionario.getEndereco());
        funcionarioEncontrado.setNome(funcionario.getNome());
        funcionarioEncontrado.setTelefone(funcionario.getTelefone());
        funcionarioEncontrado.setUsuario(funcionario.getUsuario());
        return reposoitoryFuncionario.save(funcionarioEncontrado);
    }

}
