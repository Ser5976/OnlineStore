import Brand from '../models/Brand.js';
import Device from '../models/Device.js';
import Type from '../models/Type.js';

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
      const brandDevice = await Device.find({ brandId: id });
      const brandType = await Type.find({
        brands: { $elemMatch: { $in: [id] } },
      });
      console.log(brandDevice.length !== 0);
      console.log(brandType.length !== 0);
      if (brandDevice.length !== 0) {
        res.json({
          message:
            'Данный брэнд  используется в других устройствах,чтобы удалить брэнд удалите все устройства с этим брэндом!',
        });
      } else if (brandType.length !== 0) {
        const deleteBrandType = await Type.updateMany(
          {},
          { $pull: { brands: id } }
        );
        //  console.log(deleteBrandType);
        const deleteBrand = await Brand.findByIdAndDelete(id);
        return res.json(deleteBrand);
      } else {
        const deleteBrand = await Brand.findByIdAndDelete(id);
        return res.json(deleteBrand);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new brandController();
