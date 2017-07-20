class Negociacao {
    _data;
    _valor;
    _quantidade;

    constructor(data, quantidade, valor) {
        this._data = data;
        this._valor = valor;
        this._quantidade = quantidade;
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }
    
    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }
}