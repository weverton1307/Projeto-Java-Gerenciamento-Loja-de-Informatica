package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Itens_venda;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryItensVenda;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceItensVenda {

    @Autowired
    RepositoryItensVenda reposoitoryItensVenda;

    public Itens_venda buscarId(Integer id) {
        return reposoitoryItensVenda.findById(id).orElseThrow();
    }

    public Itens_venda criarItensVenda(Itens_venda itensVenda) {
        itensVenda.setId(null);
        reposoitoryItensVenda.save(itensVenda);
        return itensVenda;
    }

    public List<Itens_venda> listarItensVenda() {
        return reposoitoryItensVenda.findAll();
    }

    public Itens_venda atualizar(Integer id, Itens_venda itensVenda) {
        Itens_venda itensVendaEncontrada = buscarId(id);
        itensVendaEncontrada.setProduto(itensVenda.getProduto());
        itensVendaEncontrada.setQuantidade(itensVenda.getQuantidade());
        itensVendaEncontrada.setVenda(itensVenda.getVenda());
        return reposoitoryItensVenda.save(itensVendaEncontrada);
    }

    public void excluir(Integer id) {
        Itens_venda itensVendaEncontrada = buscarId(id);
        reposoitoryItensVenda.deleteById(itensVendaEncontrada.getId());
    }

    public void atualizarDevolucao(Devolucao devolucao) {
        List<Itens_venda> lista = listarItensVenda();
        for (Itens_venda iv : lista) {
            if (iv.getProduto().getId() == devolucao.getCodigoProduto()) {
                iv.getVenda().setStatusVenda("Cancelada");
                 atualizar(iv.getId(), iv);
            }
        }

    }

    public void atualizarTroca(Troca troca, List<Produto> listaProduto, Produto produto) {
        Produto produtoEncontrado = null;
        for (Produto p : listaProduto) {
            if (p.getNomeProduto().equalsIgnoreCase(produto.getNomeProduto()) && p.getId() != produto.getId()) {
                produtoEncontrado = p;
            }
        }
        List<Itens_venda> lista = listarItensVenda();
        for(Itens_venda iv: lista){
            if(iv.getProduto().getId() == troca.getCodigoProduto()){
                iv.setProduto(produtoEncontrado);
               atualizar(iv.getId(), iv);
            }
        }
     


    }

}
