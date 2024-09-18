import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: IJogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(CriarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = CriarJogadorDto;

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

        if (jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, CriarJogadorDto);
        } else {
            await this.criar(CriarJogadorDto);
        }

    }

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        this.jogadores = this.jogadores.filter(jogador => jogador.email !== email);
    }

    async consultarJogadoresPeloEmail(email: string): Promise<IJogador[]> {

        const jogadorEncontrado = this.jogadores.filter(jogador => jogador.email === email);
        
        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return jogadorEncontrado;

    }

    async consultarTodosJogadores(): Promise<IJogador[]> {
        return await this.jogadores;
    }

    private atualizar(jogadorEncontrado: IJogador, criarJogadorDto: CriarJogadorDto): void {

        const { nome } = criarJogadorDto;

        jogadorEncontrado.nome = nome;

    }

    private criar(criarJogadorDto: CriarJogadorDto): void {

        const { nome, telefoneCelular, email } = criarJogadorDto;

        const jogador: IJogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg',
        };
        this.logger.log(`CriarAtualizarJogadorDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador);
    }
}
