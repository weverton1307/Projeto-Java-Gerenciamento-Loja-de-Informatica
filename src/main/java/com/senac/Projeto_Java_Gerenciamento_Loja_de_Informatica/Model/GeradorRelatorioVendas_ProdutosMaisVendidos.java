package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.swing.JOptionPane;

public class GeradorRelatorioVendas_ProdutosMaisVendidos {

    public static Map<String, Integer> gerarRelatório(String inicioString, String fimString, List<ItensVenda> ListaItens) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate inicio = LocalDate.parse(inicioString, formatter);
        LocalDate fim = LocalDate.parse(fimString, formatter);
        LocalDate dataMinima = LocalDate.of(1000, 1, 1);
        LocalDate dataMaxima = LocalDate.of(2100, 1, 1);

        if (inicio.equals(fim) || inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima)
                || fim.isBefore(dataMinima) || fim.isAfter(dataMaxima) || fim.isBefore(inicio)) {
            return null;
        }

        List<ItensVenda> itensNoPeriodo = new ArrayList<>();

        for (ItensVenda item : ListaItens) {
            LocalDate dataVenda = item.getVenda().getDataHora().toLocalDate();
            if (!dataVenda.isBefore(inicio) && !dataVenda.isAfter(fim)) {
                itensNoPeriodo.add(item);
            }
        }

        Map<String, Integer> produtosQuantidade = new HashMap<>();

        for (ItensVenda item : itensNoPeriodo) {
            produtosQuantidade.put(item.getProduto().getNomeProduto(),
                    produtosQuantidade.getOrDefault(item.getProduto().getNomeProduto(), 0) + item.getQuantidade());
        }

        List<Map.Entry<String, Integer>> produtosOrdenados = produtosQuantidade.entrySet()
                .stream()
                .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))
                .collect(Collectors.toList());

        Map<String, Integer> produtosOrden = new HashMap<>();

        for (Map.Entry<String, Integer> entry : produtosOrdenados) {
            produtosOrden.put(entry.getKey(), entry.getValue());
        }

        if (itensNoPeriodo.isEmpty()) {
            JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado.");
        }

        return produtosOrden;
    }

}
