import mongoose from 'mongoose';

const tiaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['Producto', 'Servicio'],
    required: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: String,
  categoria: String,
  duracion: String, // Ejemplo: "3 días", "5 días"
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  disponible: {
    type: Boolean,
    default: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

const Tia = mongoose.model('Tia', tiaSchema);
export default Tia;
