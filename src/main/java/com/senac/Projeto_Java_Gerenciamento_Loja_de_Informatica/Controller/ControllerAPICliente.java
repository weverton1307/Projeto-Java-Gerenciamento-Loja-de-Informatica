
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCliente;
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
@RequestMapping("/cliente")
public class ControllerAPICliente {
     @Autowired
   ServiceCliente serviceCliente;
    
     @GetMapping("/buscar-cliente/{id}")
  public ResponseEntity<Cliente> pesquisar(@PathVariable Integer id){
     Cliente clienteEncontrado = serviceCliente.buscarId(id);
     return new ResponseEntity<>(clienteEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-cliente")
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente){
       Cliente novoCliente = serviceCliente.criarCliente(cliente);
       return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-cliente")
    public ResponseEntity<List> listar(){
        List<Cliente> listaCliente = serviceCliente.listarCliente();
        return new ResponseEntity<>(listaCliente, HttpStatus.OK);
    }
}
