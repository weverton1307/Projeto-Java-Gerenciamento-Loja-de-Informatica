package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.util.ValidarSessao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCliente;
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
public class ControllerCliente {

    @Autowired
    ServiceCliente serviceCliente;

    // Controller para exibir a página cadastrarClientes.html
    @GetMapping("/cadastrarClientes")
    public String inicio(Model model, HttpServletRequest request) {
        model.addAttribute("cliente", new Cliente());
        String sessaoValidada = ValidarSessao.validarSessao(request, "cadastrarClientes", "redirect:/");
       return sessaoValidada;
    }

    // Controller para exibir a página pesquisarClientes.html
    @GetMapping("/pesquisarClientes")
    public String pesquisarCliente(Model model, HttpServletRequest request) {
        model.addAttribute("cliente", new Cliente());
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarClientes", "redirect:/");
       return sessaoValidada;
    }

    // Controller para cadastrar um novo cliente
    @PostMapping("/cadastrarClientes/salvar")
    public String cadastrarCliente(Model model, @RequestBody Cliente cliente, HttpServletRequest request) {
        serviceCliente.criarCliente(cliente);
        String senssaoValidada = ValidarSessao.validarSessao(request, "cadastrarClientes", "redirect:/");
       return senssaoValidada;
    }

    // Controller para pesquisar um cliente cadastrado
    @GetMapping("/buscar-cliente")
    @ResponseBody
    public ResponseEntity<?> buscarCliente(@RequestParam("id") Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido.");
        }
        Cliente clienteEncontrado = serviceCliente.buscarId(id);
        if (clienteEncontrado == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        return ResponseEntity.ok(clienteEncontrado);
    }

    // Controller para retornar uma lista com todos os clientes cadastrados
    @GetMapping("/listar-clientes")
    @ResponseBody
    public List<Cliente> listarClientes() {
        return serviceCliente.listarCliente();
    }

    // Controller para atualizar os dados de um cliente cadastrado
    @PutMapping("/atualizar-Cliente")
    public String atualizarCliente(Model model, @RequestBody Cliente cliente, HttpServletRequest request) {
        serviceCliente.atualizar(cliente.getId(), cliente);
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarClientes", "redirect:/");
        return sessaoValidada;
    }

}
