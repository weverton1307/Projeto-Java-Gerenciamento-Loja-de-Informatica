package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class ItensVenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantidade;
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;
    @ManyToOne
    @JoinColumn(name = "venda_id")
    private Venda venda;

    public ItensVenda() {
    }

    public ItensVenda(int quantidade) {
        this.quantidade = quantidade;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Venda getVenda() {
        return venda;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }

    public double totalItens() {
        return quantidade * produto.getValorVenda();
    }
}
