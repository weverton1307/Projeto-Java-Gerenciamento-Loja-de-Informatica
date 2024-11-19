
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;


import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Itens_venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
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
@RequestMapping("/itensVenda")
public class ControllerAPIIntesVenda {
     @Autowired
   ServiceItensVenda serviceItensVenda;
    
     @GetMapping("/buscar-itensVenda/{id}")
  public ResponseEntity<Itens_venda> pesquisar(@PathVariable Integer id){
     Itens_venda itensVendaEncontrada = serviceItensVenda.buscarId(id);
     return new ResponseEntity<>(itensVendaEncontrada, HttpStatus.OK);
  } 
  
       @PostMapping("/adicionar-itensVenda")
    public ResponseEntity<Itens_venda> criar(@RequestBody Itens_venda itensVenda){
       Itens_venda novaItensVenda = serviceItensVenda.criarItensVenda(itensVenda);
       return new ResponseEntity<>(novaItensVenda, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-itensVenda")
    public ResponseEntity<List> listar(){
        List<Itens_venda> listaItensVenda = serviceItensVenda.listarItensVenda();
        return new ResponseEntity<>(listaItensVenda, HttpStatus.OK);
    }
    
    @PutMapping("/atualizar-itensVenda/{id}")
    public ResponseEntity<Itens_venda> atualizar(@PathVariable Integer id, @RequestBody Itens_venda itensVenda){
        Itens_venda itensVendaAtualizado = serviceItensVenda.atualizar(id, itensVenda);
        return new ResponseEntity<>(itensVendaAtualizado, HttpStatus.OK);
    }
    
     @DeleteMapping("excluir-itensVenda/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id){
        serviceItensVenda.excluir(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
