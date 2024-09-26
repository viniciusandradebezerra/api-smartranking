import { Module } from '@nestjs/common';
import { PartidasController } from './partidas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidasSchema } from './interfaces/partidas.schema';
import { PartidasService } from './partidas.service';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Partidas', schema: PartidasSchema }]), JogadoresModule],
  providers: [PartidasService],
  controllers: [PartidasController]
})
export class PartidasModule {}
