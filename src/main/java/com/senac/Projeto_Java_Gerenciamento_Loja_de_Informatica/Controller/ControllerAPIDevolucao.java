
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceDevolucao;
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
@RequestMapping("/devolucao")
public class ControllerAPIDevolucao {
      @Autowired
   ServiceDevolucao serviceDevolucao;
    
     @GetMapping("/buscar-devolucao/{id}")
  public ResponseEntity<Devolucao> pesquisar(@PathVariable Integer id){
     Devolucao devolucaoEncontrada = serviceDevolucao.buscarId(id);
     return new ResponseEntity<>(devolucaoEncontrada, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-devolucao")
    public ResponseEntity<Devolucao> criar(@RequestBody Devolucao devolucao){
       Devolucao novaDevolucao = serviceDevolucao.criarDevolucao(devolucao);
       return new ResponseEntity<>(novaDevolucao, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-devolucao")
    public ResponseEntity<List> listar(){
        List<Devolucao> listaDevolucao = serviceDevolucao.listarDevolucao();
        return new ResponseEntity<>(listaDevolucao, HttpStatus.OK);
    }
}
