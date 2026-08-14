const { firstName } = require("./validacoes");

describe("firstName", () => {
  it("deve retornar o primeiro nome quando receber nome e sobrenome", () => {
    expect(firstName("Maria Silva")).toBe("Maria");
  });

  it("deve retornar apenas o primeiro nome quando receber nome completo com mais de duas palavras", () => {
    expect(firstName("Joao Pedro Santos")).toBe("Joao");
  });

  it("deve retornar o proprio nome quando nao houver espacos", () => {
    expect(firstName("Ana")).toBe("Ana");
  });
});
