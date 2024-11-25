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
    

    @GetMapping("/vendas")
    public String inicioVendas() {

        return "vendas";
    }

    @GetMapping("/buscar-vendas")
    @ResponseBody
    public ResponseEntity<?> buscarVendas(
            @RequestParam(required = false) Integer id
    ) {

        System.out.println("teste:" + id);

        if (id != null) {
            if (id == null || id <= 0) {
                return ResponseEntity.badRequest().body("ID inválido.");
            }

            Itens_venda ItensVendaEncontrada = serviceItensVenda.buscarId(id);
            System.out.println("intens venda" + ItensVendaEncontrada.getProduto().getNomeProduto());
            if (ItensVendaEncontrada == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venda não encontrada.");
            }

            return ResponseEntity.ok(ItensVendaEncontrada);
        } else {
            return ResponseEntity.badRequest().body("Nenhum critério de busca fornecido.");
        }

    }

    @PostMapping("/gerar-relatorio")
    @ResponseBody
    public Double gerarRelatorio(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorioVendas_LucroTotal gerador = new GeradorRelatorioVendas_LucroTotal();
        Double lucroTotal = gerador.gerarRelatorio(dataInicio, dataFinal, listaItens);

        return lucroTotal;
    }

    @PostMapping("/gerar-relatorioMetodoPagamento")
    @ResponseBody
    public String gerarRelatorioMetodoPagamento(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorioVendas_MetodoPagamento gerador = new GeradorRelatorioVendas_MetodoPagamento();
        String metodoPagamento = gerador.gerarRelatorioMetodoPagamento(dataInicio, dataFinal, listaItens);

        return metodoPagamento;
    }
    @PostMapping("/gerar-relatorioMediaLucro")
    @ResponseBody
    public Double gerarRelatorioMediaLucro(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorioVendas_MediaLucro gerador = new GeradorRelatorioVendas_MediaLucro();
        Double MediaLucro = gerador.gerarRelatorio(dataInicio, dataFinal, listaItens);

        return MediaLucro;
    }
    
     @PostMapping("/gerar-relatorioProdutomaisVendido")
    @ResponseBody
    public String gerarRelatorioProdutoMaisVendido(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorioVendas_ProdutosMaisVendidos gerador = new GeradorRelatorioVendas_ProdutosMaisVendidos();
        String produtoMaisVendido = gerador.gerarRelatorio(dataInicio, dataFinal, listaItens);

        return produtoMaisVendido;
        
    }
       @PostMapping("/gerar-relatorioFaturamentoTotal")
    @ResponseBody
    public Double gerarRelatorioFaturamentoTotal(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorio_FaturamentoTotal gerador = new GeradorRelatorio_FaturamentoTotal();
        Double faturamentoTotal = gerador.gerarRelatorio(dataInicio, dataFinal, listaItens);

        return faturamentoTotal;
    }
    
          @PostMapping("/gerar-relatorioTotalVendas")
    @ResponseBody
    public Integer gerarRelatorioTotalVendas(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorio_TotalVendas gerador = new GeradorRelatorio_TotalVendas();
        Integer totalVendas = gerador.gerarRelatorio(dataInicio, dataFinal, listaItens);

        return totalVendas;
    }
     @PostMapping("/gerar-relatorioClienteMaisFrequente")
    @ResponseBody
    public String gerarRelatorioClienteMaisFrequente(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Itens_venda> listaItens = serviceItensVenda.listarItensVenda();
        GeradorRelatorio_ClientesMaisFrequentes gerador = new GeradorRelatorio_ClientesMaisFrequentes();
        String clienteMaisFrequente = gerador.gerarRelatorio(dataInicio, dataFinal, listaItens);

        return clienteMaisFrequente;
    }
           @PostMapping("/gerar-relatorioTotalDevolvidos")
    @ResponseBody
    public Integer gerarRelatorioTotalDevolvidos(
            @RequestParam("dataInicio") String dataInicio,
            @RequestParam("dataFinal") String dataFinal) {
        if (dataInicio == null || dataFinal == null || dataInicio.isEmpty() || dataFinal.isEmpty()) {
            System.out.println("Parâmetros inválidos recebidos.");
            return null;
        }

        System.out.println("inicio:" + dataInicio);
        System.out.println("final:" + dataFinal);
        List<Devolucao> listaDevolucao = serviceDevolucao.listarDevolucao();
        GeradorRelatorioVendas_TotalProdutoDevolvidos gerador = new GeradorRelatorioVendas_TotalProdutoDevolvidos();
        Integer totalDevoolvido = gerador.gerarRelatorio(dataInicio, dataFinal, listaDevolucao);

        return totalDevoolvido;
    }
    
    
}
