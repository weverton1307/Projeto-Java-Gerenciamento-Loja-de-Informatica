
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Local_armazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceLocalArmazenamento;
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
@RequestMapping("/localArmazenamento")
public class ControllerAPILocalArmazenamento {
     @Autowired
   ServiceLocalArmazenamento serviceLocalArmazenamento;
    
     @GetMapping("/buscar-localArmazenamento/{id}")
  public ResponseEntity<Local_armazenamento> pesquisar(@PathVariable Integer id){
     Local_armazenamento localArmazenamentoEncontrado = serviceLocalArmazenamento.buscarId(id);
     return new ResponseEntity<>(localArmazenamentoEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-localArmazenamento")
    public ResponseEntity<Local_armazenamento> criar(@RequestBody Local_armazenamento localArmazenamento){
       Local_armazenamento novaLocalArmazenamento = serviceLocalArmazenamento.criarLocalArmazenamento(localArmazenamento);
       return new ResponseEntity<>(novaLocalArmazenamento, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-localArmazenamento")
    public ResponseEntity<List> listar(){
        List<Local_armazenamento> listaLocalArmazenamento = serviceLocalArmazenamento.listarLocalArmazenamento();
        return new ResponseEntity<>(listaLocalArmazenamento, HttpStatus.OK);
    }
    
    @PutMapping("/atualizar-localArmazenamento/{id}")
    public ResponseEntity<Local_armazenamento> atualizar(@PathVariable Integer id, @RequestBody Local_armazenamento localArmazenamento){
        Local_armazenamento localArmazenamentoAtualizado = serviceLocalArmazenamento.atualizar(id, localArmazenamento);
        return new ResponseEntity<>(localArmazenamentoAtualizado, HttpStatus.OK);
    }
    
     @DeleteMapping("excluir-localArmazenamento/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id){
        serviceLocalArmazenamento.excluir(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
