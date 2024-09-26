import { IJogador } from "src/jogadores/interfaces/jogador.interface"
import { IResultado } from "../interfaces/partidas.interface"
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator"

export class CriarPartidaDto {

    @IsNotEmpty()
    @IsString()
    readonly def: string

    @IsArray()
    @ArrayMinSize(1)
    readonly resultado: Array<IResultado>

    @IsArray()
    @ArrayMinSize(2)
    readonly jogadores: Array<IJogador>
}