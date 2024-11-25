package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.swing.JOptionPane;

public class GeradorRelatorio_ClientesMaisFrequentes {

public  String gerarRelatorio(String inicioString, String fimString, List<Itens_venda> listaItens) {
   DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate inicio = LocalDate.parse(inicioString, formatter);
    LocalDate fim = LocalDate.parse(fimString, formatter);
    LocalDate dataMinima = LocalDate.of(1000, 1, 1);
    LocalDate dataMaxima = LocalDate.of(2100, 1, 1);

    // Validação do período
    if (inicio.equals(fim) || inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima) 
        || fim.isBefore(dataMinima) || fim.isAfter(dataMaxima) || fim.isBefore(inicio)) {
        JOptionPane.showMessageDialog(null, "Período inválido. Por favor, insira datas válidas.");
        return null;
    }

    // Filtrar vendas no período
    List<Venda> vendasNoPeriodo = new ArrayList<>();
    for (Itens_venda item : listaItens) {
        LocalDate dataVenda = item.getVenda().getDataHora().toLocalDate();
        if (!dataVenda.isBefore(inicio) && !dataVenda.isAfter(fim)) {
            vendasNoPeriodo.add(item.getVenda());
        }
    }

    if (vendasNoPeriodo.isEmpty()) {
        JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado.");
        return null;
    }

    // Contabilizar frequência de compras por cliente
    Map<String, Integer> clientesCompras = new HashMap<>();
    for (Venda venda : vendasNoPeriodo) {
        Cliente cliente = venda.getCliente();
        String nomeCliente = cliente.getNome();
        clientesCompras.put(nomeCliente, clientesCompras.getOrDefault(nomeCliente, 0) + 1);
    }

    // Encontrar o cliente mais frequente
    String clienteMaisFrequente = null;
    int maxCompras = 0;

    for (Map.Entry<String, Integer> entry : clientesCompras.entrySet()) {
        if (entry.getValue() > maxCompras) {
            clienteMaisFrequente = entry.getKey();
            maxCompras = entry.getValue();
        }
    }

    return clienteMaisFrequente;
}

}
