import { NegociacaoController } from "./controllers/NegociacaoController";

const controller = new NegociacaoController();
$(".form").submit(controller.adiciona.bind(controller));
$("#botaoImportar").click(controller.importa.bind(controller));