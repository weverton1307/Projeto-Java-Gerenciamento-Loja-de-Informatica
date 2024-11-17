package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceDevolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceTroca;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ControllerDevolucao {

    @Autowired
    ServiceDevolucao serviceDevolucao;

    @GetMapping("/devolucao")
    public String inicio(Model model) {

        model.addAttribute("devolucao", new Devolucao());
        return "devolucao";
    }
    
  @PostMapping("/cadastro-devolucao")
public String cadastrarDevolucao(Model model, @RequestBody Devolucao devolucao) {
    serviceDevolucao.criarDevolucao(devolucao);
    return "devolucao";
}

 @GetMapping("/buscar-devolucao")
    @ResponseBody
    public ResponseEntity<?> buscarFuncionario(@RequestParam("id") Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido.");
        }

        Devolucao devolucaoEncontrado = serviceDevolucao.buscarId(id);
        if (devolucaoEncontrado == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        return ResponseEntity.ok(devolucaoEncontrado);
    }
    
     @GetMapping("/listar-devolucao")
    @ResponseBody
    public List<Devolucao> listarDevolucao() {
        return serviceDevolucao.listarDevolucao();  
    }
    
     @PutMapping("/atualizar-devolucao")
    public String atualizardevolucao(Model model, @RequestBody Devolucao devolucao) {
        serviceDevolucao.atualizar(devolucao.getId(), devolucao);

        return "devolucao";
    }

     @DeleteMapping("/buscar-excuir")
    @ResponseBody
    public String excuirDevolucao(@RequestBody Devolucao devolucao) {
      serviceDevolucao.excluir(devolucao.getId());
        return "devolucao";
    }
}
