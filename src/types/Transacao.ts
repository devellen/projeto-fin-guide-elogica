import { TipoTransacao } from "./TipoTransacao.js"

export type Transacao = {
    id: number;
    tipoTransacao: TipoTransacao;
    mercadoria: string;
    quantidade: number;
    valor: number;
}