# Lab 5 - Prisma com TypeScript

Implementacao do lab5 usando Prisma ORM e TypeScript, baseada no modelo do lab4 (`lojaweb`).

## O que foi modelado

- Cliente
- Endereco
- Categoria
- Subcategoria
- Produto
- NumeroSerie
- Compra
- ItemCompra

Os modelos do Prisma usam nomes em camelCase no TypeScript, mas mantem os nomes originais das tabelas e colunas do SQL por meio de `@@map` e `@map`.

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

3. Ajuste a variavel `DATABASE_URL` no `.env` com o usuario e senha do seu MySQL:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/lojaweb"
```

4. Crie as tabelas no banco com Prisma:

```bash
npm run db:push
```

5. Gere o Prisma Client:

```bash
npm run db:generate
```

6. Insira dados de exemplo:

```bash
npm run seed
```

7. Execute as operacoes em TypeScript:

```bash
npm run dev
```

## Scripts

- `npm run db:push`: cria/atualiza as tabelas no banco sem gerar migration.
- `npm run db:migrate`: cria uma migration versionada.
- `npm run db:generate`: gera o Prisma Client.
- `npm run seed`: limpa e insere dados de exemplo.
- `npm run dev`: executa `src/index.ts` com exemplos de create, read e update.
- `npm run build`: compila o TypeScript.
- `npm start`: executa o JavaScript compilado em `dist`.
