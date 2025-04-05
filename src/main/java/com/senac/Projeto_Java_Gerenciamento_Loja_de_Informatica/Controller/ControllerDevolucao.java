package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceDevolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
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
public class ControllerDevolucao {

    @Autowired
    ServiceDevolucao serviceDevolucao;

    @Autowired
    ServiceProduto serviceProduto;
    @Autowired
    ServiceItensVenda serviceItensVenda;

    //controller para exibir a página registrarDevolucao.html
    @GetMapping("/registrarDevolucao")
    public String inicio(Model model, HttpServletRequest request) {
        model.addAttribute("devolucao", new Devolucao());
        
        return "registrarDevolucao";
    }

    //controller para exibir a página registrarDevolucao.html
    @GetMapping("/pesquisarDevolucao")
    public String buscarDevolucao(Model model, HttpServletRequest request) {
        model.addAttribute("devolucao", new Devolucao());
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarDevolucao", "redirect:/");
        return sessaoValidada;
    }

    //Controller para cadastrar devolução
    @PostMapping("/cadastro-devolucao")
    public String cadastrarDevolucao(Model model, @RequestBody Devolucao devolucao, HttpServletRequest request) {
        Produto produto = serviceProduto.buscarId(devolucao.getCodigoProduto());
        devolucao.setNome_produto(produto.getNomeProduto());
        serviceDevolucao.criarDevolucao(devolucao);
        serviceProduto.atualizarDevolucao(devolucao);
        serviceItensVenda.atualizarDevolucao(devolucao);
        String sessaoValidada = ValidarSessao.validarSessao(request, "registrarDevolucao", "redirect:/");
        return sessaoValidada;
    }

    //Controller para pesquisar uma devolução
    @GetMapping("/buscar-devolucao")
    @ResponseBody
    public ResponseEntity<?> buscarDevolucao(@RequestParam("id") Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido.");
        }

        Devolucao devolucaoEncontrado = serviceDevolucao.buscarId(id);
        if (devolucaoEncontrado == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Devolução não encontrado.");
        }

        return ResponseEntity.ok(devolucaoEncontrado);
    }

    //Controller para retornar uma lista de devoluções cadastradas
    @GetMapping("/listar-devolucao")
    @ResponseBody
    public List<Devolucao> listarDevolucao() {
        return serviceDevolucao.listarDevolucao();
    }

    //Controller para atualizar dados de uma devolução cadastrada
    @PutMapping("/atualizar-devolucao")
    public String atualizarDevolucao(Model model, @RequestBody Devolucao devolucao, HttpServletRequest request) {
        Produto produto = serviceProduto.buscarId(devolucao.getCodigoProduto());
        devolucao.setNome_produto(produto.getNomeProduto());
        serviceDevolucao.atualizar(devolucao.getId(), devolucao);
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarDevolucao", "redirect:/");
        return sessaoValidada;
    }
}
