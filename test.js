const { deepEqual, ok } = require("assert");
const Database = require("./database");

const DEFAULT_ITEM_CADASTRAR = { nome: "flash", poder: "speed", id: 1 };

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "lanterna verde",
  poder: "energia do anel",
  id: 2,
};

describe("Suite de manipulação de heróis", () => {
  before(async () => {
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it("Deve cadastrar um herói usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [atual] = await Database.listar(expected.id);

    deepEqual(atual, expected);
  });

  it("Deve pesquisar um herói usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await Database.listar(expected.id);
    deepEqual(resultado, expected);
  });

  it("Deve remover um herói por id", async () => {
    const expected = true;
    const resultado = await Database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(resultado, expected);
  });

  it("Deve atualizar um heroi por id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "batman",
      poder: "dinheiro",
    };

    const novoDado = {
      nome: "batman",
      poder: "dinheiro",
    };
    await Database.atualizar(expected.id, novoDado);
    const [resultado] = await Database.listar(expected.id);

    deepEqual(resultado, expected);
  });
});
