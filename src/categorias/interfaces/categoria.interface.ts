import { IJogador } from 'src/jogadores/interfaces/jogador.interface';

export { Document } from 'mongoose';
export interface ICategoria extends Document {
    descricao: string;
    eventos: Array<IEvento>;
    jogadores: Array<IJogador>;
}

export interface IEvento {
    nome: string;
    operacao: string;
    valor: number;
}