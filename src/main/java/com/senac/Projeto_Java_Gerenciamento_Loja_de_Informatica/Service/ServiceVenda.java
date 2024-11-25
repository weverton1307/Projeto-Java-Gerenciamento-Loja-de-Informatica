package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryVenda;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    public Venda atualizar(Integer id, Venda venda) {
        Venda vendaEncontrada = buscarId(id);
        vendaEncontrada.setCliente(venda.getCliente());
        vendaEncontrada.setDataHora(venda.getDataHora());
        vendaEncontrada.setMetodoPagamento(venda.getMetodoPagamento());
        vendaEncontrada.setStatusVenda(venda.getStatusVenda());
        vendaEncontrada.setVendedor(venda.getVendedor());
        return reposoitoryVenda.save(vendaEncontrada);
    }

    public void excluir(Integer id) {
        Venda vendaEncontrado = buscarId(id);
        reposoitoryVenda.deleteById(vendaEncontrado.getId());
    }

    public Venda buscarVendaPorCpfCliente(String cpfCliente) {
 
        List<Venda> listaVenda = listarVenda();
        Venda venda = null;
        for (Venda v : listaVenda) {
            if (v.getCliente().getCpf().equalsIgnoreCase(cpfCliente) && v.getCliente() != null) {
               venda = v;
            }
        }
        return venda;
    }
    
     public List<Venda> buscarVendaPorNomeVendedor(String nomeVendedor) {
        List<Venda> vendasEncontradas = new ArrayList<>();
        List<Venda> listaVenda = listarVenda();
        for (Venda v : listaVenda) {
            if (v.getVendedor().getNome().equalsIgnoreCase(nomeVendedor) && v.getVendedor() != null) {
                vendasEncontradas.add(v);
            }
        }
        return vendasEncontradas;
    }
     
        public List<Venda> buscarVendaPorData(LocalDateTime data) {
        List<Venda> vendasEncontradas = new ArrayList<>();
        List<Venda> listaVenda = listarVenda();
        for (Venda v : listaVenda) {
            if (v.getDataHora().isEqual(data) ) {
                vendasEncontradas.add(v);
            }
        }
        return vendasEncontradas;
    }
        
           public List<Venda> buscarVendaPorStatus(String status) {
        List<Venda> vendasEncontradas = new ArrayList<>();
        List<Venda> listaVenda = listarVenda();
        for (Venda v : listaVenda) {
            if (v.getStatusVenda().equalsIgnoreCase(status) ) {
                vendasEncontradas.add(v);
            }
        }
        return vendasEncontradas;
    }
           
                    public List<Venda> buscarVendaPorMetodoPagamento(String metodoPagamento) {
        List<Venda> vendasEncontradas = new ArrayList<>();
        List<Venda> listaVenda = listarVenda();
        for (Venda v : listaVenda) {
            if (v.getMetodoPagamento().equalsIgnoreCase(metodoPagamento) ) {
                vendasEncontradas.add(v);
            }
        }
        return vendasEncontradas;
    }
}
