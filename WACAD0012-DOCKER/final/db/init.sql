CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(160) NOT NULL,
    autor VARCHAR(120) NOT NULL,
    genero VARCHAR(80) NOT NULL,
    ano_publicacao INT NOT NULL
);

INSERT INTO livros (titulo, autor, genero, ano_publicacao) VALUES
('Capitaes da Areia', 'Jorge Amado', 'Romance brasileiro', 1937),
('Dom Casmurro', 'Machado de Assis', 'Classico', 1899),
('A Hora da Estrela', 'Clarice Lispector', 'Ficcao brasileira', 1977),
('Quarto de Despejo', 'Carolina Maria de Jesus', 'Diario', 1960),
('O Quinze', 'Rachel de Queiroz', 'Romance regionalista', 1930),
('Vidas Secas', 'Graciliano Ramos', 'Romance social', 1938),
('Grande Sertao: Veredas', 'Joao Guimaraes Rosa', 'Romance', 1956),
('O Auto da Compadecida', 'Ariano Suassuna', 'Teatro', 1955);
