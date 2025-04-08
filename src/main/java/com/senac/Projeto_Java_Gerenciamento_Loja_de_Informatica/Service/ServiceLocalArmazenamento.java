package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Local_armazenamento;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Produto;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryLocalArmazenamento;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceLocalArmazenamento {

    @Autowired
    RepositoryLocalArmazenamento reposoitoryLocalArmazenamento;

    public Local_armazenamento buscarId(Integer id) {
        return reposoitoryLocalArmazenamento.findById(id).orElseThrow();
    }

    public Local_armazenamento criarLocalArmazenamento(Local_armazenamento localArmazenamento) {
        localArmazenamento.setId(null);
        reposoitoryLocalArmazenamento.save(localArmazenamento);
        return localArmazenamento;
    }

    public List<Local_armazenamento> listarLocalArmazenamento() {
        return reposoitoryLocalArmazenamento.findAll();
    }

    public Local_armazenamento atualizar(Integer id, Local_armazenamento localArmazenamento) {
        Local_armazenamento localArmazenamentoEncontrado = buscarId(id);
        localArmazenamentoEncontrado.setNumeroLocalPrateleira(localArmazenamento.getNumeroLocalPrateleira());
        localArmazenamentoEncontrado.setNumeroPrateleira(localArmazenamento.getNumeroPrateleira());
        return reposoitoryLocalArmazenamento.save(localArmazenamentoEncontrado);
    }

    public void excluir(Integer id) {
        Local_armazenamento localArmazenamentoEncontrado = buscarId(id);
        reposoitoryLocalArmazenamento.deleteById(localArmazenamentoEncontrado.getId());
    }
    public Local_armazenamento buscarLoca_armazenamento(Produto produto){
          Local_armazenamento localArmazenamentoEncontrado = null;
        List<Local_armazenamento> listaLocalArmazenamento = listarLocalArmazenamento();
        for (Local_armazenamento l : listaLocalArmazenamento) {

            if (l.getNumeroLocalPrateleira().equalsIgnoreCase(produto.getLocalArmazenamento().getNumeroLocalPrateleira()) && l.getNumeroPrateleira().equalsIgnoreCase(produto.getLocalArmazenamento().getNumeroPrateleira())) {
                localArmazenamentoEncontrado = l;
            }
        }
        return localArmazenamentoEncontrado;
    }

}
