import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { logarTempoDeExecucao, domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService } from "../services/index";
import { imprime } from "../helpers/Utils";

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
    private _service = new NegociacaoService();

    constructor() {
        this._negociacaoView.update(this._negociacoes);
    }

    @throttle()
    adiciona(event: Event): void {
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

        imprime(negociacao, this._negociacoes);

        this._negociacaoView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso");
    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.domingo 
            && data.getDay() != DiaDaSemana.sabado;
    }

    @throttle()
    async importa() {
        try {
            const negociacoesParaImportar = await this._service.obterNegociacoes(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            });

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar.filter(negociacao =>
                !negociacoesJaImportadas.some(jaImportada =>
                    negociacao.ehIgual(jaImportada)))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._negociacaoView.update(this._negociacoes);
            this._mensagemView.update("Negociação importadas com sucesso");
        } catch (err) {
            this._mensagemView.update(err.message);
        }
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