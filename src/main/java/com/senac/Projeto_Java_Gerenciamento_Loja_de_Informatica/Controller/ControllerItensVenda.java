package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.ItensDTO;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.VendaDTO;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Itens_venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceFuncionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.util.ValidarSessao;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ControllerItensVenda {

    @Autowired
    ServiceItensVenda serviceItensVenda;

    @Autowired
    ServiceVenda serviceVenda;
    @Autowired
    ServiceCliente serviceCliente;

    @Autowired
    ServiceFuncionario serviceFuncionario;

    @Autowired
    ServiceProduto serviceProduto;

    @GetMapping("/registrarVenda")
    public String inicio(HttpServletRequest request) {
        String sessaoValidada = ValidarSessao.validarSessao(request, "registrarVenda", "redirect:/");
        return sessaoValidada;
    }

    @GetMapping("/buscarProduto")
    @ResponseBody
    public ResponseEntity<?> buscarProduto(@RequestParam("id") Integer id, HttpServletRequest request) {
    String sessaoValidada = ValidarSessao.validarSessao(request, "registrarVenda", "redirect:/");
    if (sessaoValidada.equalsIgnoreCase("redirect:/")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sessão inválida");
    }
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido");
        }
        Produto produtoEncontrado = serviceProduto.buscarId(id);
        if (produtoEncontrado == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }
        return ResponseEntity.ok(produtoEncontrado);
    }

    @GetMapping("/listarClientes")
    public ResponseEntity<?> listarClientes(HttpServletRequest request) {
    String sessaoValidada = ValidarSessao.validarSessao(request, "registrarVenda", "redirect:/");
    if (sessaoValidada.equalsIgnoreCase("redirect:/")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sessão inválida");
    }
        List<Cliente> clientes = serviceCliente.listarCliente();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/listarProdutos")
    public ResponseEntity<?> listarProdutos(HttpServletRequest request) {
    String sessaoValidada = ValidarSessao.validarSessao(request, "registrarVenda", "redirect:/");
    if (sessaoValidada.equalsIgnoreCase("redirect:/")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sessão inválida");
    }
        List<Produto> produtos = serviceProduto.listarProduto();
        return ResponseEntity.ok(produtos);
    }

    @PostMapping("/registrarVenda")
    public String registrarVenda(@RequestBody VendaDTO vendaDTO, HttpServletRequest request) {
        System.out.println("teste: "+vendaDTO.getCpf());
        HttpSession sessao = request.getSession();
        String nomeVendedor = (String) sessao.getAttribute("usuario");
        Venda venda = new Venda();
        venda.setStatusVenda("Realizada");
        venda.setDataHora(LocalDateTime.now());
        Funcionario funcionarioEncontrado = null;
        List<Funcionario> funcionarios = serviceFuncionario.listarFuncionario();
        List<Cliente> clientes = serviceCliente.listarCliente();
        List<Produto> produtos = serviceProduto.listarProduto();
        venda.setMetodoPagamento(vendaDTO.getMetodoPagamento());
        String sessaoValidada = ValidarSessao.validarSessao(request, "inicio", "redirect:/");
        for (Funcionario f : funcionarios) {
            if (f.getUsuario().getLogin().equalsIgnoreCase(nomeVendedor)) {
                funcionarioEncontrado = f;
                System.out.println("página inicio: " + sessaoValidada);
                venda.setVendedor(funcionarioEncontrado);
            }
        }
        if (vendaDTO.getCpf().isEmpty()) {
            venda.setCliente(null);
            return sessaoValidada;
        } else {
            int totalItens = 0;
            for (Cliente c : clientes) {
                if (c.getCpf().equalsIgnoreCase(vendaDTO.getCpf())) {
                    for (ItensDTO i : vendaDTO.getItens()) {

                        totalItens += i.getQuantidade();

                    }
                    c.setTotal_compras(c.getTotal_compras() + totalItens);
                    System.out.println("testes cliente: " + c.getNome());
                    serviceCliente.atualizar(c.getId(), c);
                    venda.setCliente(c);
                }
            }
            serviceVenda.criarVenda(venda);
            for (ItensDTO item : vendaDTO.getItens()) {
                if (item.getQuantidade() == 1) {
                    Produto produto = serviceProduto.buscarId(item.getCodigo());
                    produto.setStatusProduto("Vendido");
                    serviceProduto.atualizarQuantidadeproduto(produto);
                    serviceProduto.atualizar(produto.getId(), produto);
                    Itens_venda iv = new Itens_venda();
                    iv.setProduto(produto);
                    iv.setVenda(venda);
                    iv.setQuantidade(item.getQuantidade());
                    serviceItensVenda.criarItensVenda(iv);
                } else {
                    int count = 0;
                    List<Produto> produtosVendidos = new ArrayList<>();
                    for (Produto p : produtos) {
                        if (p.getNomeProduto().equalsIgnoreCase(item.getNome()) && p.getStatusProduto().equalsIgnoreCase("Disponível") && count < item.getQuantidade()) {
                            produtosVendidos.add(p);
                            count++;
                        }
                    }
                        for (Produto produtoVendido : produtosVendidos) {
                            System.out.println("id produto: " + produtoVendido.getId());
                            produtoVendido.setStatusProduto("Vendido");
                            serviceProduto.atualizarQuantidadeproduto(produtoVendido);
                            serviceProduto.atualizar(produtoVendido.getId(), produtoVendido);
                            Itens_venda iv = new Itens_venda();
                            iv.setProduto(produtoVendido);
                            iv.setVenda(venda);
                            iv.setQuantidade(item.getQuantidade());
                            serviceItensVenda.criarItensVenda(iv);
                            System.out.println("teste count: " + count);
                            System.out.println("teste item quantidade: " + item.getQuantidade());
                        }

                }
            }
            return sessaoValidada;
        }
    }
}
