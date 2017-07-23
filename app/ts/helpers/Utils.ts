import { Negociacao } from "../models/index";
import { Imprimivel } from "../models/Imprimivel";

export function imprime(...objetos: Imprimivel[]) {
    objetos.forEach(objeto => objeto.paraTexto());
}