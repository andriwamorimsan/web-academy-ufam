const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

const PORT = process.env.PORT || 3333;

const diretorio = process.argv[2];

if (!diretorio) {
    console.log('Informe um diretório!');
    console.log('Exemplo: node index.js teste');
    process.exit(1);
}

const server = http.createServer((req, res) => {
    fs.readdir(diretorio, (err, arquivos) => {

        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.end('<h1>Erro ao ler diretório</h1>');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        let html = '<h1>Arquivos do diretório</h1>';
        html += '<ul>';

        arquivos.forEach((arquivo) => {
            html += `<li>${arquivo}</li>`;
        });

        html += '</ul>';

        res.end(html);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});