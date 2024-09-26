import { BadRequestException, Injectable } from '@nestjs/common';
import { IPartidas } from './interfaces/partidas.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CriarPartidaDto } from './dtos/criar-partida.dtos';
import { AtualizarPartidaDto } from './dtos/atualizar-partida.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class PartidasService {

    constructor(@InjectModel("Partidas") private readonly partidaModel: Model<IPartidas>,
        private readonly jogadoresService: JogadoresService) { }

    async criarPartida(criarPartida: CriarPartidaDto): Promise<IPartidas> {
        const partidaCriada = new this.partidaModel(criarPartida);
        const jogadores = partidaCriada.jogadores;

        await Promise.all(
            jogadores.map((jogador) => this.jogadoresService.consultarJogadorPeloId(String(jogador._id)))
        );

        return await partidaCriada.save();
    }

    async atualizarPartida(_id: string, atualizarPartida: AtualizarPartidaDto): Promise<void> {
        const partidaEncontrada = await this.partidaModel.findOne({ _id }).exec();

        if (!partidaEncontrada) {
            throw new BadRequestException(`Partida com id ${_id} não encontrada`);
        }

        await this.partidaModel.findByIdAndUpdate({ _id }, { $set: atualizarPartida }).exec();
    }

    async consultarTodasPartidas(): Promise<IPartidas[]> {
        return await this.partidaModel.find().populate("jogadores").exec();
    }

    async consultarPartidaPeloId(_id: string): Promise<IPartidas> {
        const partidaEncontrada = await this.partidaModel.findOne({ _id }).populate("jogadores").exec();

        if (!partidaEncontrada) {
            throw new BadRequestException(`Partida com id ${_id} não encontrada`);
        }

        return partidaEncontrada;
    }
}
