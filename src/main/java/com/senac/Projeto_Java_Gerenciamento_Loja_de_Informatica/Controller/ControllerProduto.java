package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Categoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Local_armazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCategoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceLocalArmazenamento;
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
public class ControllerProduto {

    @Autowired
    ServiceProduto serviceProduto;

    @Autowired
    ServiceCategoria serviceCategoria;

    @Autowired
    ServiceLocalArmazenamento serviceLocalArmazenamento;

    //Controller para exibir a página cadastroProduto.html
    @GetMapping("/cadastroProduto")
    public String inicio(Model model, HttpServletRequest request) {
        model.addAttribute("produto", new Produto());
        model.addAttribute("categoria", new Categoria());
        model.addAttribute("localArmazenamento", new Local_armazenamento());
        String sessaoValidada = ValidarSessao.validarSessao(request, "cadastroProduto", "redirect:/");
        return sessaoValidada;
    }
    //Controller para exibir a página pesquisarProdutos.html

    @GetMapping("/pesquisarProdutos")
    public String buscarProduto(Model model, HttpServletRequest request) {
        model.addAttribute("produto", new Produto());
        model.addAttribute("categoria", new Categoria());
        model.addAttribute("localArmazenamento", new Local_armazenamento());
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarProdutos", "redirect:/");
        return sessaoValidada;
    }

    //Controller para cadastrar um produto
    @PostMapping("/cadastro-produto")
    public String cadastrarProduto(Model model, @RequestBody Produto produto, HttpServletRequest request) {
        System.out.println("Produto do formulario " + produto.getCategoria());
        Categoria categoriaEncontrada = serviceCategoria.buscarCategoria(produto);
        Local_armazenamento localArmazenamentoEncontrado = serviceLocalArmazenamento.buscarLoca_armazenamento(produto);
        produto.setCategoria(categoriaEncontrada);
        produto.setLocalArmazenamento(localArmazenamentoEncontrado);
        serviceProduto.criarProduto(produto);
        serviceProduto.atualizarQuantidadeproduto(produto);
        String sessaoValidada = ValidarSessao.validarSessao(request, "cadastroProduto", "redirect:/");
        return sessaoValidada;
    }

    //Controller para pesquisar produtos cadastrados
    @GetMapping("/buscar-produto")
    @ResponseBody
    public ResponseEntity<?> buscarProduto(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) String fabricante,
            @RequestParam(required = false) String disponibilidade,
            @RequestParam(required = false) String devolvido,
            @RequestParam(required = false) String categoria
    , HttpServletRequest request) {
    String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarProdutos", "redirect:/");
    if (sessaoValidada.equalsIgnoreCase("redirect:/")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sessão inválida");
    }
        return serviceProduto.pesquisarProdutos(id, nome, modelo, fabricante, disponibilidade, devolvido, categoria);
    }

    //Controller para retornar uma lista de produtos
    @GetMapping("/listar-produtos")
    @ResponseBody
    public List<Produto> listarProduto(HttpServletRequest request) {
      String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarProdutos", "redirect:/");
      if(sessaoValidada.equalsIgnoreCase("redirect:/")){
          return null;
      }
        return serviceProduto.listarProduto();
    }

    //Controller para atualizar os das do produto cadastrado
    @PutMapping("/atualizar-produto")
    public String atualizarProduto(@RequestBody Produto produto, HttpServletRequest request) {
        Categoria categoriaEncontrada = null;
        List<Categoria> listaCategoria = serviceCategoria.listarCategoria();
        for (Categoria c : listaCategoria) {
            if (c.getNome().equalsIgnoreCase(produto.getCategoria().getNome())) {
                categoriaEncontrada = c;
            }
        }
        Local_armazenamento localArmazenamentoEncontrado = null;
        List<Local_armazenamento> listaLocalArmazenamento = serviceLocalArmazenamento.listarLocalArmazenamento();
        for (Local_armazenamento l : listaLocalArmazenamento) {
            if (l.getNumeroLocalPrateleira().equalsIgnoreCase(produto.getLocalArmazenamento().getNumeroLocalPrateleira())
                    && l.getNumeroPrateleira().equalsIgnoreCase(produto.getLocalArmazenamento().getNumeroPrateleira())) {
                localArmazenamentoEncontrado = l;
            }
        }
        produto.setCategoria(categoriaEncontrada);
        produto.setLocalArmazenamento(localArmazenamentoEncontrado);
        serviceProduto.atualizar(produto.getId(), produto);
        serviceProduto.atualizarQuantidadeproduto(produto);
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarProdutos", "redirect:/");
        return sessaoValidada;
    }

    @GetMapping("/quantidade-produto")
    @ResponseBody
    public String quantidadeCadaProduto(HttpServletRequest request) {
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarProdutos", "redirect:/");
        if(sessaoValidada.equalsIgnoreCase("redirect:/")){
            return null;
        }
        String mensagem = serviceProduto.contarProdutos();
        return mensagem;
    }
}
