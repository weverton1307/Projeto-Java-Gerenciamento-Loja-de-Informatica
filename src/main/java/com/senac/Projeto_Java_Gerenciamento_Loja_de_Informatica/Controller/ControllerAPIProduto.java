
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
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
@RequestMapping("/produto")
public class ControllerAPIProduto {
     @Autowired
   ServiceProduto serviceProduto;
    
     @GetMapping("/buscar-produto/{id}")
  public ResponseEntity<Produto> pesquisar(@PathVariable Integer id){
     Produto produtoEncontrado = serviceProduto.buscarId(id);
     return new ResponseEntity<>(produtoEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-produto")
    public ResponseEntity<Produto> criar(@RequestBody Produto produto){
       Produto novoProduto = serviceProduto.criarProduto(produto);
       return new ResponseEntity<>(novoProduto, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-produto")
    public ResponseEntity<List> listar(){
        List<Produto> listaProduto = serviceProduto.listarProduto();
        return new ResponseEntity<>(listaProduto, HttpStatus.OK);
    }
}
