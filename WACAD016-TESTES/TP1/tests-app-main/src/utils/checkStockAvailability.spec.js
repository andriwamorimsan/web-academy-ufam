const { checkStockAvailability } = require("./validacoes");

describe("checkStockAvailability", () => {
  it("deve retornar true quando houver estoque suficiente para o produto", () => {
    expect(checkStockAvailability("laptop", 5)).toBe(true);
  });

  it("deve retornar false quando o produto existir, mas a quantidade solicitada for maior que o estoque", () => {
    expect(checkStockAvailability("headphone", 6)).toBe(false);
  });

  it("deve retornar false quando o produto estiver sem estoque", () => {
    expect(checkStockAvailability("book", 1)).toBe(false);
  });

  it("deve retornar false quando o tipo de produto nao existir no estoque", () => {
    expect(checkStockAvailability("monitor", 1)).toBe(false);
  });
});
