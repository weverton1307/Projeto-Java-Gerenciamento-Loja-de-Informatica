package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCliente;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ControllerCliente {

    @Autowired
    ServiceCliente serviceCliente;

    @GetMapping("/cadastrarClientes")
    public String inicio(Model model, HttpServletRequest request) {
        HttpSession sessao = request.getSession();
         String usuario = (String) sessao.getAttribute("usuario");
        model.addAttribute("cliente", new Cliente());
        if (usuario != null) {
            return "cadastrarClientes";
        } else {
            return "redirect:/";
        }
    }
       @GetMapping("/pesquisarClientes")
    public String pesquisarCliente(Model model, HttpServletRequest request) {
        HttpSession sessao = request.getSession();
         String usuario = (String) sessao.getAttribute("usuario");
        model.addAttribute("cliente", new Cliente());
        if (usuario != null) {
            return "pesquisarClientes";
        } else {
            return "redirect:/";
        }
    }

    @PostMapping("/cadastrarClientes/salvar")
    public String cadastrarCliente(Model model, @RequestBody Cliente cliente,  HttpServletRequest request) {
 HttpSession sessao = request.getSession();
  String usuario = (String) sessao.getAttribute("usuario");
        serviceCliente.criarCliente(cliente);
          if (usuario != null) {
            return "cadastrarClientes";
        } else {
           return "redirect:/";
        }
    }

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
    
      @GetMapping("/listar-clientes")
    @ResponseBody
    public List<Cliente> listarClientes() {
        return serviceCliente.listarCliente();  
    }
    
     @PutMapping("/atualizar-Cliente")
    public String atualizarCliente(Model model, @RequestBody Cliente cliente) {
        serviceCliente.atualizar(cliente.getId(), cliente);

        return "pesquisarClientes";
    }

}
