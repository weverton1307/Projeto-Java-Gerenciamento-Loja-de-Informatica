package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


public class GeradorRelatorioVendas_LucroTotal {

    public double gerarRelatorio(String inicioString, String fimString, List<Itens_venda> listaItens) {
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate inicio = LocalDate.parse(inicioString, formatter);
        LocalDate fim = LocalDate.parse(fimString, formatter);
        LocalDate dataMinima = LocalDate.of(1000, 1, 1);
        LocalDate dataMaxima = LocalDate.of(2100, 1, 1);
        if (inicio.equals(fim)) {
            System.out.println("Por favor, digite um período válido");
                 
        } else {
            if ((inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima))
                    || (fim.isBefore(dataMinima) || fim.isAfter(dataMaxima))) {
                System.out.println("Por favor, digite um período válido");

            } else if (fim.isBefore(inicio)) {
                System.out.println("Por favor, digite um período válido");
            } else {
                if (listaItens.isEmpty()) {
                    System.out.println("Não há vendas durante o período especificado");
                } else {
                    double faturamentoTotal = 0;
                    for (Itens_venda item : listaItens) {
                        faturamentoTotal += item.totalItens();
                    }
                    double totalValorCompra = 0;
                    for (Itens_venda item : listaItens) {
                        totalValorCompra += item.getProduto().getValorCompra();
                    }
                    Double lucroTotal = faturamentoTotal - totalValorCompra;
                    if (lucroTotal == 0.0) {
                        System.out.println("Não há vendas durante o período especificado");
                    } else {
                      return lucroTotal;
                    }
                }
            }
          
        }
          return 0.0;
    }
}
