import { Armazenador } from "../components/Armazenador.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";


export class Conta {
    private saldo: number = Armazenador.obter<number>("saldo") || 0;
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>("transacoes") || [];
    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.VENDA) {
            this.realizarVenda(novaTransacao.valor);
        } else {
            this.realizarCompra(novaTransacao.valor);
            novaTransacao.valor *= -1; // Compra reduz saldo
        }
        
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", this.transacoes);
    }

    realizarCompra(valor: number): void {
        if (valor > this.saldo) throw new Error("Saldo insuficiente para realizar a compra");
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo);
    }

    realizarVenda(valor: number): void {
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo);
    }

    getSaldo(): number {
        return this.saldo;
    }

    getTransacoes(): Transacao[] {
        return this.transacoes;
    }
}


const conta = new Conta();

export default conta;