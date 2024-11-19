package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.swing.JOptionPane;

public class GeradorRelatorioVendas_MetodoPagamento implements GeradorRelatorioVendas {

    @Override
    public void gerarRelatorio(String inicioString, String fimString, List<Itens_venda> listaItens) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate inicio = LocalDate.parse(inicioString, formatter);
        LocalDate fim = LocalDate.parse(fimString, formatter);
        LocalDate dataMinima = LocalDate.of(1000, 1, 1);
        LocalDate dataMaxima = LocalDate.of(2100, 1, 1);
        if (inicio.equals(fim)) {
            JOptionPane.showMessageDialog(null, "Relatório não encontrado.\n"
                    + "Por favor, digite um período válido");

        } else {
            if ((inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima))
                    || (fim.isBefore(dataMinima) || fim.isAfter(dataMaxima))) {
                JOptionPane.showMessageDialog(null, "Relatório não encontrado.\n"
                        + "Por favor, digite um período válido");

            } else if (fim.isBefore(inicio)) {
                JOptionPane.showMessageDialog(null, "Relatório não encontrado.\n"
                        + "Por favor, digite um período válido");

            } else {
                if (listaItens.isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado");
                } else {
                    String metodoMaisUtilizado = "";
                    int maxContagem = 0;

                    Map<String, Integer> contagemMetodos = new HashMap<>();

                    for (Itens_venda item : listaItens) {
                        String metodo = item.getVenda().getMetodoPagamento();
                        contagemMetodos.put(metodo, contagemMetodos.getOrDefault(metodo, 0) + 1);

                        if (contagemMetodos.get(metodo) > maxContagem) {
                            maxContagem = contagemMetodos.get(metodo);
                            metodoMaisUtilizado = metodo;
                        }
                    }
                    if (metodoMaisUtilizado.equalsIgnoreCase("")) {
                        JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado");
                    } else {
                        JOptionPane.showMessageDialog(null, "O método de pagamento mais utilizado é o " + metodoMaisUtilizado + ". ");
                    }
                }
            }
        }
    }
}
