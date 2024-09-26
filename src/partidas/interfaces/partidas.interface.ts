import { IJogador } from "src/jogadores/interfaces/jogador.interface"

export interface IPartidas {
	def: string
	resultado: Array<IResultado>
	jogadores: Array<IJogador>
}

export interface IResultado {
    set: string
}