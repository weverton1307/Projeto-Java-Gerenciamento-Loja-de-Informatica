package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Funcionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Itens_venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.ProdutoRequest;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceFuncionario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceItensVenda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceVenda;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ControllerItensVenda {

    @Autowired
    ServiceItensVenda serviceItensVenda;

    @Autowired
    ServiceVenda serviceVenda;
    @Autowired
    ServiceCliente serviceCliente;

    @Autowired
    ServiceFuncionario serrviceFuncionario;

    @Autowired
    ServiceFuncionario serviceFuncionario;

    @Autowired
    ServiceProduto serviceProduto;

    Venda venda = new Venda(LocalDateTime.now(), "Realizada");
    List<Itens_venda> listaItensVenda = new ArrayList<>();

    @GetMapping("/registroVenda")
    public String inicio(Model model) {
        model.addAttribute("venda", new Venda());
        model.addAttribute("cliente", new Cliente());
        model.addAttribute("vendedor", new Funcionario());

        return "registroVenda";
    }

    @GetMapping("/registroVendaProduto")
    public String inicioItensVenda(Model model) {
        model.addAttribute("produtoRequest", new ProdutoRequest());

        return "registroVendaProduto";
    }

    @PostMapping("/cadastra-venda")
    public String criarVenda(Model model, @RequestBody Venda vendaFormulario) {
        Cliente clienteEncontrado = null;
        List<Cliente> listaCliente = serviceCliente.listarCliente();
        for (Cliente c : listaCliente) {
            if (c.getCpf().equalsIgnoreCase(vendaFormulario.getCliente().getCpf())) {
                clienteEncontrado = c;
            }
        }
        venda.setCliente(clienteEncontrado);

        Funcionario funcionarioEncontrado = null;
        List<Funcionario> listaFuncionario = serviceFuncionario.listarFuncionario();
        for (Funcionario f : listaFuncionario) {
            if (f.getNome().equalsIgnoreCase(vendaFormulario.getVendedor().getNome())) {
                funcionarioEncontrado = f;
            }
        }
        venda.setVendedor(funcionarioEncontrado);
        venda.setMetodoPagamento(vendaFormulario.getMetodoPagamento());
        // O JPA agora irá gerar o id automaticamente, sem necessidade de atribuição manual
        serviceVenda.criarVenda(venda);  // Não é necessário setar o ID manualmente
        return "registroVenda";
    }

    @PostMapping("/procurar-produto")
    @ResponseBody
    public Itens_venda buscarProduto(@RequestBody ProdutoRequest produtoRequest) {
        Produto produtoEncontrado = serviceProduto.buscarId(produtoRequest.getCodigoProduto());

        Itens_venda itensVenda = new Itens_venda();
        int count = 1;
        itensVenda.setId(count);
        itensVenda.setProduto(produtoEncontrado);
        itensVenda.setQuantidade(produtoRequest.getQuantidade());
        itensVenda.setVenda(venda);
        listaItensVenda.add(itensVenda);

        System.out.println("Produto encontrado: " + itensVenda.getProduto().getNomeProduto());
        count++;
        return itensVenda;
    }

    @GetMapping("/listar-itens")
    @ResponseBody
    public List<Itens_venda> listarItensVenda(Model model) {
        System.out.println("Itens de venda: " + listaItensVenda);
        int count = 0;
        for (Itens_venda iv : listaItensVenda) {
            System.out.println("quantidade: " + iv.getQuantidade());
            System.out.println("produto: " + iv.getProduto().getNomeProduto());
            System.out.println("valor: " + iv.getProduto().getValorVenda());
            count++;

        }
        System.out.println("itens:" + count);
        return listaItensVenda;
    }

    @PostMapping("/registrar-venda")
    public String registrarVenda() {
        for (Itens_venda iv : listaItensVenda) {
            iv.setVenda(venda);
            Produto produtoVendido = serviceProduto.atualizarStatusVendido(iv.getProduto());
            serviceProduto.atualizar(produtoVendido.getId(), produtoVendido);
            serviceItensVenda.criarItensVenda(iv);
        }

        listaItensVenda.clear();

        return "menu";
    }
    
 @PostMapping("/cancelar-venda")
public String cancelarVenda() {
    List<Venda> listaVenda = serviceVenda.listarVenda();

    // Verificar se a lista de vendas não está vazia
    if (!listaVenda.isEmpty()) {
        Venda ultimaVenda = listaVenda.get(listaVenda.size() - 1); // Obtém a última venda
        serviceVenda.excluir(ultimaVenda.getId()); // Exclui pelo ID
        System.out.println("Venda cancelada: ID=" + ultimaVenda.getId());
    } else {
        System.out.println("Nenhuma venda para cancelar.");
    }

    listaItensVenda.clear();

    return "menu";
}

}
