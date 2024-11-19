package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Local_armazenamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
      @Column(name = "numero_prateleira")
    private String numeroPrateleira;
        @Column(name = "numero_local_prateleira")
    private String numeroLocalPrateleira;

    public Local_armazenamento() {
    }

    public Local_armazenamento(String numeroPrateleira, String numeroLocalPrateleira) {
        this.numeroPrateleira = numeroPrateleira;
        this.numeroLocalPrateleira = numeroLocalPrateleira;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumeroPrateleira() {
        return numeroPrateleira;
    }

    public void setNumeroPrateleira(String numeroPrateleira) {
        this.numeroPrateleira = numeroPrateleira;
    }

    public String getNumeroLocalPrateleira() {
        return numeroLocalPrateleira;
    }

    public void setNumeroLocalPrateleira(String numeroLocalPrateleira) {
        this.numeroLocalPrateleira = numeroLocalPrateleira;
    }

  
   

}
