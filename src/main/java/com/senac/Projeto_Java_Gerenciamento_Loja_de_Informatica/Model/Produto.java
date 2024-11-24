package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import jakarta.persistence.Column;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int codigoProduto;

    public int getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(int codigoProduto) {
        this.codigoProduto = codigoProduto;
    }
     @Column(name = "nome_produto")
    private String nomeProduto;
      @Column(name = "valor_compra")
    private double valorCompra;
       @Column(name = "valor_venda")
    private double valorVenda;
    private String modelo;
     @Column(name = "descricao_tecnica")
    private String descricaoTecnica;
      @Column(name = "data_aquisicao")
    private LocalDate dataAquisicao;
    private String fabricante;
     @Column(name = "nota_fiscal")
    private String notaFiscal;
      @Column(name = "status_produto")
    private String statusProduto;
       @Column(name = "quantidade_produto")
    private int quantidadeProduto;
    private String cpf_cliente_devolucao;
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "troca_id")
    private Troca troca;
    @ManyToOne
    @JoinColumn(name = "devolucao_id")
    private Devolucao devolucao;
    @ManyToOne
    @JoinColumn(name = "local_de_armazenamento_id")
    private Local_armazenamento localArmazenamento;

    public Produto() {

    }

    public Produto(String nomeProduto, double valorCompra, double valorVenda, String modelo, String descricaoTecnica, LocalDate dataAquisicao, String fabricante, String notaFiscal, String statusProduto, int quantidadeProduto) {
        this.nomeProduto = nomeProduto;
        this.valorCompra = valorCompra;
        this.valorVenda = valorVenda;
        this.modelo = modelo;
        this.descricaoTecnica = descricaoTecnica;
        this.dataAquisicao = dataAquisicao;
        this.fabricante = fabricante;
        this.notaFiscal = notaFiscal;
        this.statusProduto = statusProduto;
        this.quantidadeProduto = quantidadeProduto;
    }

    public int getId() {
        return id;
    }

    public String getCpf_cliente_devolucao() {
        return cpf_cliente_devolucao;
    }

    public void setCpf_cliente_devolucao(String cpf_cliente_devolucao) {
        this.cpf_cliente_devolucao = cpf_cliente_devolucao;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Troca getTroca() {
        return troca;
    }

    public void setTroca(Troca troca) {
        this.troca = troca;
    }

    public Devolucao getDevolucao() {
        return devolucao;
    }

    public void setDevolucao(Devolucao devolucao) {
        this.devolucao = devolucao;
    }

    public String getStatusProduto() {
        return statusProduto;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public double getValorCompra() {
        return valorCompra;
    }

    public void setValorCompra(double valorCompra) {
        this.valorCompra = valorCompra;
    }

    public double getValorVenda() {
        return valorVenda;
    }

    public void setValorVenda(double valorVenda) {
        this.valorVenda = valorVenda;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getDescricaoTecnica() {
        return descricaoTecnica;
    }

    public void setDescricaoTecnica(String descricaoTecnica) {
        this.descricaoTecnica = descricaoTecnica;
    }

    public LocalDate getDataAquisicao() {
        return dataAquisicao;
    }

    public void setDataAquisicao(LocalDate dataAquisicao) {
        this.dataAquisicao = dataAquisicao;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getNotaFiscal() {
        return notaFiscal;
    }

    public void setNotaFiscal(String notaFiscal) {
        this.notaFiscal = notaFiscal;
    }

    public int getQuantidadeProduto() {
        return quantidadeProduto;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Local_armazenamento getLocalArmazenamento() {
        return localArmazenamento;
    }

    public void setLocalArmazenamento(Local_armazenamento localArmazenamento) {
        this.localArmazenamento = localArmazenamento;
    }

    public void setQuantidadeProduto(int quantidadeProduto) {
        this.quantidadeProduto = quantidadeProduto;
    }

    public void setStatusProduto(String statusProduto) {
        this.statusProduto = statusProduto;
    }

}
