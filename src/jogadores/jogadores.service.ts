import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel("Jogador") private readonly jogadorModel: Model<IJogador>) {}

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {

        const { email } = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`);
        } 
            
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);

        return await jogadorCriado.save();
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        await this.jogadorModel.findByIdAndUpdate({_id}, {$set: atualizarJogadorDto}).exec();
    }

    async deletarJogador(_id: string): Promise<IJogador> {
        return await this.jogadorModel.findOneAndDelete({_id}).exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<IJogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        
        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return jogadorEncontrado;

    }

    async consultarTodosJogadores(): Promise<IJogador[]> {
        return await this.jogadorModel.find().exec();
    }
}
