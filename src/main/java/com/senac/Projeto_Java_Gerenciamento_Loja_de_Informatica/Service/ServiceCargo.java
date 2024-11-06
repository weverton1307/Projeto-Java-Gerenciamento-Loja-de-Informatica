
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryCargo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCargo {
     @Autowired
     RepositoryCargo reposoitoryCargo;
     
      public Cargo buscarId(Integer id){
        return reposoitoryCargo.findById(id).orElseThrow();
    }
      
           public Cargo criarCargo(Cargo cargo){
        cargo.setId(null);
         reposoitoryCargo.save(cargo);
         return cargo;
    }
           
           public List<Cargo> listarCargo() {
        return reposoitoryCargo.findAll();
    }
           
              public Cargo atualizar(Integer id, Cargo cargo){
        Cargo cargoEncontrado = buscarId(id);
        cargoEncontrado.setNome(cargo.getNome());
        return reposoitoryCargo.save(cargoEncontrado);
    }
              
                  public void excluir(Integer id){
        Cargo cargoEncontrado = buscarId(id);
        reposoitoryCargo.deleteById(cargoEncontrado.getId());
    }

}
