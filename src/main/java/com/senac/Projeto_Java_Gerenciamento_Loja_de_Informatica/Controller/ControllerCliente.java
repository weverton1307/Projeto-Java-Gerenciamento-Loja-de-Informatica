
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ControllerCliente {
 @Autowired
 ServiceCliente serviceCliente;
 
     @GetMapping("/clientes")
    public String inicio(Model model) {
model.addAttribute("cliente", new Cliente());
        return "clientes";
    }
    
        @PostMapping("/cadastro-cliente")
    public String cadastrarCliente(Model model, @RequestBody Cliente cliente) {
  
       serviceCliente.criarCliente(cliente);

        return "clientes";
    }
}
