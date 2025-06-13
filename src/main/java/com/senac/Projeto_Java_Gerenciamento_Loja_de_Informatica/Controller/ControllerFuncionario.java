package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCargo;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceFuncionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceUsuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.util.ValidarSessao;
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
public class ControllerFuncionario {

    @Autowired
    ServiceFuncionario serviceFuncionario;
    @Autowired
    ServiceCargo serviceCargo;
    @Autowired
    ServiceUsuario serviceUsuario;

    //Controller para exibir a página cadastrarFuncionario.html
    @GetMapping("/cadastrarFuncionario")
    public String inicio(Model model,  HttpServletRequest request) {
        model.addAttribute("funcionario", new Funcionario());
        model.addAttribute("cargo", new Cargo());
        model.addAttribute("usuario", new Usuario());
         String sessaoValidada = ValidarSessao.validarSessao(request, "cadastrarFuncionario", "redirect:/");
        return sessaoValidada; 
    }

    //Controller para exibir a página pesquisarFuncionarios.html
    @GetMapping("/pesquisarFuncionarios")
    public String buscarFunc(Model model,  HttpServletRequest request) {
        model.addAttribute("funcionario", new Funcionario());
        model.addAttribute("cargo", new Cargo());
        model.addAttribute("usuario", new Usuario());
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarFuncionarios", "redirect:/");
        return sessaoValidada;       
    }

    //Controller para cadastrar funcionário
    @PostMapping("/processarFormulario")
    public String processarFormulario(Model model, @RequestBody Funcionario funcionario, HttpServletRequest request) {
        if (serviceCargo == null) {
            System.out.println("serviceCargo está nulo!");
            return "erro";
        }
        Cargo cargoEncontrado = serviceCargo.buscarCargo(funcionario);
        Usuario usuario = serviceUsuario.criptografarSenha(funcionario);
        funcionario.setCargo(cargoEncontrado);
        funcionario.setUsuario(usuario);
        serviceFuncionario.criarFuncionario(funcionario);
       String sessaoValidada = ValidarSessao.validarSessao(request, "cadastrarFuncionario", "redirect:/");
        return sessaoValidada;     
    }

    //Controller para pesquisar funcionário cadastrado
    @GetMapping("/buscar-funcionario")
    @ResponseBody
    public ResponseEntity<?> buscarFuncionario(@RequestParam("id") Integer id, HttpServletRequest request) {
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarFuncionarios", "redirect:/");
        if(sessaoValidada.equalsIgnoreCase("redirect:/")){
            return null;
        }
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido.");
        }
        Funcionario funcEncontrado = serviceFuncionario.buscarId(id);
        if (funcEncontrado == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado.");
        }
        return ResponseEntity.ok(funcEncontrado);
    }

    //Controller para atualizar dados de funcionário cadastrado
    @PutMapping("/atualizar-funcionario")
    public String atualizarFuncionario(@RequestBody Funcionario funcionario, HttpServletRequest request) {
        Cargo cargo = serviceCargo.buscarCargo(funcionario);
        Usuario usuario = serviceUsuario.criptografarSenha(funcionario);
        funcionario.setCargo(cargo);
        funcionario.setUsuario(usuario);
        serviceFuncionario.atualizar(funcionario.getId(), funcionario);
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarFuncionarios", "redirect:/");
        return sessaoValidada;   
    }

    //Controller para retornar uma lista com todos os funcionários cadastrados
    @GetMapping("/listar-funcionarios")
    @ResponseBody
    public List<Funcionario> listarFuncionarios(HttpServletRequest request) {
        String sessaoValidada = ValidarSessao.validarSessao(request, "pesquisarFuncionarios", "redirect:/");
        if(sessaoValidada.equalsIgnoreCase("redirect:/")){
            return null;
        }
        return serviceFuncionario.listarFuncionario();
    }

}
