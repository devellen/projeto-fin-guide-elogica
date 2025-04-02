import { formatarMoeda } from "../utils/formatadores.js";
import Conta from "../types/Conta.js";
//quem controla a parte de exibição do saldo
const totalTransacao = document.querySelector("#total");
renderizarTotal();
function renderizarTotal() {
    if (totalTransacao != null) {
        totalTransacao.textContent = formatarMoeda(Conta.getTotal());
    }
}
const TotalTransacaoComponent = {
    atualizar() {
        renderizarTotal();
    }
};
export default TotalTransacaoComponent;
