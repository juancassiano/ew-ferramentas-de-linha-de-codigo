const commander = require("commander");
const Database = require("./database");
const Heroi = require("./heroi");

async function main() {
  commander
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "Id do Heroi")

    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-l, --listar", "Listar um Heroi")
    .option("-l, --remover", "Remove um Heroi pelo id")
    .option("-a, --atualizar [value]", "Remove um Heroi pelo id")
    .parse(process.argv);

  const heroi = new Heroi(commander);

  try {
    if (commander.cadastrar) {
      delete heroi.id;
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error("Heroi não foi cadastrado");
        return;
      }
      console.log("Heroi cadastrado com sucesso");
    }
    if (commander.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
      return;
    }
    if (commander.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error("Nao foi possivel remover o heroi");
        return;
      }
      console.log("Heroi removido com sucesso");
    }
    if (commander.atualizar) {
      const idParaAtualizar = parseInt(commander.atualizar);
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );
      if (!resultado) {
        console.error("Nao foi possivel atualizar o heroi");
        return;
      }
      console.log("Heroi atualizado com sucesso");
    }
  } catch (error) {
    console.log("Deu Ruim", error);
  }
}

main();
