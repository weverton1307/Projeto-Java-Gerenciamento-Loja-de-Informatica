
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceFuncionario;
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
@RequestMapping("/funcionario")
public class ControllerAPIFuncionario {
     @Autowired
   ServiceFuncionario serviceFuncionario;
    
     @GetMapping("/buscar-funcionario/{id}")
  public ResponseEntity<Funcionario> pesquisar(@PathVariable Integer id){
     Funcionario funcionarioEncontrado = serviceFuncionario.buscarId(id);
     return new ResponseEntity<>(funcionarioEncontrado, HttpStatus.OK);
  }
  
       @PostMapping("/adicionar-funcionario")
    public ResponseEntity<Funcionario> criar(@RequestBody Funcionario funcionario){
       Funcionario novofuncionario = serviceFuncionario.criarFuncionario(funcionario);
       return new ResponseEntity<>(novofuncionario, HttpStatus.CREATED);
    }
    
       @GetMapping("listar-funcionario")
    public ResponseEntity<List> listar(){
        List<Funcionario> listaFuncionario = serviceFuncionario.listarFuncionario();
        return new ResponseEntity<>(listaFuncionario, HttpStatus.OK);
    }
    
    @PutMapping("/atualizar-funcionario/{id}")
    public ResponseEntity<Funcionario> atualizar(@PathVariable Integer id, @RequestBody Funcionario funcionario){
        Funcionario filmeAtualizado = serviceFuncionario.atualizar(id, funcionario);
        return new ResponseEntity<>(filmeAtualizado, HttpStatus.OK);
    }
    
     @DeleteMapping("excluir-funcionario/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id){
        serviceFuncionario.excluir(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
