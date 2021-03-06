import {
  setIsLoadinDevice, //крутилка для устройств
  setIsLoadinSelectedDevice, //крутилка для выбранного устройства
  setIsLoadinTypes, //крутилка для типов
  setIsLoadinSelectedType, //крутилка для выбранного типа
  setFetchErrorDevice, //ошибка для устройств
  setFetchErrorSelectedDevice, //ошибка для выбранного утсройства
  setFetchErrorTypes, //ошибка для типов
  setFetchErrorSelectedType, //ошибка для выбранного типа
  setFetchErrorBrands, //ошибка загрузки брэндов
  setDevices, // запись устройств в стейт
  setSelectedDevice, // запись выбранного устройства в стейт
  setTypes, // запись типов в стейт
  setSelectedType, //запись выбранного типа устройства в стейт
  setBrands, // запись брэндов
  setPageQty, // запись количества страниц в стейт
  addedDeviceType, //типизация добавленного устройства
  setAddedDevice, // запись добавленного устройства в стейт
  setAddedDeviceError, // изменения статуса ошибки добавленного устройства
  setAlertMessage, // изменения маркера получения сообщения о невозможности удаления типа/брэнда устройства
} from './../store/reducer/deviceReducer';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constants/url';
import { DeviceAtionType } from '../store/reducer/deviceReducer'; //типизация экшенов устройств

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
  name: string | null,
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
          name,
        },
      });
      // console.log(response);
      //если число страниц меньше активной страницы,текущую страницу ставим 1
      if (response.data.pageQty < page) {
        setPage(1); //записываем текущую страницу в локальный стейт
        history.replace(
          `${
            history.location.pathname === '/deleteContainer'
              ? '/deleteContainer'
              : `${history.location.pathname}`
          }?page=1`
        );
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
// получение выбранного устройства
export const getSelectedDevice = (id: string): ThunkType => {
  //console.log(id);
  return async (dispatch) => {
    try {
      dispatch(setIsLoadinSelectedDevice(true));
      const response = await axios.get(ModelUrls.DEVICES + '/' + id);
      //запись в стейт
      dispatch(setSelectedDevice(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorSelectedDevice(true));
      dispatch(setIsLoadinSelectedDevice(false));
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
// получение типа выбранного устройства
export const getSelectedType = (id: string): ThunkType => {
  //console.log(id);
  return async (dispatch) => {
    try {
      dispatch(setIsLoadinSelectedType(true));
      const response = await axios.get(ModelUrls.TYPES + '/' + id);
      //console.log(response.data);
      //запись в стейт
      dispatch(setSelectedType(response.data));
    } catch (e) {
      console.log(e);
      dispatch(setFetchErrorSelectedType(true));
      dispatch(setIsLoadinSelectedType(false));
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
      dispatch(setFetchErrorBrands(true));
    }
  };
};
// добавление устройства в базу данных ,обнуление стейта addedDevice,переход на главную страницу
export const addDevice = (
  data: addedDeviceType,
  showAlert: () => void, // открытие алерта,который показывает результат добавления
  handleStart: () => void // для изменения локального стейта activeStep
  // в AddDevicesContainer,чтобы возратить степ на начальный уровень добавления товара
): ThunkType => {
  //чтобы обнулить стейт
  const copyAddedDevice: addedDeviceType = {
    name: '',
    price: '',
    description: '',
    picture: [],
    info: [],
    typeId: '',
    brandId: '',
  };
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.DEVICES, data);
      // console.log(response);
      dispatch(setAddedDeviceError(false));
      //обнуляем добавленное устройство в стейте
      dispatch(setAddedDevice(copyAddedDevice));
      dispatch(getTypes());
      handleStart();
      showAlert();
    } catch (e) {
      console.log(e);
      dispatch(setAddedDeviceError(true));
    }
  };
};
// добавление типа устройства в базу данных
export const addType = (
  data: { name: string },
  handleClose: () => void
): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.TYPES, data);
      dispatch(setAddedDeviceError(false));
      console.log(response);
      dispatch(getTypes());
      handleClose();
    } catch (e) {
      console.log(e);
      dispatch(setAddedDeviceError(true));
    }
  };
};
// добавление брэнда устройства в базу данных
export const addBrand = (
  data: { name: string },
  handleClose: () => void
): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.BRANDS, data);
      dispatch(setAddedDeviceError(false));
      console.log(response);
      dispatch(getBrands());
      handleClose();
    } catch (e) {
      console.log(e);
      dispatch(setAddedDeviceError(true));
    }
  };
};
// удаление  устройства
export const removeDevice = (
  id: string | undefined, // id удалённого товара
  showAlert: () => void, // открытие алерта,который показывает результат удаления
  setRemoteDevice: React.Dispatch<React.SetStateAction<string>>, // добавление в локальный стейт названия товара
  //чтобы добавить в зависимость для получения устройств
  name: string //  название товара
): ThunkType => {
  console.log(id);
  return async (dispatch) => {
    try {
      const response = await axios.delete(ModelUrls.DEVICES + '/' + id);
      setRemoteDevice(name);
      showAlert(); // показывает алерт,результат удаления
    } catch (e) {
      console.log(e);
      dispatch(setAlertMessage('товар не удалён,что-то пошло не так'));
      showAlert();
    }
  };
};
// удаление типа устройства
export const removeType = (id: string, showAlert: () => void): ThunkType => {
  console.log(id);
  return async (dispatch) => {
    try {
      const response = await axios.delete(ModelUrls.TYPES + '/' + id);
      // console.log(response);
      if (response.data.message) {
        dispatch(setAlertMessage(response.data.message));
      }
      dispatch(getTypes());
      showAlert();
    } catch (e) {
      console.log(e);
      dispatch(setAlertMessage('тип не удалён,что-то пошло не так'));
      showAlert();
    }
  };
};
// удаление брэнда устройства
export const removeBrand = (id: string, showAlert: () => void): ThunkType => {
  console.log(id);
  return async (dispatch) => {
    try {
      const response = await axios.delete(ModelUrls.BRANDS + '/' + id);
      // console.log(response);
      if (response.data.message) {
        dispatch(setAlertMessage(response.data.message));
      }
      dispatch(getBrands());
      dispatch(getTypes());
      showAlert(); //открытие алерта, который показывает результат удаления брэнда
    } catch (e) {
      console.log(e);
      dispatch(setAlertMessage('брэнд не удалён,что-то пошло не так'));
      showAlert();
    }
  };
};
