
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Categoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryCategoria;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCategoria {
     @Autowired
     RepositoryCategoria reposoitoryCategoria;
     
      public Categoria buscarId(Integer id){
        return reposoitoryCategoria.findById(id).orElseThrow();
    }
      
           public Categoria criarCategoria(Categoria categoria){
        categoria.setId(null);
         reposoitoryCategoria.save(categoria);
         return categoria;
    }
           
           public List<Categoria> listarCategoria() {
        return reposoitoryCategoria.findAll();
    }
              public Categoria atualizar(Integer id, Categoria categoria){
        Categoria categoriaEncontrada = buscarId(id);
        categoriaEncontrada.setNome(categoria.getNome());
        return reposoitoryCategoria.save(categoriaEncontrada);
    }

}
