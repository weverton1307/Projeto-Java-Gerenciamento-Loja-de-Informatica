package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.util.List;

public interface GeradorRelatorioVendas {

    public abstract void gerarRelatorio(String inicioString, String fimString, List<ItensVenda> listaItens);
}
