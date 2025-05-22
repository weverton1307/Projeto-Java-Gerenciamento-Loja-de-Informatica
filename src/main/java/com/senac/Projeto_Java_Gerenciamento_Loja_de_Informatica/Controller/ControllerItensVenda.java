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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    ServiceFuncionario serviceFuncionario;

    @Autowired
    ServiceProduto serviceProduto;
    
    Produto produtoEncontrado = null;
    Venda venda = null;
    List<Itens_venda> listaItens = null;
    Itens_venda itens = null;

    @GetMapping("/registrarVenda")
    public String inicio() {

        return "registrarVenda";
    }

    @GetMapping("/buscarProduto")
    @ResponseBody
    public ResponseEntity<?> buscarProduto(@RequestParam("id") Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("ID inválido");
        }
         produtoEncontrado = serviceProduto.buscarId(id);
        if (produtoEncontrado == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }
        return ResponseEntity.ok(produtoEncontrado);
    }

    @GetMapping("/adicionar")
    public String adicionar(){
        
        return "registrarVenda";
    }
}
