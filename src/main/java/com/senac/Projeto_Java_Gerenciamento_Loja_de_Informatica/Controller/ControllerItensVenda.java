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
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public ResponseEntity<?> buscarProduto(@RequestParam("id") Integer id) {
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
    public ResponseEntity<?> listarClientes() {
        List<Cliente> clientes = serviceCliente.listarCliente();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/listarProdutos")
    public ResponseEntity<?> listarProdutos() {
        List<Produto> produtos = serviceProduto.listarProduto();
        return ResponseEntity.ok(produtos);
    }

    @PostMapping("/registrarVenda")
    public String registrarVenda(@RequestBody VendaDTO vendaDTO, HttpServletRequest request) {
        HttpSession sessao = request.getSession();
        String nomeVendedor = (String) sessao.getAttribute("usuario");
        Venda venda = new Venda();
        venda.setStatusVenda("Realizada");
        venda.setDataHora(LocalDateTime.now());
        Funcionario funcionarioEncontrado = null;
        List<Funcionario> funcionarios = serviceFuncionario.listarFuncionario();
        List<Cliente> clientes = serviceCliente.listarCliente();
        venda.setMetodoPagamento(vendaDTO.getMetodoPagamento());
        String sessaoValidada = ValidarSessao.validarSessao(request, "registrarVenda", "redirect:/");
        for (Funcionario f : funcionarios) {
            if (f.getUsuario().getLogin().equalsIgnoreCase(nomeVendedor)) {
                funcionarioEncontrado = f;
                System.out.println("funcionario encontrado: " + funcionarioEncontrado.getId());
                venda.setVendedor(funcionarioEncontrado);
            }
        }
        if (vendaDTO.getCpf().isEmpty()) {
            venda.setCliente(null);
        } else {
            int totalItens = 0;
            for (Cliente c : clientes) {
                if (c.getCpf().equalsIgnoreCase(vendaDTO.getCpf())) {
                    for (ItensDTO i : vendaDTO.getItens()) {

                        totalItens += i.getQuantidade();

                    }
                    c.setTotal_compras(totalItens);
                    serviceCliente.atualizar(c.getId(), c);
                    venda.setCliente(c);
                }
            }
            serviceVenda.criarVenda(venda);
            for (ItensDTO item : vendaDTO.getItens()) {
                Produto produto = serviceProduto.buscarId(item.getCodigo());
                produto.setStatusProduto("Vendido");
                serviceProduto.atualizarQuantidadeproduto(produto);
                serviceProduto.atualizar(produto.getId(), produto);
                Itens_venda iv = new Itens_venda();
                iv.setProduto(produto);
                iv.setVenda(venda);
                iv.setQuantidade(item.getQuantidade());
                serviceItensVenda.criarItensVenda(iv);
            }
        }
        return sessaoValidada;
    }
}
