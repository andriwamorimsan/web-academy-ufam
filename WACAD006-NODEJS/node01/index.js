const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');
const { createLink } = require('./util');

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

const PORT = process.env.PORT || 3333;

const diretorio = process.argv[2];

if (!diretorio) {
    console.log('Informe um diretório!');
    console.log('Exemplo: npm start');
    process.exit(1);
}

const server = http.createServer((req, res) => {

    fs.readdir(diretorio, (err, arquivos) => {

        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.end('Erro ao ler diretório');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        let html = '';

        arquivos.forEach((arquivo) => {
            html += createLink(arquivo);
        });

        res.end(html);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});