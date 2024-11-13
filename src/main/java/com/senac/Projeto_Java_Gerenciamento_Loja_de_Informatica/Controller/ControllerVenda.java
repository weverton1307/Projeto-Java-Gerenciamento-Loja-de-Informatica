
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ControllerVenda {
     @Autowired
     ServiceVenda serviceVenda;
     
      @GetMapping("/registroVenda")
    public String inicio() {

        return "registroVenda";
    }
    
     @GetMapping("/vendas")
    public String inicioVendas() {

        return "vendas";
    }


}
