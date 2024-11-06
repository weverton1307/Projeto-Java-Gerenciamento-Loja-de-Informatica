
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceTroca;
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
@RequestMapping("/troca")
public class ControllerAPITroca {
    @Autowired
   ServiceTroca serviceTroca;
    
     @GetMapping("/buscar-troca/{id}")
  public ResponseEntity<Troca> pesquisar(@PathVariable Integer id){
     Troca trocaEncontrado = serviceTroca.buscarId(id);
     return new ResponseEntity<>(trocaEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-troca")
    public ResponseEntity<Troca> criar(@RequestBody Troca troca){
       Troca novaTroca = serviceTroca.criarTroca(troca);
       return new ResponseEntity<>(novaTroca, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-troca")
    public ResponseEntity<List> listar(){
        List<Troca> listaTroca = serviceTroca.listarTroca();
        return new ResponseEntity<>(listaTroca, HttpStatus.OK);
    }
    
    @PutMapping("/atualizar-troca/{id}")
    public ResponseEntity<Troca> atualizar(@PathVariable Integer id, @RequestBody Troca troca){
        Troca trocaAtualizada = serviceTroca.atualizar(id, troca);
        return new ResponseEntity<>(trocaAtualizada, HttpStatus.OK);
    }
    
     @DeleteMapping("excluir-troca/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id){
        serviceTroca.excluir(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
