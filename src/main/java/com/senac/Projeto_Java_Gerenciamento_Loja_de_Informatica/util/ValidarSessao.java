package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class  ValidarSessao {

    //Função para validar a sessao
    public static String validarSessao(HttpServletRequest request, String verdadeiro, String falso) {
        HttpSession sessao = request.getSession();
        String usuario = (String) sessao.getAttribute("usuario");
        String login = (String) sessao.getAttribute("login");
         if(usuario != null){
              return verdadeiro;
         }else{
             return falso;
         }
    }
}
