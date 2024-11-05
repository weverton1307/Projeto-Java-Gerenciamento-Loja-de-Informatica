package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String login;
    private String senha;
    private String tipoUsuario;
    private LocalDate ultimo_login;

    public Usuario() {
    }

    public Usuario(String login, String senha) {
        this.login = login;
        this.senha = senha;
        this.ultimo_login = LocalDate.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDate getUltimo_login() {
        return ultimo_login;
    }

    public void setUltimo_login(LocalDate ultimo_login) {
        this.ultimo_login = ultimo_login;
    }

}
