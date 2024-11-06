package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LocalArmazenamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String numeroPrateleira;
    private String numeroLocalPrateleira;

    public LocalArmazenamento() {
    }

    public String getNumeroPrateleira() {
        return numeroPrateleira;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNumeroPrateleira(String numeroPrateleira) {
        this.numeroPrateleira = numeroPrateleira;
    }

    public String getNumeroLocaPrateleira() {
        return numeroLocalPrateleira;
    }

    public void setNumeroLocalPrateleira(String numeroLocaPrateleira) {
        this.numeroLocalPrateleira = numeroLocaPrateleira;
    }

}
