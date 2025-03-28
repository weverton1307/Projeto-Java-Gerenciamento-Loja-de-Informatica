
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
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
public class ControllerTroca {
       @Autowired
   ServiceTroca serviceTroca;
       
 @Autowired
    ServiceProduto serviceProduto;
 
  @Autowired
  ServiceItensVenda serviceItensVenda;
   
 @GetMapping("/troca")
    public String inicio(Model model) {

        model.addAttribute("troca", new Troca());
        return "troca";
    }
    
    @PostMapping("/cadastro-troca")
    public String cadastrarTroca(Model model, @RequestBody Troca troca) {
        serviceTroca.criarTroca(troca);
        serviceProduto.atualizarTroca(troca);
        List<Produto> listaProduto = serviceProduto.listarProduto();
        Produto produto = serviceProduto.buscarId(troca.getCodigoProduto());
        serviceItensVenda.atualizarTroca(troca, listaProduto, produto);
        return "troca";
    }

 @GetMapping("/buscar-troca")
    @ResponseBody
    public ResponseEntity<?> buscartroca(@RequestParam("id") Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido.");
        }

        Troca trocaEncontrada = serviceTroca.buscarId(id);
        if (trocaEncontrada == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Troca não encontrada.");
        }

        return ResponseEntity.ok(trocaEncontrada);
    }
    
     @GetMapping("/listar-troca")
    @ResponseBody
    public List<Troca> listarTroca() {
        return serviceTroca.listarTroca();  
    }
    
      @PutMapping("/atualizar-troca")
    public String atualizarTroca(Model model, @RequestBody Troca troca) {
        serviceTroca.atualizar(troca.getId(), troca);

        return "troca";
    }
    
        @DeleteMapping("/troca-excluir")
    @ResponseBody
    public String excluirTroca(@RequestBody Troca troca) {
      serviceTroca.excluir(troca.getId());
        return "troca";
    }
    
}
