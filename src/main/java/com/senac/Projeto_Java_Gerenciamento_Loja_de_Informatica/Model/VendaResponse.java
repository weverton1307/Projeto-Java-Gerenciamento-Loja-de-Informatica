/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.util.List;

/**
 *
 * @author acer
 */
public class VendaResponse {
     private Venda venda;
    private List<Itens_venda> itensVenda;
    private Funcionario vendedor; 
    private Cliente cliente;

    public Venda getVenda() {
        return venda;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }

    public List<Itens_venda> getItensVenda() {
        return itensVenda;
    }

    public void setItensVenda(List<Itens_venda> itensVenda) {
        this.itensVenda = itensVenda;
    }

    public Funcionario getVendedor() {
        return vendedor;
    }

    public void setVendedor(Funcionario vendedor) {
        this.vendedor = vendedor;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public VendaResponse(Venda venda, List<Itens_venda> itensVenda) {
        this.venda = venda;
        this.itensVenda = itensVenda;
    } 
}
