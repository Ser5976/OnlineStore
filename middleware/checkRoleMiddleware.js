import jwt from 'jsonwebtoken';
import config from 'config';

export const checkRoleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: `Пользователь  не авторизован` });
      }

      const decoded = jwt.verify(token, config.get('secret'));
      req.user = decoded;
      if (role !== req.user.role) {
        return res.status(403).json({ message: `Нет доступа` });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: `Пользователь  не авторизован` });
    }
  };
};
