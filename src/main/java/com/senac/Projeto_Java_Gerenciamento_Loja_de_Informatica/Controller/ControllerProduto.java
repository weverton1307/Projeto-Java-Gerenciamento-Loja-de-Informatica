package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Controller;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Categoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Local_armazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceCategoria;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceLocalArmazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service.ServiceProduto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ControllerProduto {

    @Autowired
    ServiceProduto serviceProduto;

    @Autowired
    ServiceCategoria serviceCategoria;

    @Autowired
    ServiceLocalArmazenamento serviceLocalArmazenamento;

    @GetMapping("/produtos")
    public String inicio(Model model) {
        model.addAttribute("produto", new Produto());
        model.addAttribute("categoria", new Categoria());
        model.addAttribute("localArmazenamento", new Local_armazenamento());
        return "produtos";
    }

    @PostMapping("/cadastro-produto")
    public String cadastrarProduto(Model model, @RequestBody Produto produto) {
        Categoria categoriaEncontrada = null;
        List<Categoria> listaCategoria = serviceCategoria.listarCategoria();
        for (Categoria c : listaCategoria) {
            if (c.getNome().equalsIgnoreCase(produto.getCategoria().getNome())) {
                categoriaEncontrada = c;
            }
        }
        if (categoriaEncontrada == null) {
    throw new IllegalArgumentException("Categoria não encontrada para o nome informado.");
}
        System.out.println("Categoria recebida no produto: " + produto.getCategoria().getNome());
System.out.println("Categoria encontrada: " + (categoriaEncontrada != null ? categoriaEncontrada.getNome() : "Nenhuma"));


        Local_armazenamento localArmazenamentoEncontrado = null;
        List<Local_armazenamento> listaLocalArmazenamento = serviceLocalArmazenamento.listarLocalArmazenamento();
        for (Local_armazenamento l : listaLocalArmazenamento) {
             
            if (l.getNumeroLocalPrateleira().equalsIgnoreCase(produto.getLocalArmazenamento().getNumeroLocalPrateleira()) && l.getNumeroPrateleira().equalsIgnoreCase(produto.getLocalArmazenamento().getNumeroPrateleira())) {
                localArmazenamentoEncontrado = l;
            }
        }
        if (localArmazenamentoEncontrado == null) {
    throw new IllegalArgumentException("Local de armazenamento não encontrado para os valores informados.");
}

        produto.setCategoria(categoriaEncontrada);
        produto.setLocalArmazenamento(localArmazenamentoEncontrado);
        serviceProduto.criarProduto(produto);
        serviceProduto.atualizarQuantidadeproduto(produto);
        return "produtos";
    }
}
