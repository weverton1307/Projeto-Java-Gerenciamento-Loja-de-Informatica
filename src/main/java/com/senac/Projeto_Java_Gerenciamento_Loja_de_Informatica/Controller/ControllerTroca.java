package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceTroca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.util.ValidarSessao;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
    
    //Controller para exibir a página de registrarTroca.html
    @GetMapping("/registrarTroca")
    public String inicio(Model model, HttpServletRequest request) {
        model.addAttribute("troca", new Troca());
         String sessaoValidada = ValidarSessao.validarSessao(request, "registrarTroca", "redirect:/");
        return sessaoValidada;
    }
    
    //Controller para exibir a página pesquisarTroca.html
      @GetMapping("/pesquisarTroca")
    public String buscarTroca(Model model, HttpServletRequest request) {
        model.addAttribute("troca", new Troca());
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarTroca", "redirect:/");
        return sessaoValidada;
    }

    //Controller para registrar a troca de um produto
    @PostMapping("/cadastro-troca")
    public String cadastrarTroca(Model model, @RequestBody Troca troca, HttpServletRequest request) {
        Produto produto = serviceProduto.buscarId(troca.getCodigoProduto());
        troca.setNome_produto(produto.getNomeProduto());
        serviceTroca.criarTroca(troca);
        serviceProduto.atualizarTroca(troca);
        List<Produto> listaProduto = serviceProduto.listarProduto();
        serviceItensVenda.atualizarTroca(troca, listaProduto, produto);
        String sessaoValidada = ValidarSessao.validarSessao(request, "registrarTroca", "redirect:/");
        return sessaoValidada;
    }

    //Controller para pesquisar uma troca cadastrada
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

    //Controller para retornar uma lista com trocas cadastradas
    @GetMapping("/listar-troca")
    @ResponseBody
    public List<Troca> listarTroca() {
        return serviceTroca.listarTroca();
    }

    //Controller para atualizar os dados de uma troca cadastrada
    @PutMapping("/atualizar-troca")
    public String atualizarTroca(Model model, @RequestBody Troca troca, HttpServletRequest request) {
        Produto produto = serviceProduto.buscarId(troca.getCodigoProduto());
        troca.setNome_produto(produto.getNomeProduto());
                System.out.println(troca.getNome_produto());
        serviceTroca.atualizar(troca.getId(), troca);
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarTroca", "redirect:/");
        return sessaoValidada;
    }
}
