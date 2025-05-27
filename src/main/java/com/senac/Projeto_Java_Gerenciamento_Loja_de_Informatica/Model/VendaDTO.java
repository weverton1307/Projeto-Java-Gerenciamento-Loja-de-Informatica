
package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.util.List;


public class VendaDTO {
       private String cpf;
    private String metodoPagamento;
    private List<ItensDTO> itens;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getMetodoPagamento() {
        return metodoPagamento;
    }

    public void setMetodoPagamento(String metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }

    public List<ItensDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItensDTO> itens) {
        this.itens = itens;
    }   
}
