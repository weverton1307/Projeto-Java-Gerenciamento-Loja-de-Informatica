
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
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
@RequestMapping("/venda")
public class ControllerAPIVenda {
    @Autowired
   ServiceVenda serviceVenda;
    
     @GetMapping("/buscar-venda/{id}")
  public ResponseEntity<Venda> pesquisar(@PathVariable Integer id){
     Venda VendaEncontrada = serviceVenda.buscarId(id);
     return new ResponseEntity<>(VendaEncontrada, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-venda")
    public ResponseEntity<Venda> criar(@RequestBody Venda venda){
       Venda novaVenda = serviceVenda.criarVenda(venda);
       return new ResponseEntity<>(novaVenda, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-venda")
    public ResponseEntity<List> listar(){
        List<Venda> listaVenda = serviceVenda.listarVenda();
        return new ResponseEntity<>(listaVenda, HttpStatus.OK);
    }
  
    @PutMapping("/atualizar-venda/{id}")
    public ResponseEntity<Venda> atualizar(@PathVariable Integer id, @RequestBody Venda venda){
        Venda vendaAtualizada = serviceVenda.atualizar(id, venda);
        return new ResponseEntity<>(vendaAtualizada, HttpStatus.OK);
    }
    
    @DeleteMapping("excluir-venda/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id){
        serviceVenda.excluir(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
