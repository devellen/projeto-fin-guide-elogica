import { formatarMoeda } from "../utils/formatadores.js";
import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";


// Elemento que vai conter o extrato
const elementoExtrato = document.querySelector("#body-table") as HTMLElement;
renderizarExtrato();
function renderizarExtrato(): void {
    if (!elementoExtrato) return;

    const transacoes = Conta.getTransacoes();

    if (transacoes.length === 0) {
        elementoExtrato.innerHTML = `<div class="nenhuma-transacao">Nenhuma transação registrada</div>`;
        return;
    }

    transacoes
    .reverse()
    .map((transacao) => {
        const sinal = transacao.tipoTransacao === TipoTransacao.VENDA ? "+" : "-";
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <th scope="row">${sinal}</th>
          <td>${transacao.mercadoria}</td>
          <td>${transacao.quantidade}</td>
          <td>R$ ${formatarMoeda(transacao.valor)}</td>
          <td class="d-none d-md-block"><i class="bi bi-trash"></i></td>
        `;

        elementoExtrato.appendChild(linha);
    });

}

// Renderiza o extrato quando o componente é carregado


const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
}

export default ExtratoComponent;