CREATE DATABASE lojaweb;
USE lojaweb;
drop database lojaweb;
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    celular VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    data_nascimento DATE
);
CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(60) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    estado CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL,
    complemento VARCHAR(100),
    id_cliente INT NOT NULL,
    CONSTRAINT fk_endereco_cliente
	FOREIGN KEY (id_cliente)
	REFERENCES cliente(id_cliente)
);
CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(60) NOT NULL UNIQUE
);
CREATE TABLE subcategoria (
    id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_subcategoria VARCHAR(60) NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT fk_subcategoria_categoria
	FOREIGN KEY (id_categoria)
	REFERENCES categoria(id_categoria)
);
CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(120) NOT NULL,
    fabricante VARCHAR(80) NOT NULL,
    preco_base DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INT NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT fk_produto_categoria
	FOREIGN KEY (id_categoria)
	REFERENCES categoria(id_categoria)
);
CREATE TABLE numero_serie (
    id_numero_serie INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(100) NOT NULL UNIQUE,
    id_produto INT NOT NULL,
    CONSTRAINT fk_numero_serie_produto
	FOREIGN KEY (id_produto)
	REFERENCES produto(id_produto)
);
CREATE TABLE compra (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    desconto DECIMAL(10,2) DEFAULT 0,
    forma_pagamento VARCHAR(40) NOT NULL,
    total_compra DECIMAL(10,2) NOT NULL,
    id_cliente INT NOT NULL,
    id_endereco INT NOT NULL,
    CONSTRAINT fk_compra_cliente
	FOREIGN KEY (id_cliente)
	REFERENCES cliente(id_cliente),
    CONSTRAINT fk_compra_endereco
	FOREIGN KEY (id_endereco)
	REFERENCES endereco(id_endereco)
);
CREATE TABLE item_compra (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    id_compra INT NOT NULL,
    id_produto INT NOT NULL,
    CONSTRAINT fk_item_compra
	FOREIGN KEY (id_compra)
	REFERENCES compra(id_compra),
    CONSTRAINT fk_item_produto
	FOREIGN KEY (id_produto)
	REFERENCES produto(id_produto)
);