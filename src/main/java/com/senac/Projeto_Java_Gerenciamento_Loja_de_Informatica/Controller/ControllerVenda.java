package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorioVendas_LucroTotal;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorioVendas_MediaLucro;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorioVendas_MetodoPagamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorioVendas_ProdutosMaisVendidos;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorioVendas_TotalProdutoDevolvidos;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorio_ClientesMaisFrequentes;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorio_FaturamentoTotal;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.GeradorRelatorio_TotalVendas;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Itens_venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceDevolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ControllerVenda {

    @Autowired
    ServiceVenda serviceVenda;

    @Autowired
    ServiceItensVenda serviceItensVenda;

    @Autowired
    ServiceDevolucao serviceDevolucao;

    @GetMapping("/pesquisarVendas")
    public String inicioVendas() {

        return "pesquisarVendas";
    }

    @GetMapping("/pesquisarVenda/codigo")
    @ResponseBody
    public ResponseEntity<?> buscarPorCodigo() {
        List<Itens_venda> itens = serviceItensVenda.listarItensVenda();
        return ResponseEntity.ok(itens);
    }

    @GetMapping("/listarVendas")
    @ResponseBody
    public ResponseEntity<?> listarVendas() {
        List<Itens_venda> itens = serviceItensVenda.listarItensVenda();
        return ResponseEntity.ok(itens);
    }

    @GetMapping("/pesquisarVenda/data")
    @ResponseBody
    public ResponseEntity<?> buscarPorData(@RequestParam String data) {
        List<Itens_venda> itensPorData = new ArrayList<>();

        try {
            LocalDate dataConvertida = LocalDate.parse(data);
            List<Itens_venda> itens = serviceItensVenda.listarItensVenda();
            for (Itens_venda iv : itens) {
                LocalDate dataVenda = iv.getVenda().getDataHora().toLocalDate();
                if (dataVenda.equals(dataConvertida)) {
                    itensPorData.add(iv);
                }
            }
            return ResponseEntity.ok(itensPorData);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Data inválida: " + data);
        }
    }

    @GetMapping("/pesquisarVenda/status")
    @ResponseBody
    public ResponseEntity<?> buscarPorStatus(@RequestParam String status) {
        List<Itens_venda> itensPorStatus = new ArrayList<>();

        List<Itens_venda> itens = serviceItensVenda.listarItensVenda();
        for (Itens_venda iv : itens) {
            if (iv.getVenda().getStatusVenda().equalsIgnoreCase(status)) {
                itensPorStatus.add(iv);
            }
        }
        return ResponseEntity.ok(itensPorStatus);

    }
    
    
    @GetMapping("/pesquisarVenda/cpf")
    @ResponseBody
    public ResponseEntity<?> buscarPorCpf(@RequestParam String cpf) {
        List<Itens_venda> itensPorCpf = new ArrayList<>();

        List<Itens_venda> itens = serviceItensVenda.listarItensVenda();
        for (Itens_venda iv : itens) {
            if (iv.getVenda().getCliente().getCpf().equalsIgnoreCase(cpf)) {
                itensPorCpf.add(iv);
            }
        }
        return ResponseEntity.ok(itensPorCpf);

    }
    
      @GetMapping("/pesquisarVenda/vendedor")
    @ResponseBody
    public ResponseEntity<?> buscarPorVendedor(@RequestParam String vendedor) {
        List<Itens_venda> itensPorVendedor = new ArrayList<>();

        List<Itens_venda> itens = serviceItensVenda.listarItensVenda();
        for (Itens_venda iv : itens) {
            if (iv.getVenda().getVendedor().getNome().equalsIgnoreCase(vendedor)) {
                itensPorVendedor.add(iv);
            }
        }
        return ResponseEntity.ok(itensPorVendedor);

    }

}
