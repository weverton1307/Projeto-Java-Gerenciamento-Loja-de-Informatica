/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ControllerUsuario {

    @Autowired
    ServiceUsuario serviceUsuario;

    @GetMapping("/inicio")
    public String inicio(Model model, @ModelAttribute Usuario usuario) {
        model.addAttribute("usuario", new Usuario());
        
        

        return "index";
    }

 @PostMapping("/login")
public String logar(Model model, @ModelAttribute Usuario usuario) {
    boolean usuarioAutenticado = serviceUsuario.autenticarUsuario(usuario, model);

    if (usuarioAutenticado) {
        return "menu";  
    } else {
        model.addAttribute("erro", "Usuário inválido. Usuário ou senha inválida");
        return "index";
    }
}
    @GetMapping("/menu")
    public String abrirMenu(Model model) {
        return "menu";
    }

    @GetMapping("/sair")
    public String sairSistema() {
        return "logout";
    }

}