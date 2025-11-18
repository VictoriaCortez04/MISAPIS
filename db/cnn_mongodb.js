import mongoose from 'mongoose';

let isConnected = false;

const conectarAMongoDB = async () => {
  if (isConnected) {
    console.log('Ya está conectado a MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};

const db = mongoose.connection;

db.on('error', (error) => {
  isConnected = false;
  console.log('Error en la conexión MongoDB', error);
});

db.once('open', () => {
  isConnected = true;
  console.log('Conexión a MongoDB abierta');
});

db.on('disconnected', () => {
  isConnected = false;
  console.log('Desconectado de MongoDB');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB desconectado');
  process.exit(0);
});

export { conectarAMongoDB, isConnected };
