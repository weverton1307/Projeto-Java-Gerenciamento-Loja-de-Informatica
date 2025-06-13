
CREATE DATABASE lojaInfo;
use lojaInfo;
CREATE TABLE usuario (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  login VARCHAR(20) NOT NULL,
  senha VARCHAR(32) NOT NULL,
  tipo_usuario VARCHAR(30) NOT NULL,
  ultimo_login DATETIME 
);

CREATE TABLE cargo (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(20) NOT NULL
);

CREATE TABLE local_armazenamento (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  numero_prateleira VARCHAR(20) NOT NULL,
  numero_local_prateleira VARCHAR(20) NOT NULL 
);

CREATE TABLE troca (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  codigo_produto INT NOT NULL,
  motivo VARCHAR(45) NOT NULL,
  tipo VARCHAR(45) NOT NULL,
   nome_produto VARCHAR(45) ,
  data DATE NOT NULL
);

CREATE TABLE devolucao (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  codigo_produto INT NOT NULL,
  motivo VARCHAR(45) NOT NULL,
  tipo VARCHAR(45) NOT NULL,
  nome_produto VARCHAR(45) ,
  data DATE NOT NULL
);

CREATE TABLE categoria (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);

CREATE TABLE cliente (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(55) NOT NULL,
  endereco VARCHAR(250) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(45),
  total_compras INT
);

CREATE TABLE funcionario (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(55) NOT NULL,
  endereco VARCHAR(250) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(45),
  cargo_id INT NOT NULL,
  usuario_id INT NOT NULL,
  FOREIGN KEY (cargo_id) REFERENCES cargo(id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE produto (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_produto VARCHAR(45) NOT NULL,
  valor_compra DECIMAL(7, 2) NOT NULL,
  valor_venda DECIMAL(7, 2) NOT NULL,
  modelo VARCHAR(20) NOT NULL,
  descricao_tecnica VARCHAR(400) NOT NULL,
  data_aquisicao DATE NOT NULL,
  fabricante VARCHAR(45) NOT NULL,
  nota_fiscal VARCHAR(20) NOT NULL,
  status_produto VARCHAR(25) NOT NULL DEFAULT 'Disponível',
  quantidade_produto INT NOT NULL,
  cpf_cliente_devolucao VARCHAR(20),
  categoria_id INT NOT NULL,
  troca_id INT,
  devolucao_id INT,
  local_de_armazenamento_id INT NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categoria(id),
  FOREIGN KEY (troca_id) REFERENCES troca(id),
  FOREIGN KEY (local_de_armazenamento_id) REFERENCES local_armazenamento(id),
  FOREIGN KEY (devolucao_id) REFERENCES devolucao(id)
);

CREATE TABLE venda (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  data_hora DATETIME NOT NULL,
  metodo_pagamento VARCHAR(20) NOT NULL,
  status_venda VARCHAR(20) NOT NULL DEFAULT 'realizada',
  cliente_id INT,
  funcionario_id INT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (funcionario_id) REFERENCES funcionario(id)
);

CREATE TABLE itens_venda (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantidade INT NOT NULL,
  produto_id INT NOT NULL,
  venda_id INT NOT NULL,
  FOREIGN KEY (produto_id) REFERENCES produto(id),
  FOREIGN KEY (venda_id) REFERENCES venda(id)
);
INSERT into Cargo (nome) values
('Selecione um item'),
('Vendedor'),
('Gerente');

INSERT into cliente (nome, endereco, cpf, telefone, email, total_compras) values
('', '', '111.111.111-11', '', '', 0),
('Maria Melgaço Santos', 'Gama DF setor leste quadra 11 lote 08', '655.548.215-36', '(61)7878-4545', '(61)96474-9775', 0),
('João Pereira da silva', 'Gama DF setor Oeste quadra 10 lote 07', '554.882.365-21', '(61)7474-7474', '(61)98426-7741', 0);

 INSERT INTO usuario (login, senha, tipo_usuario, ultimo_login) VALUES
 ('vendedor', MD5('123'), 'Vendedor', NOW()),
 ('Gerente', MD5('456'), 'Gerente', NOW());

INSERT into funcionario (nome, endereco, cpf, telefone, email, cargo_id, usuario_id) values
('Vendedor', '', '', '', '', 2, 1),
('Gerente', '', '', '', '', 3, 2);


INSERT into categoria (nome) values
('Selecione um item'),
('Componentes de hardware'),
('Conectividade e redes'),
('Dispositivos computacionais'),
('Periférico'),
('Suprimentos de impressora');

INSERT INTO local_armazenamento
(numero_prateleira, numero_local_prateleira)
VALUES

('1', '1'),
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),
('1', '6'),
('1', '7'),
('1', '8'),
('1', '9'),
('2', '1'),
('2', '2'),
('2', '3'),
('2', '4'),
('2', '5'),
('2', '6'),
('2', '7'),
('2', '8'),
('2', '9'),
('2', '1'),
('2', '2'),
('2', '3'),
('2', '4'),
('2', '5'),
('2', '6'),
('2', '7'),
('2', '8'),
('2', '9'),
('3', '1'),
('3', '2'),
('3', '3'),
('3', '4'),
('3', '5'),
('3', '6'),
('3', '7'),
('3', '8'),
('3', '9'),
('4', '1'),
('4', '2'),
('4', '3'),
('4', '4'),
('4', '5'),
('4', '6'),
('4', '7'),
('4', '8'),
('4', '9');

INSERT into produto (nome_produto, valor_compra, valor_venda, modelo, descricao_tecnica, data_aquisicao, fabricante, nota_fiscal, status_produto, quantidade_produto, cpf_cliente_devolucao, categoria_id, local_de_armazenamento_id) values
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso 
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve,
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 1),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 1),
('Teclado', 60.00, 107.86, 'TSI50','Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 1),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 1),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 1),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 2),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 2),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 2),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 2),
('Teclado', 60.00, 107.86, 'TSI50', 'Com suas teclas espaçadas e silenciosas,
 O TSI 50 garante mais precisão na digitação e concentração. Além de acesso
 rápido a aplicativos e comandos facilitado pelas teclas de atalho. 
 Com autonomia da pilha gerenciada de forma eficiente, o dispositivo 
 entra em standby automaticamente quando não usado. Produto leve, 
 confortável e resistente, feito para durar', '2024-05-01', 'Intelbras', 'NF54948984', 'Disponível', 10, '111.111.111-11', 5, 2),
('Mouse', 30.00, 59.90, 'M170', 'Com Design Ambidestro Compacto,
 Conexão USB e Pilha Inclusa - Preto. O nano USB pode ser encontrado 
 dentro do mouse, próximo à bateria.', '2024-05-02', 'Logitech', 'NF54848948', 'Disponível', 4, '111.111.111-11', 5, 3),
('Mouse', 30.00, 59.90, 'M170', 'Com Design Ambidestro Compacto,
 Conexão USB e Pilha Inclusa - Preto. O nano USB pode ser encontrado 
 dentro do mouse, próximo à bateria.', '2024-05-02', 'Logitech', 'NF54848948', 'Disponível', 4, '111.111.111-11', 5, 3),
('Mouse', 30.00, 59.90, 'M170', 'Com Design Ambidestro Compacto,
 Conexão USB e Pilha Inclusa - Preto. O nano USB pode ser encontrado 
 dentro do mouse, próximo à bateria.', '2024-05-02', 'Logitech', 'NF54848948', 'Disponível', 4, '111.111.111-11', 5, 3),
('Mouse', 30.00, 59.90, 'M170', 'Com Design Ambidestro Compacto,
 Conexão USB e Pilha Inclusa - Preto. O nano USB pode ser encontrado 
 dentro do mouse, próximo à bateria.', '2024-05-02', 'Logitech', 'NF54848948', 'Disponível', 4, '111.111.111-11', 5, 3),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5,
 cor do cabo pode variar conforme nosso 
 estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 4),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5, cor do cabo pode variar conforme nosso estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 4),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5, cor do cabo pode variar conforme nosso estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 4),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5, cor do cabo pode variar conforme nosso estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 4),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5, cor do cabo pode variar conforme nosso estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 4),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5, cor do cabo pode variar conforme nosso estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 5),
('Cabo De Rede', 10.50, 37.90, 'RJ45', 'Cabo De Rede RJ45 Montado 20 Metros Alta Qualidade Cat5, cor do cabo pode variar conforme nosso estoque! Geralmente a cor padrão é azul.', '2024-04-28', 'FrancaVirtual Informática', 'NF45454548', 'Disponível', 7, '111.111.111-11', 3, 5),
('Placa de Video', 1802.90, 2728.80, 'NV RTX4060TI', 'Placa de Video NV RTX4060TI 8GB 1-CLICK OC 128BIT GDDR6 GALAX 46ISL8MD8COC', '2024-04-28', 'GeForce', 'NF34344548', 'Disponível', 5, '111.111.111-11', 2, 6),
('Placa de Video', 1802.90, 2728.80, 'NV RTX4060TI', 'Placa de Video NV RTX4060TI 8GB 1-CLICK OC 128BIT GDDR6 GALAX 46ISL8MD8COC', '2024-04-28', 'GeForce', 'NF34344548', 'Disponível', 5, '111.111.111-11', 2, 6),
('Placa de Video', 1802.90, 2728.80, 'NV RTX4060TI', 'Placa de Video NV RTX4060TI 8GB 1-CLICK OC 128BIT GDDR6 GALAX 46ISL8MD8COC', '2024-04-28', 'GeForce', 'NF34344548', 'Disponível', 5, '111.111.111-11', 2, 6),
('Placa de Video', 1802.90, 2728.80, 'NV RTX4060TI', 'Placa de Video NV RTX4060TI 8GB 1-CLICK OC 128BIT GDDR6 GALAX 46ISL8MD8COC', '2024-04-28', 'GeForce', 'NF34344548', 'Disponível', 5, '111.111.111-11', 2, 6),
('Placa de Video', 1802.90, 2728.80, 'NV RTX4060TI', 'Placa de Video NV RTX4060TI 8GB 1-CLICK OC 128BIT GDDR6 GALAX 46ISL8MD8COC', '2024-04-28', 'GeForce', 'NF34344548', 'Disponível', 5, '111.111.111-11', 2, 6),
('Monitor Gamer', 400.90, 659.80, 'T350', 'Monitor Gamer Samsung 24" FHD,75Hz, HDMI, VGA,Freesync, Preto, Série T350', '2024-04-20', 'Samsung', 'NF3417755', 'Disponível', 4, '111.111.111-11', 4, 7),
('Monitor Gamer', 400.90, 659.80, 'T350', 'Monitor Gamer Samsung 24" FHD,75Hz, HDMI, VGA,Freesync, Preto, Série T350', '2024-04-20', 'Samsung', 'NF3417755', 'Disponível', 4, '111.111.111-11', 4, 7),
('Monitor Gamer', 400.90, 659.80, 'T350', 'Monitor Gamer Samsung 24" FHD,75Hz, HDMI, VGA,Freesync, Preto, Série T350', '2024-04-20', 'Samsung', 'NF3417755', 'Disponível', 4, '111.111.111-11', 4, 7),
('Monitor Gamer', 400.90, 659.80, 'T350', 'Monitor Gamer Samsung 24" FHD,75Hz, HDMI, VGA,Freesync, Preto, Série T350', '2024-04-20', 'Samsung', 'NF3417755', 'Disponível', 4, '111.111.111-11', 4, 7),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 8),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 8),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 8),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 8),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 8),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 9),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 9),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 9),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 9),
('Cartucho de Impressora', 30.90, 67.90, '667 ', 'Cartucho hp 667 preto original 3ym79ab para hp deskjet 2376, 2776, 6476, 5076, 5276 Descubra produtos úteis para você. Uma opção para deixar dias mais bonitas. Produtos com garantia de qualidade', '2024-04-21', 'HP', 'NF3444525', 'Disponível', 10, '111.111.111-11', 6, 9);











