System.register(["../models/index", "../views/index", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, NegociacaoController, DiaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacaoView = new index_2.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_2.MensagemView("#mensagemView");
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
            __decorate([
                index_3.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
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
