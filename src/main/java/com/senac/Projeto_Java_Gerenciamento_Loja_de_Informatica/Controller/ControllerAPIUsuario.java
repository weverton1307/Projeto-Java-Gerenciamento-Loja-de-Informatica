
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceUsuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class ControllerAPIUsuario {
     @Autowired
   ServiceUsuario serviceUsuario;
    
     @GetMapping("/buscar-usuario/{id}")
  public ResponseEntity<Usuario> pesquisar(@PathVariable Integer id){
     Usuario usuarioEncontrado = serviceUsuario.buscarId(id);
     return new ResponseEntity<>(usuarioEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-usuario")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario){
       Usuario novoUsuario = serviceUsuario.criarUsuario(usuario);
       return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-usuario")
    public ResponseEntity<List> listar(){
        List<Usuario> listaUsuario = serviceUsuario.listarUsuario();
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }
    
    @PutMapping("/atualizar-usuario/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Integer id, @RequestBody Usuario usuario){
        Usuario usuarioAtualizado = serviceUsuario.atualizar(id, usuario);
        return new ResponseEntity<>(usuarioAtualizado, HttpStatus.OK);
    }
 
     @DeleteMapping("excluir-usuario/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id){
        serviceUsuario.excluir(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
