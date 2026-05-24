import http from 'http';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { createLink } from './util.js';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

const PORT = process.env.PORT || 3333;
const diretorio = process.argv[2];

if (!diretorio) {
    console.log('Informe um diretório!');
    process.exit(1);
}

const server = http.createServer(async (req, res) => {
    try {

        // página inicial -> lista arquivos
        if (req.url === '/') {
            const arquivos = await fs.readdir(diretorio);

            let html = '';

            arquivos.forEach((arquivo) => {
                html += createLink(arquivo);
            });

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.end(html);
            return;
        }

        // pega o nome do arquivo da URL
        const nomeArquivo = req.url.substring(1);

        const conteudo = await fs.readFile(
            `${diretorio}/${nomeArquivo}`,
            'utf-8'
        );

        const html = `
      <a href="/">Voltar</a><br><br>
      ${conteudo}
    `;

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(html);

    } catch (error) {

        res.writeHead(500, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(`
      <h1>Erro ao abrir arquivo</h1>
      <a href="/">Voltar</a>
    `);
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});