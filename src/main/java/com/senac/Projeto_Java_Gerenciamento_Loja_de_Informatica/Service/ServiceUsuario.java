package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.CriptografarSenha;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.UsuarioAutenticar;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryUsuario;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceUsuario {

    @Autowired
    RepositoryUsuario reposoitoryUsuario;

    //Função para buscar um usuário cadastrado por seu id
    public Usuario buscarId(Integer id) {
        return reposoitoryUsuario.findById(id).orElseThrow();
    }
    
    //Função para cadastrar um novo usuário
    public Usuario criarUsuario(Usuario usuario) {
        usuario.setId(null);
        reposoitoryUsuario.save(usuario);
        return usuario;
    }

    //Função para retornar uma listar com todos os usuários cadastrados
    public List<Usuario> listarUsuario() {
        return reposoitoryUsuario.findAll();
    }

    //Função para atualizar dados de um usuário cadastrado
    public Usuario atualizar(Integer id, Usuario usuario) {
        Usuario usuarioEncontrado = buscarId(id);
        usuarioEncontrado.setLogin(usuario.getLogin());
        usuarioEncontrado.setSenha(usuario.getSenha());
        usuarioEncontrado.setTipoUsuario(usuario.getTipoUsuario());
        usuarioEncontrado.setUltimo_login(usuario.getUltimo_login());
        return reposoitoryUsuario.save(usuarioEncontrado);
    }

    //Funçãao para Excluir um usuário cadastrado
    public void excluir(Integer id) {
        Usuario usuarioEncontrado = buscarId(id);
        reposoitoryUsuario.deleteById(usuarioEncontrado.getId());
    }

    //Função para autenticar o login de usuário
    public UsuarioAutenticar autenticarUsuario(Usuario usuario) {
        UsuarioAutenticar usuarioAutenticado = null;
        CriptografarSenha criptografarSenha = new CriptografarSenha();
        String senhaCrip = criptografarSenha.convertToMD5(usuario.getSenha());
        System.out.println(senhaCrip);
        List<Usuario> usuarios = listarUsuario();
        for (Usuario u : usuarios) {
            if (usuario.getLogin().equalsIgnoreCase(u.getLogin()) && senhaCrip.equalsIgnoreCase(u.getSenha())) {
                usuarioAutenticado = new UsuarioAutenticar();
                usuarioAutenticado.setTipo(u.getTipoUsuario());
                usuarioAutenticado.setLogin(u.getLogin());
                u.setUltimo_login(LocalDate.now());
                atualizar(u.getId(), u);
            }
        }
        return usuarioAutenticado;
    }
}
