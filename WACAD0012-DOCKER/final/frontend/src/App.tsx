import { useEffect, useMemo, useState } from 'react';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  anoPublicacao: number;
}

const apiUrl = 'http://localhost:4444/books';

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch(apiUrl)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Falha ao consultar a API');
        }

        return resposta.json();
      })
      .then((dados: Livro[]) => setLivros(dados))
      .catch(() => setErro('Nao foi possivel carregar o catalogo de livros.'))
      .finally(() => setCarregando(false));
  }, []);

  const autoresUnicos = useMemo(
    () => new Set(livros.map((livro) => livro.autor)).size,
    [livros]
  );

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <span style={styles.kicker}>Web Academy Books</span>
          <h1 style={styles.title}>Catalogo de Livros</h1>
          <p style={styles.subtitle}>
            Aplicacao React consumindo uma API Node.js com dados persistidos em MySQL e gerenciados via Docker Compose.
          </p>
        </div>

        <div style={styles.summary}>
          <strong style={styles.summaryNumber}>{livros.length}</strong>
          <span>livros cadastrados</span>
          <strong style={styles.summaryNumber}>{autoresUnicos}</strong>
          <span>autores diferentes</span>
        </div>
      </section>

      <section style={styles.content}>
        <div style={styles.toolbar}>
          <h2 style={styles.sectionTitle}>Acervo disponivel</h2>
          <span style={styles.badge}>Backend: 4444</span>
        </div>

        {carregando && <p style={styles.message}>Carregando dados...</p>}
        {erro && <p style={styles.error}>{erro}</p>}

        {!carregando && !erro && (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Titulo</th>
                  <th style={styles.th}>Autor</th>
                  <th style={styles.th}>Genero</th>
                  <th style={styles.th}>Ano</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => (
                  <tr key={livro.id} style={styles.row}>
                    <td style={styles.titleCell}>{livro.titulo}</td>
                    <td style={styles.td}>{livro.autor}</td>
                    <td style={styles.td}>
                      <span style={styles.genre}>{livro.genero}</span>
                    </td>
                    <td style={styles.td}>{livro.anoPublicacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f7f5ef',
    color: '#1f2933',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    padding: '32px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
    alignItems: 'stretch',
    maxWidth: '1120px',
    margin: '0 auto 28px',
  },
  kicker: {
    color: '#0f766e',
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '42px',
    margin: '10px 0',
    letterSpacing: 0,
  },
  subtitle: {
    maxWidth: '680px',
    color: '#52606d',
    fontSize: '17px',
    lineHeight: 1.5,
    margin: 0,
  },
  summary: {
    minWidth: '220px',
    background: '#153e4d',
    color: '#f8fafc',
    borderRadius: '8px',
    padding: '22px',
    display: 'grid',
    gap: '4px',
    alignContent: 'center',
  },
  summaryNumber: {
    fontSize: '30px',
    lineHeight: 1,
  },
  content: {
    maxWidth: '1120px',
    margin: '0 auto',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '18px',
  },
  sectionTitle: {
    fontSize: '20px',
    margin: 0,
  },
  badge: {
    border: '1px solid #99f6e4',
    color: '#115e59',
    background: '#ccfbf1',
    borderRadius: '999px',
    padding: '7px 12px',
    fontWeight: 700,
    fontSize: '13px',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    background: '#eef2f7',
    color: '#334155',
    fontSize: '13px',
    padding: '14px',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  row: {
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '16px 14px',
    color: '#52606d',
  },
  titleCell: {
    padding: '16px 14px',
    fontWeight: 800,
    color: '#1f2933',
  },
  genre: {
    background: '#ffedd5',
    color: '#7c2d12',
    borderRadius: '999px',
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  message: {
    color: '#52606d',
  },
  error: {
    color: '#b91c1c',
    background: '#fee2e2',
    borderRadius: '8px',
    padding: '12px 14px',
  },
};

export default App;
