
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Categoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCategoria;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categoria")
public class ControllerAPICategoria {
    @Autowired
   ServiceCategoria serviceCategoria;
    
     @GetMapping("/buscar-categoria/{id}")
  public ResponseEntity<Categoria> pesquisar(@PathVariable Integer id){
     Categoria categoriaEncontrada = serviceCategoria.buscarId(id);
     return new ResponseEntity<>(categoriaEncontrada, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-categoria")
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria){
       Categoria novaCategoria = serviceCategoria.criarCategoria(categoria);
       return new ResponseEntity<>(novaCategoria, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-categoria")
    public ResponseEntity<List> listar(){
        List<Categoria> listaCategoria = serviceCategoria.listarCategoria();
        return new ResponseEntity<>(listaCategoria, HttpStatus.OK);
    }
}
