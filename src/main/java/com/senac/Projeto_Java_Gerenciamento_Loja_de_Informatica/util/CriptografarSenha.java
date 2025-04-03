
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class CriptografarSenha {
    
    //Função para converter a senha em MD5
   public static String convertToMD5(String senha) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(senha.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException ex) {
            System.err.println("Erro ao converter para MD5: " + ex.getMessage());
            return null;
        }
    } 
}
