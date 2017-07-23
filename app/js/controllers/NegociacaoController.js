System.register(["../models/index", "../views/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, NegociacaoController, DiaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacaoView = new index_2.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_2.MensagemView("#mensagemView");
                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");
                    this._negociacaoView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ","));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update("Negociação somente em dias utéis, por favor");
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacaoView.update(this._negociacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso");
                }
                _ehDiaUtil(data) {
                    return data.getDay() != DiaDaSemana.domingo && data.getDay() != DiaDaSemana.sabado;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["domingo"] = 0] = "domingo";
                DiaDaSemana[DiaDaSemana["segunda"] = 1] = "segunda";
                DiaDaSemana[DiaDaSemana["terca"] = 2] = "terca";
                DiaDaSemana[DiaDaSemana["quarta"] = 3] = "quarta";
                DiaDaSemana[DiaDaSemana["quinta"] = 4] = "quinta";
                DiaDaSemana[DiaDaSemana["sexta"] = 5] = "sexta";
                DiaDaSemana[DiaDaSemana["sabado"] = 6] = "sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
