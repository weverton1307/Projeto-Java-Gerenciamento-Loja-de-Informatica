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
import java.time.LocalDateTime;
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

}
