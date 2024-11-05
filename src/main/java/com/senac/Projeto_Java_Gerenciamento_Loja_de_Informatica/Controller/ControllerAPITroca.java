
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceTroca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
@RequestMapping("/troca")
public class ControllerAPITroca {
    @Autowired
   ServiceTroca serviceTroca;
    
     @GetMapping("/buscar-troca/{id}")
  public ResponseEntity<Troca> pesquisar(@PathVariable Integer id){
     Troca trocaEncontrado = serviceTroca.buscarId(id);
     return new ResponseEntity<>(trocaEncontrado, HttpStatus.OK);
  }
}
