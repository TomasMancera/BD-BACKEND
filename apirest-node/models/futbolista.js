const { Schema, model } = require('mongoose');
 
const FutbolistaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
    },
    edad: {
        type: Number,
        required: [true, 'El edad es obligatorio'],
    },
    internacional: {
        type: Boolean,
        default: true,
        required: true
    },
  
    id_equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: false
    },
    
},
    {collection:'Futbolistas'}
);

FutbolistaSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    console.log("data", data)
    return data;
}



module.exports = model('Futbolista', FutbolistaSchema);