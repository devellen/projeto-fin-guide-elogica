import conta from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatadores.js";
const totalTransacao = document.querySelector("#total");
renderizarTotal();
function renderizarTotal() {
    const transacoes = conta.getTransacoes();
    const total = transacoes.reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
    totalTransacao.textContent = formatarMoeda(total);
}
const TotalTransacaoComponent = {
    atualizar() {
        renderizarTotal();
    }
};
export default TotalTransacaoComponent;
