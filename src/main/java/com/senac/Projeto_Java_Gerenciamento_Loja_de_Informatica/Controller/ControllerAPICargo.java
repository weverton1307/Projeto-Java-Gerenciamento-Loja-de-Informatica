
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/cargo")
public class ControllerAPICargo {
     @Autowired
   ServiceCargo serviceCargo;
    
     @GetMapping("/buscar-cargo/{id}")
  public ResponseEntity<Cargo> pesquisar(@PathVariable Integer id){
     Cargo cargoEncontrado = serviceCargo.buscarId(id);
     return new ResponseEntity<>(cargoEncontrado, HttpStatus.OK);
  }
}
