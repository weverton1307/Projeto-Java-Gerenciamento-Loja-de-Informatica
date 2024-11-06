
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.LocalArmazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceLocalArmazenamento;
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
@RequestMapping("/localArmazenamento")
public class ControllerAPILocalArmazenamento {
     @Autowired
   ServiceLocalArmazenamento serviceLocalArmazenamento;
    
     @GetMapping("/buscar-localArmazenamento/{id}")
  public ResponseEntity<LocalArmazenamento> pesquisar(@PathVariable Integer id){
     LocalArmazenamento localArmazenamentoEncontrado = serviceLocalArmazenamento.buscarId(id);
     return new ResponseEntity<>(localArmazenamentoEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-localArmazenamento")
    public ResponseEntity<LocalArmazenamento> criar(@RequestBody LocalArmazenamento localArmazenamento){
       LocalArmazenamento novaLocalArmazenamento = serviceLocalArmazenamento.criarLocalArmazenamento(localArmazenamento);
       return new ResponseEntity<>(novaLocalArmazenamento, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-localArmazenamento")
    public ResponseEntity<List> listar(){
        List<LocalArmazenamento> listaLocalArmazenamento = serviceLocalArmazenamento.listarLocalArmazenamento();
        return new ResponseEntity<>(listaLocalArmazenamento, HttpStatus.OK);
    }
}
