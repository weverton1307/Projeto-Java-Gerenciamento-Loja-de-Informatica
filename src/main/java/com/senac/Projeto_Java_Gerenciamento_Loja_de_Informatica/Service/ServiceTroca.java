package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Troca;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryTroca;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceTroca {

    @Autowired
    RepositoryTroca reposoitoryTroca;

    public Troca buscarId(Integer id) {
        return reposoitoryTroca.findById(id).orElseThrow();
    }

    public Troca criarTroca(Troca troca) {
        troca.setId(null);
        reposoitoryTroca.save(troca);
        return troca;
    }

    public List<Troca> listarTroca() {
        return reposoitoryTroca.findAll();
    }

    public Troca atualizar(Integer id, Troca troca) {
        Troca trocaEncontrada = buscarId(id);
        trocaEncontrada.setCodigoProduto(troca.getCodigoProduto());
        trocaEncontrada.setData(troca.getData());
        trocaEncontrada.setMotivo(troca.getMotivo());
        trocaEncontrada.setTipo(troca.getTipo());
        return reposoitoryTroca.save(trocaEncontrada);
    }
    
        public void excluir(Integer id){
        Troca trocaEncontrado = buscarId(id);
        reposoitoryTroca.deleteById(trocaEncontrado.getId());
    }
}
