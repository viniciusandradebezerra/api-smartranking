import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { PartidasModule } from './partidas/partidas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin123@cluster0.rlc0c.mongodb.net/smartranking?retryWrites=true&w=majority&appName=Cluster0'),
    JogadoresModule,
    CategoriasModule,
    PartidasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
