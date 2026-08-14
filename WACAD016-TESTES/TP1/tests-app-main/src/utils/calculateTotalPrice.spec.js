const { calculateTotalPrice } = require("./validacoes");

describe("calculateTotalPrice", () => {
  it("deve calcular o preco total somando preco vezes quantidade de cada produto", () => {
    const products = [
      { name: "Product 1", price: 10, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
      { name: "Product 3", price: 20, quantity: 1 },
    ];

    expect(calculateTotalPrice(products)).toBe(70);
  });

  it("deve retornar 0 quando a lista de produtos estiver vazia", () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it("deve considerar a quantidade de um unico produto", () => {
    const products = [{ name: "Product 1", price: 25, quantity: 3 }];

    expect(calculateTotalPrice(products)).toBe(75);
  });
});
