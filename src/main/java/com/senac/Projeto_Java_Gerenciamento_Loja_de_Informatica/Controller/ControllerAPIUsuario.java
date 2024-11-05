
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
