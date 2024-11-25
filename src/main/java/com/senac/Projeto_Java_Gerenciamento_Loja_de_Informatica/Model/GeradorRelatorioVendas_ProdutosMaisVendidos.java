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

    public String gerarRelatorio(String inicioString, String fimString, List<Itens_venda> listaItens) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate inicio = LocalDate.parse(inicioString, formatter);
        LocalDate fim = LocalDate.parse(fimString, formatter);

        // Validar datas
        LocalDate dataMinima = LocalDate.of(1000, 1, 1);
        LocalDate dataMaxima = LocalDate.of(2100, 1, 1);

        if (inicio.equals(fim) || inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima)
                || fim.isBefore(dataMinima) || fim.isAfter(dataMaxima) || fim.isBefore(inicio)) {
            return "Intervalo de datas inválido.";
        }

        // Filtrar itens vendidos no período
        List<Itens_venda> itensNoPeriodo = listaItens.stream()
                .filter(item -> {
                    LocalDate dataVenda = item.getVenda().getDataHora().toLocalDate();
                    return !dataVenda.isBefore(inicio) && !dataVenda.isAfter(fim);
                })
                .collect(Collectors.toList());

        if (itensNoPeriodo.isEmpty()) {
            return "Não há vendas durante o período especificado.";
        }

        // Mapear produtos e suas quantidades totais
        Map<String, Integer> produtosQuantidade = new HashMap<>();

        for (Itens_venda item : itensNoPeriodo) {
            String nomeProduto = item.getProduto().getNomeProduto();
            produtosQuantidade.put(nomeProduto,
                    produtosQuantidade.getOrDefault(nomeProduto, 0) + item.getQuantidade());
        }

        // Encontrar o produto mais vendido
        Map.Entry<String, Integer> produtoMaisVendido = produtosQuantidade.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .orElse(null);

        // Retornar o nome do produto mais vendido
        return "Produto mais vendido: " + produtoMaisVendido.getKey();
    }

}
