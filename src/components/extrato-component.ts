import { formatarMoeda } from "../utils/formatadores.js";
import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { Armazenador } from "./Armazenador.js";
import SaldoComponent from "./saldo-component.js";
import TotalTransacaoComponent from "./total-transacoes.js";


// Elemento que vai conter o extrato
const elementoExtrato = document.querySelector("#body-table") as HTMLElement;

renderizarExtrato();

function excluirTransacao(transacao: Transacao): void {
    const transacoes = Armazenador.obter<Transacao[]>("transacoes") || [];
    const novasTransacoes = transacoes.filter(i => i.id !== transacao.id);
    let saldo: number = parseFloat(Armazenador.obter("saldo") || "0");
    let total: number = parseFloat(Armazenador.obter("total") || "0");

    if (transacao.tipoTransacao == TipoTransacao.COMPRA) {
        saldo += transacao.valor;
        total += transacao.valor;
    }
    else {
        saldo -= transacao.valor;
        total -= transacao.valor;
    }

    Armazenador.deletar("transacoes");
    Armazenador.deletar("saldo");
    Armazenador.deletar("total");

    Armazenador.salvar("transacoes", novasTransacoes);
    Armazenador.salvar("saldo", saldo);
    Armazenador.salvar("total", total);

    renderizarExtrato();
    TotalTransacaoComponent.atualizar();
    SaldoComponent.atualizar();


}

function btnExluir(transacao: Transacao): boolean {
    const botaoEx = document.getElementById("excluir");
    const mercadoriaP = document.getElementById("itemEx");
    const quantidadeP = document.getElementById("qtdEx");
    const valorP = document.getElementById("valorEx");

    mercadoriaP.textContent = `Produto : ${transacao.mercadoria}`;
    quantidadeP.textContent = `Quantidade : ${transacao.quantidade}`;
    valorP.textContent = `valor : ${formatarMoeda(transacao.valor)}`;

    if (botaoEx) {
        botaoEx.addEventListener("click", () => {
            excluirTransacao(transacao);
            return true;
        });
    }
    return false;
}

function renderizarExtrato(): void {
    if (!elementoExtrato) return;

    const transacoes = Armazenador.obter<Transacao[]>("transacoes") || [];
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
          <td class="d-none d-md-block"><i class="bi bi-trash lixeira" data-bs-toggle="modal" data-bs-target="#modalDeletar"></i></td>
        `;

        const botaoEx = linha.querySelector(".lixeira");

        if (botaoEx) {
            botaoEx.addEventListener("click", (event) => {
                if (btnExluir(transacao)) {
                    const icone = event.target as HTMLElement;
                    const linha = icone.closest("tr");
                    if (linha) {
                        linha.remove();
                    }
                }
            })
        }

        elementoExtrato.appendChild(linha);

    }

}

const ExtratoComponent = {
    atualizar(): void {
        renderizarExtrato();
    }
}

export default ExtratoComponent;