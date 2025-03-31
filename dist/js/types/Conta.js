import { Armazenador } from "../components/Armazenador.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter("transacoes") || [];
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.VENDA) {
            this.realizarVenda(novaTransacao.valor);
        }
        else {
            this.realizarCompra(novaTransacao.valor);
            novaTransacao.valor *= -1; // Compra reduz saldo
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", this.transacoes);
    }
    realizarCompra(valor) {
        if (valor > this.saldo)
            throw new Error("Saldo insuficiente para realizar a compra");
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo);
    }
    realizarVenda(valor) {
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo);
    }
    getSaldo() {
        return this.saldo;
    }
    getTransacoes() {
        return this.transacoes;
    }
}
const conta = new Conta();
export default conta;
