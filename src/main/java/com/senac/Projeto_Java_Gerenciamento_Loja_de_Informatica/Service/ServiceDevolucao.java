package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Devolucao;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryDevolucao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceDevolucao {

    @Autowired
    RepositoryDevolucao reposoitoryDevolucao;

    public Devolucao buscarId(Integer id) {
        return reposoitoryDevolucao.findById(id).orElseThrow();
    }

    public Devolucao criarDevolucao(Devolucao devolucao) {
        devolucao.setId(null);
        reposoitoryDevolucao.save(devolucao);
        return devolucao;
    }

    public List<Devolucao> listarDevolucao() {
        return reposoitoryDevolucao.findAll();
    }

    public Devolucao atualizar(Integer id, Devolucao devolucao) {
        Devolucao devolucaoEncontrada = buscarId(id);
        devolucaoEncontrada.setCodigoProduto(devolucao.getCodigoProduto());
        devolucaoEncontrada.setData(devolucao.getData());
        devolucaoEncontrada.setMotivo(devolucao.getMotivo());
        devolucaoEncontrada.setTipo(devolucao.getTipo());
        devolucaoEncontrada.setNome_produto(devolucao.getNome_produto());
        return reposoitoryDevolucao.save(devolucaoEncontrada);
    }

    public void excluir(Integer id) {
        Devolucao devolucaoEncontrada = buscarId(id);
        reposoitoryDevolucao.deleteById(devolucaoEncontrada.getId());
    }

}
