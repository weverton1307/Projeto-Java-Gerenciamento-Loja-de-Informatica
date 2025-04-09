package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Categoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Local_armazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.ProdutosContado;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCategoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceLocalArmazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
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
    public String inicio(Model model) {
        model.addAttribute("produto", new Produto());
        model.addAttribute("categoria", new Categoria());
        model.addAttribute("localArmazenamento", new Local_armazenamento());
        return "cadastroProduto";
    }
     //Controller para exibir a página pesquisarProdutos.html
    @GetMapping("/pesquisarProdutos")
    public String buscarProduto(Model model) {
        model.addAttribute("produto", new Produto());
        model.addAttribute("categoria", new Categoria());
        model.addAttribute("localArmazenamento", new Local_armazenamento());
        return "pesquisarProdutos";
    }

    //Controller para cadastrar um produto
    @PostMapping("/cadastro-produto")
    public String cadastrarProduto(Model model, @RequestBody Produto produto) {
        System.out.println("Produto do formulario " + produto.getCategoria());
        Categoria categoriaEncontrada = serviceCategoria.buscarCategoria(produto);
        Local_armazenamento localArmazenamentoEncontrado = serviceLocalArmazenamento.buscarLoca_armazenamento(produto);
        produto.setCategoria(categoriaEncontrada);
        produto.setLocalArmazenamento(localArmazenamentoEncontrado);
        serviceProduto.criarProduto(produto);
        serviceProduto.atualizarQuantidadeproduto(produto);
        return "cadastroProduto";
    }

    @GetMapping("/buscar-produto")
    @ResponseBody
    public ResponseEntity<?> buscarProduto(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) String fabricante,
            @RequestParam(required = false) String disponibilidade,
            @RequestParam(required = false) Integer devolvido,
            @RequestParam(required = false) String categoria
    ) {
        System.out.println("Modelo pesquisado: " + modelo);

        if (id != null) {
            if (id <= 0) {
                return ResponseEntity.badRequest().body("ID inválido.");
            }
            System.out.println(modelo);
            Produto produtoEncontrado = serviceProduto.buscarId(id);
            if (produtoEncontrado == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
            }

            return ResponseEntity.ok(produtoEncontrado);
        } else if (nome != null && !nome.trim().isEmpty()) {
            List<Produto> produtosEncontrados = serviceProduto.buscarProdutoNome(nome);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (modelo != null && !modelo.trim().isEmpty()) {
            List<Produto> produtosEncontrados = serviceProduto.buscarProdutoModelo(modelo);
            System.out.println("Produto encontrado: " + produtosEncontrados);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado para o modelo informado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (fabricante != null && !fabricante.trim().isEmpty()) {
            List<Produto> produtosEncontrados = serviceProduto.buscarProdutoFabricante(fabricante);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado para o fabricante informado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (disponibilidade != null && !disponibilidade.trim().isEmpty()) {
            List<Produto> produtosEncontrados = serviceProduto.buscarProdutoDisponibilidade(disponibilidade);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto disponível.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (devolvido != null) {
            List<Produto> produtosEncontrados = serviceProduto.buscarProdutoDevolvido(devolvido);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto devolvido encontrado.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else if (categoria != null && !categoria.trim().isEmpty()) {
            List<Produto> produtosEncontrados = serviceProduto.buscarProdutoCategoria(categoria);
            return produtosEncontrados.isEmpty()
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum produto encontrado para a categoria informada.")
                    : ResponseEntity.ok(produtosEncontrados);
        } else {
            return ResponseEntity.badRequest().body("Informe um critério de busca válido.");
        }
    }

    //Controller para retornar uma lista de produtos
    @GetMapping("/listar-produtos")
    @ResponseBody
    public List<Produto> listarProduto() {
        return serviceProduto.listarProduto();
    }

    @PutMapping("/atualizar-produto")
    public String atualizarProduto(@RequestBody Produto produto) {
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
        System.out.println("id do produto: " + produto.getId());
        serviceProduto.atualizar(produto.getId(), produto);
        serviceProduto.atualizarQuantidadeproduto(produto);

        // Retornar uma mensagem de sucesso com status HTTP 200 (OK)
        return "produtos";
    }

    @GetMapping("/quantidade-produto")
    @ResponseBody
    public List<ProdutosContado> quantidadeCadaProduto() {
        List<ProdutosContado> produtosContados = serviceProduto.contarProdutosPorCategoria();
        return produtosContados;  // Isso retorna a lista como JSON
    }
}
