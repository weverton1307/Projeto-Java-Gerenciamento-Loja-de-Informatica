package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryVenda;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceVenda {

    @Autowired
    RepositoryVenda reposoitoryVenda;

    public Venda buscarId(Integer id) {
        return reposoitoryVenda.findById(id).orElseThrow();
    }

    public Venda criarVenda(Venda venda) {
        venda.setId(null);
        reposoitoryVenda.save(venda);
        return venda;
    }

    public List<Venda> listarVenda() {
        return reposoitoryVenda.findAll();
    }
    
      public Venda atualizar(Integer id, Venda venda){
        Venda vendaEncontrada = buscarId(id);
        vendaEncontrada.setCliente(venda.getCliente());
        vendaEncontrada.setDataHora(venda.getDataHora());
        vendaEncontrada.setMetodoPagamento(venda.getMetodoPagamento());
        vendaEncontrada.setStatusVenda(venda.getStatusVenda());
        vendaEncontrada.setVendedor(venda.getVendedor());
        return reposoitoryVenda.save(vendaEncontrada);
    }

}
