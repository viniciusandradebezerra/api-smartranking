import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICategoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<ICategoria>,
        private readonly jogadoresService: JogadoresService) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<ICategoria> {
        
        const { categoria } = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);

        return await categoriaCriada.save();
    }

    async consultarTodasCategorias(): Promise<Array<ICategoria>> {
        return await this.categoriaModel.find().populate("jogadores").exec();
    }

    async consultarCategoriaPeloId(categoria: string): Promise<ICategoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} não encontrada!`);
        }

        return categoriaEncontrada;
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} não encontrada!`);
        }

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec();
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria'];
        const idJogador = params['idJogador'];

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        await this.jogadoresService.consultarJogadorPeloId(idJogador);
        
        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} não encontrada!`);
        }

        

        const jogadorJaCadastradoCategoria = await this.categoriaModel
            .find({ categoria })
            .where('jogadores')
            .in(idJogador)
            .exec();

        if (jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`Jogador com id ${idJogador} já cadastrado na categoria ${categoria}`);
        }

        categoriaEncontrada.jogadores.push(idJogador);

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
    }
}
