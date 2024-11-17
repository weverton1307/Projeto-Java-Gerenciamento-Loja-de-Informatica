package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceDevolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceTroca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ControllerDevolucao {

    @Autowired
    ServiceDevolucao serviceDevolucao;

    @GetMapping("/devolucao")
    public String inicio(Model model) {

        model.addAttribute("devolucao", new Devolucao());
        return "devolucao";
    }
    
  @PostMapping("/cadastro-devolucao")
public String cadastrarDevolucao(Model model, @RequestBody Devolucao devolucao) {

    serviceDevolucao.criarDevolucao(devolucao);


    return "devolucao";
}

}
