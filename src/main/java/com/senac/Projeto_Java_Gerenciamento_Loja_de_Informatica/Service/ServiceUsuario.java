package com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Service;

import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Model.Usuario;
import com.senac.Projeto_Java_Gerenciamento_Loja_de_Informatica.Repository.RepositoryUsuario;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

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

    public void excluir(Integer id) {
        Usuario usuarioEncontrado = buscarId(id);
        reposoitoryUsuario.deleteById(usuarioEncontrado.getId());
    }

    public static String convertToMD5(String senha) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(senha.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException ex) {
            System.err.println("Erro ao converter para MD5: " + ex.getMessage());
            return null;
        }
    }

    public boolean autenticarUsuario(Usuario usuario, Model model) {
        String senhaCriptografada = convertToMD5(usuario.getSenha());
        boolean usuarioEncontrado = false;
        List<Usuario> listaUsuario = listarUsuario();

       for (Usuario u : listaUsuario) {
    if (usuario.getLogin().equalsIgnoreCase(u.getLogin()) && senhaCriptografada.equalsIgnoreCase(u.getSenha())) {
        usuarioEncontrado = true;
        model.addAttribute("usuarioNome", u.getLogin());
        model.addAttribute("tipoUsuario", u.getTipoUsuario());
        System.out.println("Tipo de usuário: " + u.getTipoUsuario());
        break;
    }
}
        return usuarioEncontrado;
    }


}