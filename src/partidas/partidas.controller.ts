import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarPartidaDto } from './dtos/criar-partida.dtos';
import { AtualizarPartidaDto } from './dtos/atualizar-partida.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { PartidasService } from './partidas.service';

@Controller('api/v1/partidas')
export class PartidasController {

    constructor(private readonly partidasService: PartidasService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarPartida(
        @Body() criarPartidaDto: CriarPartidaDto){
        return await this.partidasService.criarPartida(criarPartidaDto);
        }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarPartida(
        @Body() atualizarPartidaDto: AtualizarPartidaDto,
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ) {
        return await this.partidasService.atualizarPartida(_id, atualizarPartidaDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    async consultarTodasPartidas() {
        return await this.partidasService.consultarTodasPartidas();
    }

    @Get('/:_id')
    @UsePipes(ValidationPipe)
    async consultarPartidaPeloId(
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ) {
        return await this.partidasService.consultarPartidaPeloId(_id);
    }

}
