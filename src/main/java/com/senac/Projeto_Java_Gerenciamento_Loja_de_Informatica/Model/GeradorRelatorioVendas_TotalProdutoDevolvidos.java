package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import javax.swing.JOptionPane;

public class GeradorRelatorioVendas_TotalProdutoDevolvidos {

    public Integer gerarRelatorio(String inicioString, String fimString, List<Devolucao> devolucoes) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate inicio = LocalDate.parse(inicioString, formatter);
        LocalDate fim = LocalDate.parse(fimString, formatter);
        LocalDate dataMinima = LocalDate.of(1000, 1, 1);
        LocalDate dataMaxima = LocalDate.of(2100, 1, 1);
        if (inicio.equals(fim)
                || inicio.isBefore(dataMinima) || inicio.isAfter(dataMaxima)
                || fim.isBefore(dataMinima) || fim.isAfter(dataMaxima)
                || fim.isBefore(inicio)) {

            JOptionPane.showMessageDialog(null, "Relatório não encontrado.\nPor favor, digite um período válido");
        } else {
            int count = 0;

            for (Devolucao devolucao : devolucoes) {
                LocalDate dataDevolucao = devolucao.getData();
                if (!dataDevolucao.isBefore(inicio) && !dataDevolucao.isAfter(fim)) {
                    
                    count++;
                    
                }
            }
            
            if (count == 0) {
                JOptionPane.showMessageDialog(null, "Não há produtos devolvidos durante o período especificado");
            } else {
               return count;
            }
        }
        return 0;
    }
}
