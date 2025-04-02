import conta from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatadores.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
import TotalTransacaoComponent from "./total-transacoes.js";
const elementoFormulario = document.querySelector('form');
const botaoConfirmar = document.getElementById('buttonTransacao');
elementoFormulario.addEventListener("click", function (event) {
    try {
        event.preventDefault();
        const inputMercadoria = elementoFormulario.querySelector('#mercadoria');
        const inputQuantidade = elementoFormulario.querySelector('#quantidade');
        const inputValor = elementoFormulario.querySelector('#valor');
        let mercadoria = inputMercadoria.value;
        let quantidade = parseInt(inputQuantidade.value, 10) || 0;
        let valor = parseFloat(inputValor.value);
        //preencher modal
        const paragrafoMercadoria = document.getElementById('item');
        const paragrafoQtd = document.getElementById('qtd');
        const paragrafoValor = document.getElementById('valorP');
        paragrafoMercadoria.textContent = mercadoria;
        paragrafoQtd.textContent = quantidade.toString();
        paragrafoValor.textContent = formatarMoeda(valor);
    }
    catch (erro) {
        alert(erro.message);
    }
});
botaoConfirmar.addEventListener("click", function () {
    try {
        // Obter os valores do modal
        const mercadoria = document.getElementById('item')?.textContent || "";
        const quantidade = parseInt(document.getElementById('qtd')?.textContent || "0", 10);
        const valor = parseFloat(document.getElementById('valorP')?.textContent?.replace("R$", "").replace(",", ".") || "0");
        const tipoTransacaoElement = elementoFormulario.querySelector('#tipoTransacao');
        const tipoTransacao = tipoTransacaoElement.value;
        if (!mercadoria || quantidade <= 0 || isNaN(valor) || valor <= 0) {
            alert("Erro ao confirmar: dados inválidos.");
            return;
        }
        // Criar nova transação
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        };
        // Registrar na conta
        conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        TotalTransacaoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
        // Limpar os valores do modal
        document.getElementById('item').textContent = "";
        document.getElementById('qtd').textContent = "";
        document.getElementById('valorP').textContent = "";
        document.getElementById("button-close").click();
    }
    catch (erro) {
        alert("Erro ao salvar transação: " + erro.message);
    }
});
const limparForm = document.getElementById('clear');
limparForm.addEventListener("click", function () {
    elementoFormulario.reset();
});
