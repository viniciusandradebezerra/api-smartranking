import { IResultado } from "../interfaces/partidas.interface"
import { ArrayMinSize, IsArray } from "class-validator"

export class AtualizarPartidaDto {
    @IsArray()
    @ArrayMinSize(1)
    readonly resultado: Array<IResultado>
}