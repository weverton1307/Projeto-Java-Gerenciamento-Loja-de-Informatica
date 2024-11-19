package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import javax.swing.JOptionPane;

public class GeradorRelatorioVendas_MediaLucro implements GeradorRelatorioVendas {

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
                    double faturamentoTotal = 0;
                    for (Itens_venda item : listaItens) {
                        faturamentoTotal += item.totalItens();
                    }
                    double totalValorCompra = 0;
                    for (Itens_venda item : listaItens) {
                        totalValorCompra += item.getProduto().getValorCompra();
                    }
                    double lucroTotal = faturamentoTotal - totalValorCompra;
                    double mediaLucro;
                    /*Util util = new Util();

                    if (!listaItens.isEmpty()) {
                        mediaLucro = lucroTotal / listaItens.size();

                        JOptionPane.showMessageDialog(null, "Média de lucro por venda: R$ " + util.formatarValor(mediaLucro));
                    } else {
                        JOptionPane.showMessageDialog(null, "Não há vendas durante o período especificado");
                    }*/
                }
            }
        }
    }
}
