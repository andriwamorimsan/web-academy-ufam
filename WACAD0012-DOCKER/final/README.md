# Trabalho final - Containers

Aplicacao de listagem de livros com MySQL, backend Node.js com TypeScript, frontend React com TypeScript e phpMyAdmin.

## Como executar

Na pasta `final`, execute:

```bash
docker compose up --build
```

Depois acesse:

- Frontend: http://localhost:8000
- Backend: http://localhost:4444/books
- Health check: http://localhost:4444/health
- phpMyAdmin: http://localhost:8080

Credenciais do banco:

- Servidor: `db`
- Usuario: `root`
- Senha: `senha_livros_docker`
- Banco: `web_academy_livros`

## Volumes configurados

- `livros_mysql_dados`: dados do MySQL em `/var/lib/mysql`
- `livros_api_logs`: logs do backend em `/log`

Para recriar os containers mantendo os volumes:

```bash
docker compose down
docker compose up --build
```

Para apagar tambem os volumes e popular o banco novamente pelo script `db/init.sql`:

```bash
docker compose down -v
docker compose up --build
```
