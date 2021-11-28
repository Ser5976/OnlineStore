import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constants/url';
import {
  setErrorMessage, // запись ошибки аторизации и регистрации в стейт
  SetActionType, // тип экшенов authReducer
  setAuth, // запись авторизации  в стейт
  setIsAuth, //запись маркера авторизации
  AuthReducerType, // типизация авторизации редюсера
} from '../store/reducer/authReducer';
//типизация авторизация
export type AuthType = {
  email: string;
  password: string;
};
// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  SetActionType
>;
// авторизация
export const authorization = (value: AuthType, history: any): ThunkType => {
  return async (dispatch) => {
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
      history.push('/');
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
