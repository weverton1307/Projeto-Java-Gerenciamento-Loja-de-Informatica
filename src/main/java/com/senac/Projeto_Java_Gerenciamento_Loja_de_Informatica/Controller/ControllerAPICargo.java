
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCargo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
  
       @PostMapping("/adicionar-cargo")
    public ResponseEntity<Cargo> criar(@RequestBody Cargo cargo){
       Cargo novaCargo = serviceCargo.criarCargo(cargo);
       return new ResponseEntity<>(novaCargo, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-cargo")
    public ResponseEntity<List> listar(){
        List<Cargo> listaCargo = serviceCargo.listarCargo();
        return new ResponseEntity<>(listaCargo, HttpStatus.OK);
    }
    
    @PutMapping("/atualizar-cargo/{id}")
    public ResponseEntity<Cargo> atualizar(@PathVariable Integer id, @RequestBody Cargo cargo){
        Cargo CargoAtualizado = serviceCargo.atualizar(id, cargo);
        return new ResponseEntity<>(CargoAtualizado, HttpStatus.OK);
    }
}
