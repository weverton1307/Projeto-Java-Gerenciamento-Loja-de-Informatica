package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.UsuarioAutenticar;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceUsuario;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ControllerAutenticacao {

    String loginEncontrado = "";
    @Autowired
    ServiceUsuario serviceUsuario;

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "index";
    }

    @PostMapping("/autentica")
    public String autenticarUsuario(HttpServletRequest request, Usuario usuario, Model model) {
        HttpSession sessao = request.getSession();
        UsuarioAutenticar usuarioAutenticado = serviceUsuario.autenticarUsuario(usuario);
        if (sessao != null && usuarioAutenticado != null) {
            sessao.setAttribute("usuario", usuarioAutenticado.getLogin());
            sessao.setAttribute("tipo", usuarioAutenticado.getTipo());
            loginEncontrado = usuario.getLogin();
            model.addAttribute("usuarioNome", sessao.getAttribute("usuario"));
            model.addAttribute("tipoUsuario", sessao.getAttribute("tipo"));
            return "inicio";
        } else {
            model.addAttribute("erro", "Usuário ou senha inválida");
            return "index";
        }
    }

    @RequestMapping("/autentica")
    public ModelAndView inicio(HttpServletRequest request) {
     HttpSession sessao = request.getSession();
     String usuario = (String) sessao.getAttribute("usuario");
        if ( sessao.getAttribute("usuario") != null & usuario.equalsIgnoreCase(loginEncontrado)) {
            return new ModelAndView("inicio");    
        }else{
            return new ModelAndView("redirect:/"); 
        }  
    }

    @RequestMapping("/inicio")
    public ModelAndView acessarInicio(HttpServletRequest request) {
        HttpSession sessao = request.getSession();
         String usuario = (String) sessao.getAttribute("usuario");
        if (sessao.getAttribute("usuario") != null && usuario.equalsIgnoreCase(loginEncontrado)) {
            return new ModelAndView("inicio");
        }else{
             return new ModelAndView("redirect:/");
        } 
    }
    @RequestMapping("/logoff")
    public ModelAndView sair(HttpServletRequest request){
         HttpSession sessao = request.getSession();
         if(sessao != null){
             sessao.removeAttribute("usuario");
             sessao.removeAttribute("tipo");
         }
         return new ModelAndView("redirect:/");
    }

}
