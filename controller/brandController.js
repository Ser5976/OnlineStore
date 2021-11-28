import Brand from '../models/Brand.js';

class brandController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      res.json(brand);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    const brand = await Brand.find();
    res.json(brand);
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
      const deleteBrand = await Brand.findByIdAndDelete(id);
      return res.json(deleteBrand);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new brandController();
