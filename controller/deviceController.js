import Device from '../models/Device.js';
import FileServise from '../FileServise.js'; //даём имя файлу,записываем его в папку статик
import Type from '../models/Type.js';

class deviceController {
  async create(req, res) {
    try {
      const { name, price, typeId, brandId, info } = req.body;
      // console.log(req.files.picture);
      const fileName = FileServise.saveFile(req.files.picture);
      const specifications = JSON.parse(info); //парсим,т.к. массив info из formData приходит в виде строки

      const device = await Device.create({
        name,
        price,
        picture: fileName,
        typeId,
        brandId,
        info: specifications,
      });
      //--------------------------------------------------------
      //добавление брэнда в тип
      // получаем массив брендов
      const type = await Type.findOne({ _id: typeId });
      // console.log(type);
      const { brands } = type;
      // делаем проверку на наличие бренда в массиве
      const brand = await Type.findOne(
        { _id: typeId },
        { brands: { $elemMatch: { $in: [brandId] } } }
      );
      // console.log(brand);
      if (brand.brands.length === 0) {
        //добавляем бренд в массив
        brands.push(brandId);
        // перезаписываем массив в типе
        const addBrands = await Type.findByIdAndUpdate(
          typeId,
          { brands: brands },
          {
            new: true,
          }
        );
        // console.log(addBrands);
      }
      //-------------------------------------------------------------
      res.json(device);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      let { typeId, brandId, limit, page } = req.query;
      //console.log(req.query);
      //пагинация
      limit = parseInt(limit, 10) || 5;
      page = parseInt(page, 10) || 1;
      let offset = page * limit - limit;

      let device;
      let count; // число устройств
      let pageQty; // количества страниц
      // условия для типа и брэнда
      if (!typeId && !brandId) {
        device = await Device.find().skip(offset).limit(limit);
        count = await Device.find().count();
        pageQty = Math.ceil(count / limit);
      }
      if (typeId && !brandId) {
        device = await Device.find({ typeId }).skip(offset).limit(limit);
        count = await Device.find({ typeId }).count();
        pageQty = Math.ceil(count / limit);
      }
      if (!typeId && brandId) {
        device = await Device.find({ brandId }).skip(offset).limit(limit);
        count = await Device.find({ brandId }).count();
        pageQty = Math.ceil(count / limit);
      }
      if (typeId && brandId) {
        device = await Device.find({ typeId, brandId })
          .skip(offset)
          .limit(limit);
        count = await Device.find({ typeId, brandId }).count();
        pageQty = Math.ceil(count / limit);
      }

      return res.json({ device, count: count, pageQty: pageQty });
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }

      const device = await Device.findById(id);

      return res.json(device);
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
      //удаление файла с жесткого диска(папка static)
      const filePath = await Device.find({ _id: id });
      // console.log(filePath[0].picture);
      if (filePath[0].picture) {
        FileServise.deleteFile(filePath[0].picture);
      }
      //удаление устройства из базы
      const deleteDevice = await Device.findByIdAndDelete(id);
      //удаление инфо

      return res.json(deleteDevice);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new deviceController();
