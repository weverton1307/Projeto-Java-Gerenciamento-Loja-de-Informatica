package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Cliente;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryCliente;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCliente {

    @Autowired
    RepositoryCliente reposoitoryCliente;

    //Função para buscar um cliente cadastrado por seu id
    public Cliente buscarId(Integer id) {
        return reposoitoryCliente.findById(id).orElseThrow();
    }
    
    //Função para cadastrar um novo cliente
    public Cliente criarCliente(Cliente cliente) {
        cliente.setId(null);
        reposoitoryCliente.save(cliente);
        return cliente;
    }
    
    //Função para retornar uma listar com todos os clientes cadastrados
    public List<Cliente> listarCliente() {
        return reposoitoryCliente.findAll();
    }
  
    //Função para atualizar dados de um cliente cadastrado
    public Cliente atualizar(Integer id, Cliente cliente) {
        Cliente clienteEncontrado = buscarId(id);
        clienteEncontrado.setCpf(cliente.getCpf());
        clienteEncontrado.setEmail(cliente.getEmail());
        clienteEncontrado.setEndereco(cliente.getEndereco());
        clienteEncontrado.setNome(cliente.getNome());
        clienteEncontrado.setTelefone(cliente.getTelefone());
        clienteEncontrado.setTotal_compras(cliente.getTotal_compras());
        return reposoitoryCliente.save(clienteEncontrado);
    }

    //Função para excluir um cliente cadsatrado
    public void excluir(Integer id) {
        Cliente clienteEncontrado = buscarId(id);
        reposoitoryCliente.deleteById(clienteEncontrado.getId());
    }
}
