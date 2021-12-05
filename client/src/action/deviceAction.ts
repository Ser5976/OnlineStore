import {
  setIsLoadinDevice, //крутилка для устройств
  setIsLoadinTypes, //крутилка для типов
  setFetchErrorDevice, //ошибка для устройств
  setFetchErrorTypes, //ошибка для типов
} from './../store/reducer/deviceReducer';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constants/url';
import { DeviceAtionType } from '../store/reducer/deviceReducer'; //типизация экшенов устройств
import {
  setDevices, // запись устройств в стейт
  setTypes, // запись типов в стейт
  setBrands, // запись брэндов
  setPageQty, // запись количества страниц в стейт
  addedDeviceType,
} from '../store/reducer/deviceReducer';

// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  DeviceAtionType
>;
// получение выбранных устройств и запись в стейт
export const getDevices = (
  typeId: string | null,
  brandId: string | null,
  limit: number,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  history: any
): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoadinDevice(true));
      const response = await axios.get(`${ModelUrls.DEVICES}`, {
        params: {
          typeId,
          brandId,
          limit,
          page,
        },
      });
      console.log(response);
      //если число страниц меньше активной страницы,текущую страницу ставим 1
      if (response.data.pageQty < page) {
        setPage(1); //записываем текущую страницу в локальный стейт,(в Content)
        history.replace('/');
      }
      //запись в стейт
      dispatch(setDevices(response.data.device));
      dispatch(setPageQty(response.data.pageQty));
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorDevice(true));
      dispatch(setIsLoadinDevice(false));
    }
  };
};

// получение типов устройств и запись в стейт
export const getTypes = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoadinTypes(true));
      const response = await axios.get(ModelUrls.TYPES);
      // console.log(response);
      //запись в стейт
      dispatch(setTypes(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorTypes(true));
      dispatch(setIsLoadinTypes(false));
    }
  };
};
// получение брэндов и запись в стейт
export const getBrands = (): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.get(ModelUrls.BRANDS);
      // console.log(response);
      //запись в стейт
      dispatch(setBrands(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
// добавление устройства в базу данных
export const addDevice = (data: any): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.DEVICES, data);
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
};
