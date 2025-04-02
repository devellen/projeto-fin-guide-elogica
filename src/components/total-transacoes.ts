import conta from "../types/Conta.js";
import { Transacao } from "../types/Transacao.js";
import { formatarMoeda } from "../utils/formatadores.js";

const totalTransacao = document.querySelector("#total") as HTMLElement;

renderizarTotal();

function renderizarTotal(): void {
    const transacoes: Transacao[] = conta.getTransacoes();
    const total = transacoes.reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
    totalTransacao.textContent = formatarMoeda(total);
}

const TotalTransacaoComponent = {
    atualizar() {
        renderizarTotal();
    }
}

export default TotalTransacaoComponent;