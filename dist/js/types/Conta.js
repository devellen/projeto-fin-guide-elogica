import { Armazenador } from "../components/Armazenador.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    saldo = Armazenador.obter("saldo") || 300;
    total = Armazenador.obter("total") || 0;
    transacoes = Armazenador.obter("transacoes") || [];
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.VENDA) {
            this.realizarVenda(novaTransacao.valor);
        }
        else {
            this.realizarCompra(novaTransacao.valor);
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", this.transacoes);
    }
    realizarCompra(valor) {
        if (valor > this.saldo)
            throw new Error("Saldo insuficiente para realizar a compra");
        this.saldo -= valor;
        this.total -= valor;
        Armazenador.salvar("saldo", this.saldo);
        Armazenador.salvar("total", this.total);
    }
    realizarVenda(valor) {
        this.saldo += valor;
        this.total += valor;
        Armazenador.salvar("saldo", this.saldo);
        Armazenador.salvar("total", this.total);
    }
    getSaldo() {
        return this.saldo;
    }
    getTransacoes() {
        return this.transacoes;
    }
    getTotal() {
        return this.total;
    }
}
const conta = new Conta();
export default conta;
