import Type from '../models/Type.js';

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

      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }

      const deleteType = await Type.findByIdAndDelete(id);
      return res.json(deleteType);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new typeController();
