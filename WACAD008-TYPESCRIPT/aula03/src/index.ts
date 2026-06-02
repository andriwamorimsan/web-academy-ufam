import { Carrinho } from "./models/Carrinho";
import { TV } from "./models/TV";
import { Celular } from "./models/Celular";
import { Bicicleta } from "./models/Bicicleta";

const carrinho = new Carrinho();

//// tv
const tv = new TV(
  "Samsung QLED",
  "4K",
  55,
  "Samsung",
  3500
);

carrinho.adicionarProduto(tv);

/// celula
const celular = new Celular(
  "iPhone 15",
  "256GB",
  "Apple",
  6000
);

carrinho.adicionarProduto(celular);

//// bicicleta
const bike = new Bicicleta(
  "Caloi Elite",
  29,
  "Caloi",
  1800
);

carrinho.adicionarProduto(bike);