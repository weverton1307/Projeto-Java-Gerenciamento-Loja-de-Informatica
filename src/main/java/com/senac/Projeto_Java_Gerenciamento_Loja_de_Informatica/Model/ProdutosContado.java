
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;


public class ProdutosContado {
    private String nomeProduto;
    private Long quantidadeProduto;

    // Construtor
    public ProdutosContado(String nomeProduto, Long quantidadeProduto) {
        this.nomeProduto = nomeProduto;
        this.quantidadeProduto = quantidadeProduto;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public Long getQuantidadeProduto() {
        return quantidadeProduto;
    }

  
}
