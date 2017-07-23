import { Negociacoes, Negociacao } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { logarTempoDeExecucao, domInject } from "../helpers/decorators/index";

export class NegociacaoController {
    @domInject("#data")
    private _inputData: JQuery;

    @domInject("#quantidade")
    private _inputQuantidade: JQuery;

    @domInject("#valor")
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacaoView = new NegociacoesView("#negociacoesView");
    private _mensagemView = new MensagemView("#mensagemView");

    constructor() {
        this._negociacaoView.update(this._negociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ","));
        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update("Negociação somente em dias utéis, por favor");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacaoView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso");
    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.domingo && data.getDay() != DiaDaSemana.sabado;
    }
}

enum DiaDaSemana {
    domingo,
    segunda,
    terca,
    quarta,
    quinta,
    sexta,
    sabado
}