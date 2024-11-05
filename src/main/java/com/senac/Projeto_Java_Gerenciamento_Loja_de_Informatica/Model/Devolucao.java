package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Devolucao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int codigoProduto;
    private String motivo;
    private String tipo;

    public Devolucao() {
    }

    public Devolucao(int codigoProduto, String motivo, LocalDate data) {
        this.codigoProduto = codigoProduto;
        this.motivo = motivo;
        this.data = data;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    private LocalDate data;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(int codigoProduto) {
        this.codigoProduto = codigoProduto;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

}
