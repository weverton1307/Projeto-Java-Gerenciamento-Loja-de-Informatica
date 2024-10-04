# Sistema de Gerenciamento de Loja de Informática

## Status do Projeto
(em desenvolvimento)

## Tecnologias Aplicadas
- Linguagem de Programação: JAVA
- IDE: NetBeans
- Banco de Dados: MySQL (utilizando MySQL Workbench)
- Ferramenta de versionamento: Git Bash
- Repositório remoto: Github

## Time de Desenvolvedores
- Weverton Oliveira Marinho

## Objetivo do Software
Este projeto de software tem como objetivo desenvolver um sistema web que auxilie no gerenciamento de uma loja de informática. O sistema visa facilitar as operações diárias, automatizando processos e proporcionando uma experiência mais produtiva para os usuários da loja.
## Funcionalidades do Sistema

### Requisitos Funcionais
1. **Login:**
   - Permite que usuários autenticados (Gerente, Vendedores) acessem o sistema informando o nome de usuário e a senha.

2. **Menu:**
   - Apresenta as funções disponíveis para acessar no sistema.

3. **Cadastro de Funcionários:**
   - Permite ao Gerente cadastrar funcionários com informações como nome, cargo, endereço, telefone, e-mail, nome de usuário e senha.

4. **Cadastro de Clientes:**
   - Permite ao Gerente e Vendedores cadastrar clientes com informações como nome, endereço, CPF, telefone, e-mail.

5. **Cadastro de Produtos:**
   - Permite ao Gerente cadastrar produtos no sistema com informações como nome, valor de compra, valor de venda, categoria, modelo, descrição técnica, data de aquisição, fabricante, número da prateleira, número do local na prateleira e número da nota fiscal.

6. **Rastrear Produtos:**
   - Permite ao Gerente e Vendedores pesquisar informações de produtos no sistema com base em diferentes critérios como código do produto, nome, modelo, fabricante, categoria, disponibilidade, produto devolvido.

7. **Exibir Quantidade de Unidades de um Produto:**
   - Permite ao Gerente e Vendedores consultar a quantidade atual de unidades disponíveis de um produto no sistema digitando o código do produto.

8. **Exibir Funcionários:**
   - Apresenta ao Gerente a lista de todos os funcionários cadastrados.

9. **Contato com Clientes:**
   - Permite ao Gerente e Vendedores buscar informações de clientes cadastrados para contato usando o CPF do cliente.

10. **Registro de Vendas:**
    - Permite ao Gerente e Vendedores registrar vendas realizadas com informações como data e hora da venda, código do produto, nome do produto vendido, quantidade, valor unitário, valor subtotal de cada produto, valor total da venda, CPF do cliente, nome do vendedor responsável e método de pagamento.

11. **Registro de Devolução:**
    - Permite ao Gerente registrar devoluções de produtos feitas pelos clientes com informações como código do produto, motivo da devolução, data da devolução.

12. **Registro de Troca:**
    - Permite ao Gerente registrar trocas de produtos feitas pelos clientes com informações como código do produto, motivo da troca e data da troca.

13. **Exibir Devoluções e Trocas:**
    - Permite ao Gerente e Vendedores pesquisar informações sobre devoluções e trocas de produtos no sistema usando o código do produto.

14. **Controle de Localização de Estoque:**
    - Permite ao Gerente e Vendedores pesquisar e atualizar a localização física dos produtos no sistema usando o código do produto estocado.

15. **Exibir Vendas:**
    - Permite ao Gerente e Vendedores pesquisar e visualizar as informações das vendas realizadas no sistema usando informações como CPF do Cliente, Nome do Vendedor, Data da Venda, Status ou Método de Pagamento.

16. **Relatório de Vendas:**
    - Permite ao Gerente gerar relatórios sobre as vendas realizadas filtradas por período diário, semanal, mensal ou anual, apresentando informações como total de vendas, produtos mais vendidos, total de produtos devolvidos, total de vendas por categoria, faturamento total, lucro total, média de lucro por venda, método de pagamento mais utilizado e clientes mais frequentes.

17. **Atualização ou Exclusão de Registros:**
    - Permite ao Gerente usar o código do produto para pesquisar e selecionar um registro específico no sistema para realizar atualizações ou exclusões.

18. **Sair:**
    - Permite ao usuário (Gerente, Vendedores) sair do sistema.

### Requisitos Não Funcionais
- O sistema é compatível com o sistema operacional Windows.
- O sistema tem autenticação de usuário.
- O sistema possui baixos requisitos de hardware, permitindo que seja executado em máquinas com diferentes capacidades de processamento.
5. A seleção de cores corresponde à paleta utilizada no logo da loja.

### Requisitos Observados e Regras de Negócio
- O sistema requer um banco de dados para armazenar os registros.
- O gerente tem acesso a todas as funcionalidades do sistema.
- Os vendedores têm acesso limitado, podendo realizar as seguintes atividades: autenticar-se, acessar o menu, cadastrar novos clientes, rastrear produtos, consultar a quantidade de unidades em estoque, entrar em contato com clientes, registrar vendas, exibir informações de devoluções e trocas, alterar a localização física dos produtos no estoque, pesquisar vendas e sair do sistema.
- Os vendedores podem acessar o sistema apenas durante o horário comercial.
- O gerente tem acesso ao sistema em qualquer horário.
- Quando uma venda é realizada, o sistema atualiza automaticamente o status da venda para "realizada".
- O sistema deve atualizar automaticamente a quantidade de compras realizadas por um cliente registrado.
- Após a venda de um produto, o sistema deve alterar automaticamente o status do produto para "vendido".
- Após cada cinco compras de um cliente, o sistema deve conceder um desconto de 10% na próxima compra, ajustando automaticamente o valor do produto escolhido pelo cliente.
- Se o usuário inserir informações incorretas, o sistema deve exibir uma mensagem de notificação solicitando que ele tente novamente.
- Quando a quantidade disponível de um produto no estoque for inferior a cinco unidades, o sistema deve enviar uma notificação com informações sobre o produto e a quantidade restante.
- O sistema deve estar em conformidade com o Código de Defesa do Consumidor.
- Em caso de devolução, o sistema deve atualizar o registro da venda associada ao produto devolvido para o status "cancelada", subtrair a venda cancelada da quantidade de compras feitas pelo cliente registrado e alterar o status do produto devolvido para "devolvido".
- Em caso de troca, o sistema deve mudar o status da venda para "cancelada" e atualizar o status do produto devolvido para "disponível".
- O sistema permite atualizar e excluir dados de funcionários, clientes, produtos, usuários e vendas.
- O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018.
-O sistema deve garantir a segurança dos dados cadastrados.
