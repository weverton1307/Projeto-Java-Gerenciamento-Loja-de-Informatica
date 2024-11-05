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

     public static Map<String, Integer> gerarRelatório(String inicioString, String fimString, List<ItensVenda> listaItens) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate inicio = LocalDate.parse(inicioString, formatter);
        LocalDate fim = LocalDate.parse(fimString, formatter);
        LocalDate dataMinima = LocalDate.of(1000, 1, 1);
        LocalDate dataMaxima = LocalDate.of(2100, 1, 1);
        if (inicio.equals(fim)) {
            return null;
        } else {
            if ((inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima))
                    || (fim.isBefore(dataMinima) || fim.isAfter(dataMaxima))) {
                return null;
            } else if (fim.isBefore(inicio)) {
                return null;
            } else {
                List<Venda> vendasNoPeriodo = new ArrayList<>();
                for (ItensVenda item : listaItens) {
                    LocalDate dataVenda = item.getVenda().getDataHora().toLocalDate();
                    if (!dataVenda.isBefore(inicio) && !dataVenda.isAfter(fim)) {
                        vendasNoPeriodo.add(item.getVenda());
                    }
                }

                Map<String, Integer> clientesCompras = new HashMap<>();

                for (Venda venda : vendasNoPeriodo) {
                    Cliente cliente = venda.getCliente();
                    String nomeCliente = cliente.getNome();
                    int quantidadeCompras = cliente.getTotal_compras();

                    clientesCompras.put(nomeCliente, quantidadeCompras);
                }

                List<Map.Entry<String, Integer>> clientesOrdenados = clientesCompras.entrySet()
                        .stream()
                        .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue())) 
                        .collect(Collectors.toList());

                Map<String, Integer> clientesOrden = new HashMap<>();
                for (Map.Entry<String, Integer> entry : clientesOrdenados) {
                    clientesOrden.put(entry.getKey(), entry.getValue());
                    System.out.println(entry.getKey() + " " + entry.getValue());
                }
                 if (vendasNoPeriodo.isEmpty()) {
                   JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado.");
                }
                return clientesOrden;
            }
        }
    }
}
