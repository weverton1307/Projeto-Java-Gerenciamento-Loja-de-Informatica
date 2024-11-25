package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import javax.swing.JOptionPane;

public class GeradorRelatorio_FaturamentoTotal  {

    public Double gerarRelatorio(String inicioString, String fimString, List<Itens_venda> listaItens) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
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
                double faturamentoTotal = 0;
                for (Itens_venda item : listaItens) {
                    LocalDate dataVenda = item.getVenda().getDataHora().toLocalDate();
                    if (!dataVenda.isBefore(inicio) && !dataVenda.isAfter(fim)) {
                        faturamentoTotal += item.totalItens();
                    }
                }
                if (faturamentoTotal == 0.0) {
                    JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado");
                } else {
                    return faturamentoTotal;
                }
            }
        }
        return 0.0;
    }
}
