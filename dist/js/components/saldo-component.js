import { formatarMoeda } from "../utils/formatadores.js";
import Conta from "../types/Conta.js";
//quem controla a parte de exibição do saldo
const elementoSaldo = document.querySelector(".saldo-valor  ");
renderizarSaldo();
function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
