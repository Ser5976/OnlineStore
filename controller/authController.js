import bcrypt from 'bcryptjs'; //для хэширование пароля
import jwt from 'jsonwebtoken'; //для  генерации токина
import { validationResult } from 'express-validator'; // валидация реквеста
import config from 'config';
import User from '../models/User.js';

// генерация токена
const generateAccessToken = (id, role, email) => {
  const payload = {
    id,
    role,
    email,
  };
  return jwt.sign(payload, config.get('secret'), { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      // валидация реквеста
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ massage: errors });
      }

      const { email, password, role } = req.body;
      // проверка на наличие email
      const candidate = await User.findOne({ email });
      console.log(candidate);
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' });
      }

      // кэширование пароля
      const hashPassword = bcrypt.hashSync(password, 7);

      //создание  пользователя
      const user = await User.create({
        email,
        password: hashPassword,
        role,
      });
      // console.log(user);
      //генерация JWT токина
      const token = generateAccessToken(user._id, user.role, user.email);
      return res.json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка регистрации' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      // проверка на наличие email
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }
      // проверка пароля
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Пароль неверный` });
      }

      //генерация JWT токина
      const token = generateAccessToken(user._id, user.role, user.email);
      return res.json({ token, email, role: user.role });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка авторизации' });
    }
  }
  //добавляем в корзину товар(req.user.id имеется благодаря authMiddleware)
  async addBasket(req, res) {
    try {
      const userCart = await User.findOne({ _id: req.user.id });
      const { basket, _id } = userCart;
      basket.push(req.body);
      console.log(basket);
      const cart = await User.findByIdAndUpdate(
        _id,
        { basket: basket },
        {
          new: true,
        }
      );
      res.json(cart);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // удаление товара из корзины
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }
      const deleteDevice = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { basket: { _id: id } } },
        {
          new: true,
        }
      );
      return res.json(deleteDevice);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  // получение корзины
  async getBasket(req, res) {
    try {
      const userCart = await User.findById(req.user.id, 'basket');
      res.json(userCart);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  // получение пользователей(checkRoleMiddleware('ADMIN'),разрешено только с ролью админ)
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  //проверка пользователя на авторизованность и генерация нового токена
  async checkToken(req, res) {
    try {
      const { user } = req;
      const token = generateAccessToken(user.id, user.role, user.email);
      res.json(token);
    } catch (error) {
      res.status(500).json(e);
    }
  }
}
export default new authController();
