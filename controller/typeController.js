import Type from '../models/Type.js';
import Device from '../models/Device.js';

class typeController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      res.json(type);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    const type = await Type.find().populate('brands');
    res.json(type);
    try {
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      //Проверка наличия id
      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }
      //проверка типа,если тип используется в устройстве,то мы его не удаляем
      const typeId = await Device.find({ typeId: id });
      //  console.log(typeId.length !== 0);
      if (typeId.length !== 0) {
        return res.json({
          message: `Данный тип  используется в других устройствах,чтобы удалить тип удалите все устройства с этим типом!`,
        });
      } else {
        const deleteType = await Type.findByIdAndDelete(id);
        return res.json(deleteType);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new typeController();
