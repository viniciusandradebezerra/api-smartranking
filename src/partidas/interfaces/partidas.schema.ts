

import * as mongoose from "mongoose";

export const PartidasSchema = new mongoose.Schema({
    def: { type: String },
    resultado: [{ set: String }],
    jogadores: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' }
    ]
}, { timestamps: true, collection: 'partidas'
})