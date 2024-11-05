
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCliente extends JpaRepository<Cliente, Integer>{
    
}
