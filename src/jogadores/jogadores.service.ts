import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel("Jogador") private readonly jogadorModel: Model<IJogador>) {}

    async criarAtualizarJogador(CriarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = CriarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
            await this.atualizar(CriarJogadorDto);
        } else {
            await this.criar(CriarJogadorDto);
        }

    }

    async deletarJogador(email: string): Promise<IJogador> {
        return await this.jogadorModel.findOneAndDelete({email}).exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<IJogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        
        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return jogadorEncontrado;

    }

    async consultarTodosJogadores(): Promise<IJogador[]> {
        return await this.jogadorModel.find().exec();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {

        return await this.jogadorModel.findByIdAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();

    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDto);

        return await jogadorCriado.save();
    }
}
