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
//=============регистрация====================================
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
  //===========логин==========================================
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

  //===== добавляем в корзину товар(req.user.id имеется благодаря authMiddleware) ===
  async addBasket(req, res) {
    console.log('передаваемый объект', req.body);
    try {
      const { id, name, price, picture, description } = req.body; //свойства добаленного товара
      const userCart = await User.findOne({ _id: req.user.id });
      const { basket, _id } = userCart; //корзина пользователя,_id пользователя

      //----создание массива товаров корзины----
      let newBasket = [];
      let quantity = 1; //количество одинаковых товаров(записываем в объект добавленного товара)
      // проверка есть ли добавленный товар в карзине(findIndex возвращает  индекс объекта, если нет объекта в массиве возвращает-1)
      const indexInOrder = basket.findIndex((item) => item.id === id);
      // console.log('старая корзина:', basket);
      // console.log('поиск товара:', indexInOrder);
      // делаем проверку,если есть одинаковые товары изменяем их количество и создаём новый массив корзины
      if (indexInOrder > -1) {
        // находим в массие корзины, через индекс, наш объект и изменяем его количество(quantity)
        quantity = basket[indexInOrder].quantity + 1;
        //ищем объект с нашим id  и записываем quantity
        newBasket = basket.map((item) => {
          if (item.id !== id) {
            return item;
          }
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            picture: item.picture,
            description: item.description,
            quantity,
          };
        });
      } else {
        newBasket = [
          ...basket,
          {
            id: id,
            name: name,
            price: price,
            picture: picture,
            description: description,
            quantity,
          },
        ];
      }
      //------------------------------------------

      //добавляем изменённую корзину пользователю
      const cart = await User.findByIdAndUpdate(
        _id,
        { basket: newBasket },
        {
          new: true,
        }
      );
      res.json(cart);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  //===============================================================

  //====== удаление товара из корзины =============================
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ massage: 'Id не указан' });
      }

      //получаем корзину пользователя
      const userCart = await User.findOne({ _id: req.user.id });
      const { basket } = userCart;

      //получаем объект,который хотим удалить
      const removeProduct = basket.find((item) => item.id === id);
      // console.log('удаляемый объект', removeProduct);
      // console.log('количество', removeProduct.quantity);
      //делаем проверку,если  удаляемого товара больше 1,то уменьшаем количество на 1,если нет удаляем полностью товар
      let newBasket = [];
      let quantity = 1;

      if (removeProduct.quantity > 1) {
        quantity = removeProduct.quantity - 1;

        newBasket = basket.map((item) => {
          if (item.id !== id) {
            return item;
          }
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            picture: item.picture,
            description: item.description,
            quantity,
          };
        });
      } else {
        newBasket = null;
      }

      //-------------------------------------------------------------
      const deleteDevice = await User.findByIdAndUpdate(
        req.user.id,
        newBasket ? { basket: newBasket } : { $pull: { basket: { id: id } } },
        {
          new: true,
        }
      );
      return res.json(deleteDevice);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  //=================================================================
  //============ получение корзины===================================
  async getBasket(req, res) {
    console.log('работает получение карзины');
    try {
      const userCart = await User.findById(req.user.id, 'basket');
      //console.log(userCart);
      const { basket } = userCart;
      // подсчёт количества товаров и общая стоимомсть
      const totalPrice = basket.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      console.log(totalPrice);
      const totalCount = basket.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);

      res.json({ basket, totalCount, totalPrice });
    } catch (e) {
      res.status(500).json(e);
    }
  }
  //===================================================================

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
