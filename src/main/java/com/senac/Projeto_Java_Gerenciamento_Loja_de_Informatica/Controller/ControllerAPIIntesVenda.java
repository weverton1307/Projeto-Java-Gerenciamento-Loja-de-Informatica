
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/venda")
public class ControllerAPIIntesVenda {
     @Autowired
   ServiceVenda serviceVenda;
    
     @GetMapping("/buscar-venda/{id}")
  public ResponseEntity<Venda> pesquisar(@PathVariable Integer id){
     Venda VendaEncontrado = serviceVenda.buscarId(id);
     return new ResponseEntity<>(VendaEncontrado, HttpStatus.OK);
  } 
}
