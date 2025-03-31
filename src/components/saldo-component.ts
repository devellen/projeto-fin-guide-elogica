import { formatarMoeda } from "../utils/formatadores.js";
import  Conta  from "../types/Conta.js";


//quem controla a parte de exibição do saldo
const elementoSaldo = document.querySelector(".saldo-valor  ") as HTMLElement;

renderizarSaldo();
function renderizarSaldo(): void {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}

const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
}

export default SaldoComponent;