
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

   @Controller
public class ControllerItensVenda {


   @Autowired
   ServiceItensVenda serviceitensVenda;
   
   @Autowired
   ServiceVenda serviceVenda;
   
        @GetMapping("/registroVenda")
    public String inicio() {

        return "registroVenda";
    }
} 

