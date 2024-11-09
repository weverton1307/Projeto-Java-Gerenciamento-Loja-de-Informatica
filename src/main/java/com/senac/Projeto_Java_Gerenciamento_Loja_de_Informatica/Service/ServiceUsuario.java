package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryUsuario;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceUsuario {

    @Autowired
    RepositoryUsuario reposoitoryUsuario;

    public Usuario buscarId(Integer id) {
        return reposoitoryUsuario.findById(id).orElseThrow();
    }

    public Usuario criarUsuario(Usuario usuario) {
        usuario.setId(null);
        reposoitoryUsuario.save(usuario);
        return usuario;
    }

    public List<Usuario> listarUsuario() {
        return reposoitoryUsuario.findAll();
    }

    public Usuario atualizar(Integer id, Usuario usuario) {
        Usuario usuarioEncontrado = buscarId(id);
        usuarioEncontrado.setLogin(usuario.getLogin());
        usuarioEncontrado.setSenha(usuario.getSenha());
        usuarioEncontrado.setTipoUsuario(usuario.getTipoUsuario());
        usuarioEncontrado.setUltimo_login(usuario.getUltimo_login());
        return reposoitoryUsuario.save(usuarioEncontrado);
    }
    
   public void excluir(Integer id){
        Usuario usuarioEncontrado = buscarId(id);
        reposoitoryUsuario.deleteById(usuarioEncontrado.getId());
    }
   
 
}
