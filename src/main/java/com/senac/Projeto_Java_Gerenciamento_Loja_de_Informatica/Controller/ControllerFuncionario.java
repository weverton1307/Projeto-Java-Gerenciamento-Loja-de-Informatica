
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceFuncionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceUsuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ControllerFuncionario {
     @Autowired
   ServiceFuncionario serviceFuncionario;
     @Autowired
     ServiceCargo serviceCargo;
     @Autowired
     ServiceUsuario serviceUsuario;
     
      @GetMapping("/funcionarios")
    public String inicio(Model model) {
         model.addAttribute("funcionario", new Funcionario());
          model.addAttribute("cargo", new Cargo());
           model.addAttribute("usuario", new Usuario());
        return "funcionarios";
    }
    
    
   @PostMapping("/funcionarios")
public String processarFormulario(Model model, @RequestBody Funcionario funcionario) {
     if (serviceCargo == null) {
        System.out.println("serviceCargo está nulo!");
        return "erro";
    }
        Cargo cargoEncontrado = null;
        List<Cargo> listaCargo = serviceCargo.listarCargo();
        for(Cargo c: listaCargo){
            if(c.getNome().equalsIgnoreCase(funcionario.getCargo().getNome())){
                cargoEncontrado = c;
            }
        }
        System.out.println("nome "+cargoEncontrado.getNome());
        Usuario usuario = serviceUsuario.criarUsuario(funcionario.getUsuario());
        funcionario.setCargo(cargoEncontrado);
        funcionario.setUsuario(usuario);
        serviceFuncionario.criarFuncionario(funcionario);
 
    return "funcionarios";
}

}
