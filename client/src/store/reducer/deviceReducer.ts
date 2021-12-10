import { boolean } from 'yup/lib/locale';

const SET_DEVICES = 'SET_DEVICES';
const SET_TYPES = 'SET_TYPE';
const SET_BRANDS = 'SET_BRANDS';
const SET_PAGE_QTY = 'SET_PAGE_QTY';
const SET_TYPE_ID = 'SET_TYPE_ID';
const SET_BRAND_ID = 'SET_BRAND_ID';

const IS_LOADIN_DEVICES = 'IS_LOADIN_DEVICES';
const IS_LOADIN_TYPES = 'IS_LOADIN_TYPES';
const SET_FETCH_ERROR_DEVICE = 'SET_FETCH_ERROR_DEVICE';
const SET_FETCH_ERROR_TYPES = 'SET_FETCH_ERROR_TYPES';

const SET_ADDED_DEVICE = 'SET_ADDED_DEVICE';
const SET_ADDED_DEVICE_ERROR = 'SET_ADDED_DEVICE_ERROR';

const SET_TYPE_MESSAGE = 'SET_TYPE_MESSAGE';

//типизация--------------------------------
//----------стейта-------------------------
export type Brands = {
  _id: string;
  name: string;
  __v: number;
};
export type TypeDeviceType = {
  _id: string;
  name: string;
  brands: Brands[];
  __v: number;
};
export type InfoType = {
  id?: number;
  _id?: string;
  title: string;
  description: string;
  __v?: number;
};

export type DeviceType = {
  _id?: string;
  name: string;
  price: number | null;
  picture: string[] | any[];
  info: any;
  typeId: string;
  brandId: string;
  __v?: number;
};
export type BrandType = {
  _id: string;
  name: string;
  __v: number;
};
export type addedDeviceType = {
  name: string;
  price: string;
  picture: any[];
  info: InfoType[];
  typeId: string;
  brandId: string;
};

export type InitialStateType = {
  devices: DeviceType[];
  brands: BrandType[];
  types: TypeDeviceType[];
  pageQty: number;
  limit: number;
  typeId: string | null;
  brandId: string | null;
  isLoadinDevice: boolean;
  isFetchErrorDevice: boolean;
  isLoadinTypes: boolean;
  isFetchErrorTypes: boolean;
  addedDevice: addedDeviceType;
  addedDeviceError: boolean;
  typeMessage: boolean;
};
//------- action---------------------------
export type setDevicesActionType = {
  type: typeof SET_DEVICES;
  payload: DeviceType[];
};
export type setTypesActionType = {
  type: typeof SET_TYPES;
  payload: TypeDeviceType[];
};
export type setBrandsActionType = {
  type: typeof SET_BRANDS;
  payload: BrandType[];
};
export type setPageQtyActionType = {
  type: typeof SET_PAGE_QTY;
  payload: number;
};
export type setTypeIdActionType = {
  type: typeof SET_TYPE_ID;
  payload: string | null;
};
export type setBrandIdActionType = {
  type: typeof SET_BRAND_ID;
  payload: string | null;
};
export type setIsLoadinDeviceActionType = {
  type: typeof IS_LOADIN_DEVICES;
  payload: boolean;
};
export type setFetchErrorDeviceActionType = {
  type: typeof SET_FETCH_ERROR_DEVICE;
  payload: boolean;
};
export type setIsLoadinTypesActionType = {
  type: typeof IS_LOADIN_TYPES;
  payload: boolean;
};
export type setFetchErrorTypesActionType = {
  type: typeof SET_FETCH_ERROR_TYPES;
  payload: boolean;
};
export type setAddedDeviceActionType = {
  type: typeof SET_ADDED_DEVICE;
  payload: addedDeviceType;
};
export type setAddedDeviceErrorActionType = {
  type: typeof SET_ADDED_DEVICE_ERROR;
  payload: boolean;
};
export type setTypeMessageActionType = {
  type: typeof SET_TYPE_MESSAGE;
  payload: boolean;
};

export type DeviceAtionType =
  | setDevicesActionType
  | setTypesActionType
  | setBrandsActionType
  | setPageQtyActionType
  | setTypeIdActionType
  | setBrandIdActionType
  | setIsLoadinDeviceActionType
  | setFetchErrorDeviceActionType
  | setIsLoadinTypesActionType
  | setFetchErrorTypesActionType
  | setAddedDeviceActionType
  | setAddedDeviceErrorActionType
  | setTypeMessageActionType;

//-----------------------------------------

const initialState: InitialStateType = {
  devices: [], //массив устройств
  types: [], //массив типов устройств
  brands: [], // массив брэндов устройств
  //---пагинация----
  pageQty: 0, // общее количество страниц(для пагинации)
  limit: 6, // количество устройств на станице
  //----для фильтрации---
  typeId: null, // выбранный тип устройства
  brandId: null, // выбранный брэнд устройства
  //------загрузка и ошибки-----
  isLoadinDevice: true,
  isFetchErrorDevice: false,
  isLoadinTypes: true,
  isFetchErrorTypes: false,
  //------добавленное устройство
  addedDevice: {
    name: '',
    price: '',
    picture: [],
    info: [],
    typeId: '',
    brandId: '',
  },
  addedDeviceError: false, //ошибка при добавлении устройства в базу данных
  typeMessage: true, // маркер получения сообщения о невозможности удаления типа устройства
};
export const deviceReducer = (
  state = initialState,
  action: DeviceAtionType
) => {
  switch (action.type) {
    case SET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        isLoadinDevice: false,
      };
    case SET_TYPES:
      return {
        ...state,
        types: action.payload,
        isLoadinTypes: false,
      };
    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case SET_PAGE_QTY:
      return {
        ...state,
        pageQty: action.payload,
      };
    case SET_TYPE_ID:
      return {
        ...state,
        typeId: action.payload,
      };
    case SET_BRAND_ID:
      return {
        ...state,
        brandId: action.payload,
      };

    case IS_LOADIN_DEVICES:
      return {
        ...state,
        isLoadinDevice: action.payload,
      };
    case SET_FETCH_ERROR_DEVICE:
      return {
        ...state,
        isFetchErrorDevice: action.payload,
      };
    case IS_LOADIN_TYPES:
      return {
        ...state,
        isLoadinTypes: action.payload,
      };
    case SET_FETCH_ERROR_TYPES:
      return {
        ...state,
        isFetchErrorTypes: action.payload,
      };
    case SET_ADDED_DEVICE:
      return {
        ...state,
        addedDevice: action.payload,
      };
    case SET_ADDED_DEVICE_ERROR:
      return {
        ...state,
        addedDeviceError: action.payload,
      };
    case SET_TYPE_MESSAGE:
      return {
        ...state,
        typeMessage: action.payload,
      };
    default:
      return state;
  }
};
// записывает устройства
export const setDevices = (data: DeviceType[]): setDevicesActionType => ({
  type: SET_DEVICES,
  payload: data,
});
// записываем общее количество страниц (вычисляем на бэке,для пагинации)
export const setPageQty = (data: number): setPageQtyActionType => ({
  type: SET_PAGE_QTY,
  payload: data,
});
// записываем типы устройств
export const setTypes = (data: TypeDeviceType[]): setTypesActionType => ({
  type: SET_TYPES,
  payload: data,
});
// записываем бренды устройств
export const setBrands = (data: BrandType[]): setBrandsActionType => ({
  type: SET_BRANDS,
  payload: data,
});
// записываем выбранный тип
export const setTypeId = (data: string | null): setTypeIdActionType => ({
  type: SET_TYPE_ID,
  payload: data,
});
// записываем выбранный брэнд
export const setBrandId = (data: string | null): setBrandIdActionType => ({
  type: SET_BRAND_ID,
  payload: data,
});
// записываем крутилки и ошибки  в стейт
export const setIsLoadinDevice = (
  bul: boolean
): setIsLoadinDeviceActionType => ({
  type: IS_LOADIN_DEVICES,
  payload: bul,
});

export const setFetchErrorDevice = (
  bul: boolean
): setFetchErrorDeviceActionType => ({
  type: SET_FETCH_ERROR_DEVICE,
  payload: bul,
});
export const setIsLoadinTypes = (bul: boolean): setIsLoadinTypesActionType => ({
  type: IS_LOADIN_TYPES,
  payload: bul,
});

export const setFetchErrorTypes = (
  bul: boolean
): setFetchErrorTypesActionType => ({
  type: SET_FETCH_ERROR_TYPES,
  payload: bul,
});

//запись добавленного девайса в стейт
export const setAddedDevice = (
  data: addedDeviceType
): setAddedDeviceActionType => ({
  type: SET_ADDED_DEVICE,
  payload: data,
});
//ошибка добавленного устройтсва
export const setAddedDeviceError = (
  data: boolean
): setAddedDeviceErrorActionType => ({
  type: SET_ADDED_DEVICE_ERROR,
  payload: data,
});
// изменения маркера получения сообщения о невозможности удаления типа устройства
export const setTypeMessage = (data: boolean): setTypeMessageActionType => ({
  type: SET_TYPE_MESSAGE,
  payload: data,
});
