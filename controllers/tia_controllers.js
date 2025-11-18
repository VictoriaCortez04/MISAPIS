import Tia from '../models/tia_model.js';
import mongoose from 'mongoose';

export const getAllTias = async (req, res) => {
  try {
    const tias = await Tia.find({}, { __v: 0 });
    if (tias.length === 0) {
      console.log('No hay registros de TIA');
      return res.status(404).json({ msg: 'No hay registros de TIA' });
    }
    console.log(`Se obtuvieron ${tias.length} registros de TIA`);
    res.status(200).json(tias);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ msg: 'Error al obtener los datos', error });
  }
};

export const getTiaById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('ID inválido recibido');
    return res.status(400).json({ msg: 'ID inválido' });
  }
  try {
    const tia = await Tia.findById(id);
    if (!tia) {
      console.log(`No se encontró el registro con ID: ${id}`);
      return res.status(404).json({ msg: 'No encontrado' });
    }
    console.log(`Se obtuvo el registro con ID: ${id}`);
    res.status(200).json(tia);
  } catch (error) {
    console.error('Error al buscar el registro:', error);
    res.status(500).json({ msg: 'Error al buscar el registro', error });
  }
};

export const postTia = async (req, res) => {
  try {
    const nuevo = new Tia(req.body);
    await nuevo.save();
    console.log('Nuevo registro de TIA creado correctamente');
    res.status(201).json({ msg: 'Registro creado correctamente', nuevo });
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ msg: 'Error al crear el registro', error });
  }
};

export const putTia = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('ID inválido recibido');
    return res.status(400).json({ msg: 'ID inválido' });
  }
  try {
    const actualizado = await Tia.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) {
      console.log(`No se encontró el registro con ID: ${id}`);
      return res.status(404).json({ msg: 'No encontrado' });
    }
    console.log(`Registro con ID ${id} actualizado correctamente`);
    res.status(200).json({ msg: 'Actualizado correctamente', actualizado });
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({ msg: 'Error al actualizar', error });
  }
};

export const deleteTia = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('ID inválido recibido');
    return res.status(400).json({ msg: 'ID inválido' });
  }
  try {
    const eliminado = await Tia.findByIdAndDelete(id);
    if (!eliminado) {
      console.log(`No se encontró el registro con ID: ${id}`);
      return res.status(404).json({ msg: 'No encontrado' });
    }
    console.log(`Registro con ID ${id} eliminado correctamente`);
    res.status(200).json({ msg: 'Eliminado correctamente', eliminado });
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ msg: 'Error al eliminar', error });
  }
};
