import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 4444;
const logDir = process.env.LOG_DIR || path.join(process.cwd(), 'log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senha_livros_docker',
  database: process.env.DB_NAME || 'web_academy_livros',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'catalogo-livros-api' });
});

app.get('/books', async (_req, res) => {
  const logMessage = `[${new Date().toISOString()}] Consulta realizada em /books\n`;
  fs.appendFileSync(path.join(logDir, 'acesso.log'), logMessage);

  try {
    const [rows] = await pool.query(
      'SELECT id, titulo, autor, genero, ano_publicacao AS anoPublicacao FROM livros ORDER BY titulo'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nao foi possivel consultar a lista de livros.' });
  }
});

app.listen(port, () => {
  console.log(`API de livros ativa na porta ${port}`);
});
