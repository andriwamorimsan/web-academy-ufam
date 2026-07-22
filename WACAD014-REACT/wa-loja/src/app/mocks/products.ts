import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    nome: 'Notebook Pro',
    preco: 5499,
    fotos: ['/placeholder.png'],
    descricao: 'Notebook para estudos, trabalho e projetos web.',
  },
  {
    id: 2,
    nome: 'Smartphone Premium',
    preco: 4399,
    fotos: ['/placeholder.png'],
    descricao: 'Smartphone com alto desempenho para o dia a dia.',
  },
  {
    id: 3,
    nome: 'Smartwatch Sport',
    preco: 1899,
    fotos: ['/placeholder.png'],
    descricao: 'Relogio inteligente para acompanhar sua rotina.',
  },
  {
    id: 4,
    nome: 'Fone Bluetooth ANC',
    preco: 999,
    fotos: ['/placeholder.png'],
    descricao: 'Fone sem fio com cancelamento ativo de ruido.',
  },
]
