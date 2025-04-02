import { formatarMoeda } from "../utils/formatadores.js";
import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
// Elemento que vai conter o extrato
const elementoExtrato = document.querySelector("#body-table");
renderizarExtrato();
function renderizarExtrato() {
    if (!elementoExtrato)
        return;
    const transacoes = Conta.getTransacoes();
    elementoExtrato.innerHTML = "";
    const transacoesOrdenadas = [...transacoes].reverse();
    for (const transacao of transacoesOrdenadas) {
        const sinal = transacao.tipoTransacao === TipoTransacao.VENDA ? "+" : "-";
        const linha = document.createElement('tr');
        linha.innerHTML += `
        <th scope="row">${sinal}</th>
          <td>${transacao.mercadoria}</td>
          <td>${transacao.quantidade}</td>
          <td> ${formatarMoeda(transacao.valor)}</td>
          <td class="d-none d-md-block"><i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#modalExcluir"></i></td>
        `;
        elementoExtrato.appendChild(linha);
    }
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
