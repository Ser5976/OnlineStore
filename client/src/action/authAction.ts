import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constants/url';
import {
  setErrorMessage, // запись ошибки аторизации и регистрации в стейт
  SetActionType, // тип экшенов authReducer
  setAuth, // запись авторизации  в стейт
  setIsAuth, //запись маркера авторизации
  setLogout, //очистка авторизации
  AuthReducerType, // типизация авторизации редюсера
} from '../store/reducer/authReducer';
import {
  setClearCart,
  SetClearCartActionType,
} from '../store/reducer/basketReducer';
//типизация авторизация
export type AuthType = {
  email: string;
  password: string;
};
// типизация санки
type ActionType = SetActionType | SetClearCartActionType; //типы экшенов из двух редюсеров

export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  ActionType
>;
// авторизация
export const authorization = (value: AuthType, history: any): ThunkType => {
  return async (dispatch, getState) => {
    const pathName = getState().auth.path; // путь до последнего клика
    try {
      const { data } = await axios.post(ModelUrls.LOGIN, value);
      console.log(data);

      //запись данных в sessionStorage
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('role', data.role);
      //запись в стейт
      dispatch(setAuth(data));
      dispatch(setIsAuth(true));
      history.push(pathName);
    } catch (e: any) {
      dispatch(setErrorMessage(e.message));
    }
  };
};
//регистрация
export const registration = (value: AuthType, history: any): ThunkType => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ModelUrls.REGISTRATION, value);
      const authorizationData: AuthReducerType = {
        token: data.token,
        email: data.user.email,
        role: data.user.role,
      };
      // console.log(authorizationData);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', data.user.email);
      sessionStorage.setItem('role', data.role);
      dispatch(setAuth(authorizationData));
      dispatch(setIsAuth(true));
      history.push('/');
    } catch (e: any) {
      console.log(e.message);
      dispatch(setErrorMessage(e.message));
    }
  };
};
//  проверка авторизации,получение нового токина, или выход из авторизации, если токен не валиден
export const checkAuthorization = (history: any): ThunkType => {
  return async (dispatch, getState) => {
    const token = getState().auth.auth.token || sessionStorage.getItem('token');
    const isAuth = getState().auth.isAuth || !!sessionStorage.getItem('token');
    if (!isAuth) {
      return;
    }
    try {
      const { data } = await axios.get(ModelUrls.CHECK, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //запись данных в sessionStorage
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('role', data.role);
      //запись в стейт
      dispatch(setAuth(data));
      dispatch(setIsAuth(true));
    } catch (e: any) {
      // если токен не валиден,то выполняем следующее:
      //очистка авторизации в сторе
      dispatch(setLogout());
      //очистка корзины
      dispatch(setClearCart());
      // удаление данных из sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      // преход на страницу авторизации
      history.push('/login');
    }
  };
};
