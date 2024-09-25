import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { IJogador } from './interfaces/jogador.interface';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ) {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<IJogador[]> {
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ): Promise<IJogador> {
            return await this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ): Promise<void> {
        this.jogadoresService.deletarJogador(_id);
    }
}
