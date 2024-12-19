const { model, Schema } = require('mongoose');

const contratacionSchema = new Schema({
    id_equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',  
        required: true,
    },
    id_futbolista: {
        type: Schema.Types.ObjectId,
        ref: 'Futbolista',   // Hace referencia al modelo futbolista
        required: true,
    },
    fechaContratacion: {
        type: Date,
        default: Date.now,  // Fecha por defecto al momento de la creación
        required: true,
    },
    fechaFinalizacion: {
        type: Date,
        required: false,  // Puede ser opcional si es un contrato en curso
    },
}, {
    collection: 'contrataciones', // Nombre de la colección en MongoDB
});

const Contratacion = model('Contratacion', contratacionSchema);

module.exports = Contratacion;