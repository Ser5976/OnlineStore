const SET_DEVICES = 'SET_DEVICES';
const SET_SELECTED_DEVICE = 'SET_SELECTED_DEVICE';
const SET_TYPES = 'SET_TYPES';
const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
const SET_BRANDS = 'SET_BRANDS';
const SET_PAGE_QTY = 'SET_PAGE_QTY';
const SET_TYPE_ID = 'SET_TYPE_ID';
const SET_BRAND_ID = 'SET_BRAND_ID';

const IS_LOADIN_DEVICES = 'IS_LOADIN_DEVICES';
const IS_LOADIN_SELECTED_DEVICE = 'IS_LOADIN_SELECTED_DEVICE';
const IS_LOADIN_TYPES = 'IS_LOADIN_TYPES';
const IS_LOADIN_SELECTED_TYPE = 'IS_LOADIN_SELECTED_TYPE';

const SET_FETCH_ERROR_DEVICE = 'SET_FETCH_ERROR_DEVICE';
const SET_FETCH_ERROR_SELECTED_DEVICE = 'SET_FETCH_ERROR_SELECTED_DEVICE';
const SET_FETCH_ERROR_TYPES = 'SET_FETCH_ERROR_TYPES';
const SET_FETCH_ERROR_SELECTED_TYPE = 'SET_FETCH_ERROR_SELECTED_TYPE';
const SET_FETCH_ERROR_BRANDS = 'SET_FETCH_ERROR_BRANDS';

const SET_ADDED_DEVICE = 'SET_ADDED_DEVICE';
const SET_ADDED_DEVICE_ERROR = 'SET_ADDED_DEVICE_ERROR';

const SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE';

const SET_NAME = 'SET_NAME';

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
  title: string;
  description: string;
};

export type DeviceType = {
  _id?: string;
  name: string;
  price: number | null;
  description?: string;
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
  description: string;
  picture: any[];
  info: InfoType[];
  typeId: string;
  brandId: string;
};

export type InitialStateType = {
  devices: DeviceType[];
  selectedDevice: DeviceType;
  selectedType: TypeDeviceType;
  brands: BrandType[];
  types: TypeDeviceType[];
  pageQty: number;
  limit: number;
  typeId: string | null;
  brandId: string | null;

  isLoadinDevice: boolean;
  isLoadinSelectedDevice: boolean;
  isLoadinTypes: boolean;
  isLoadinSelectedType: boolean;

  isFetchErrorDevice: boolean;
  isFetchErrorTypes: boolean;
  isFetchErrorSelectedType: boolean;
  isFetchErrorSelectedDevice: boolean;
  isFetchErrorBrands: boolean;

  addedDevice: addedDeviceType;
  addedDeviceError: boolean;

  alertMessage: string | null;

  name: string | null;
};
//------- action---------------------------
export type setDevicesActionType = {
  type: typeof SET_DEVICES;
  payload: DeviceType[];
};
export type setSelectedTypeActionType = {
  type: typeof SET_SELECTED_TYPE;
  payload: TypeDeviceType;
};
export type setSelectedDeviceActionType = {
  type: typeof SET_SELECTED_DEVICE;
  payload: DeviceType;
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
export type setIsLoadinSelectedDeviceActionType = {
  type: typeof IS_LOADIN_SELECTED_DEVICE;
  payload: boolean;
};
export type setIsLoadinSelectedTypeActionType = {
  type: typeof IS_LOADIN_SELECTED_TYPE;
  payload: boolean;
};
export type setIsLoadinTypesActionType = {
  type: typeof IS_LOADIN_TYPES;
  payload: boolean;
};
export type setFetchErrorDeviceActionType = {
  type: typeof SET_FETCH_ERROR_DEVICE;
  payload: boolean;
};
export type setFetchErrorSelectedDeviceActionType = {
  type: typeof SET_FETCH_ERROR_SELECTED_DEVICE;
  payload: boolean;
};
export type setFetchErrorTypesActionType = {
  type: typeof SET_FETCH_ERROR_TYPES;
  payload: boolean;
};
export type setFetchErrorSelectedTypeActionType = {
  type: typeof SET_FETCH_ERROR_SELECTED_TYPE;
  payload: boolean;
};
export type setFetchErrorBrandsActionType = {
  type: typeof SET_FETCH_ERROR_BRANDS;
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

export type setAlertMessageActionType = {
  type: typeof SET_ALERT_MESSAGE;
  payload: string | null;
};
export type setNameActionType = {
  type: typeof SET_NAME;
  payload: string | null;
};

export type DeviceAtionType =
  | setDevicesActionType
  | setSelectedDeviceActionType
  | setSelectedTypeActionType
  | setTypesActionType
  | setBrandsActionType
  | setPageQtyActionType
  | setTypeIdActionType
  | setBrandIdActionType
  | setIsLoadinDeviceActionType
  | setFetchErrorDeviceActionType
  | setIsLoadinTypesActionType
  | setFetchErrorTypesActionType
  | setIsLoadinSelectedDeviceActionType
  | setIsLoadinSelectedTypeActionType
  | setFetchErrorSelectedDeviceActionType
  | setFetchErrorSelectedTypeActionType
  | setFetchErrorBrandsActionType
  | setAddedDeviceActionType
  | setAddedDeviceErrorActionType
  | setAlertMessageActionType
  | setNameActionType;

//-----------------------------------------

const initialState: InitialStateType = {
  devices: [], //массив устройств
  selectedDevice: {} as DeviceType, //выбранное устройство
  selectedType: {} as TypeDeviceType, //выбранный тип устройства
  types: [], //массив типов устройств
  brands: [], // массив брэндов устройств
  //---пагинация----
  pageQty: 0, // общее количество страниц(для пагинации)
  limit: 10, // количество устройств на станице
  //----для фильтрации---
  typeId: null, // выбранный тип устройства
  brandId: null, // выбранный брэнд устройства
  //------загрузка и ошибки-----
  isLoadinDevice: true,
  isLoadinSelectedDevice: true,
  isLoadinTypes: true,
  isLoadinSelectedType: true,

  isFetchErrorDevice: false,
  isFetchErrorSelectedDevice: false,
  isFetchErrorTypes: false,
  isFetchErrorSelectedType: false,
  isFetchErrorBrands: false,

  //------добавленное устройство
  addedDevice: {
    name: '',
    price: '',
    description: '',
    picture: [],
    info: [],
    typeId: '',
    brandId: '',
  },
  addedDeviceError: false, //ошибка при добавлении устройства в базу данных
  alertMessage: null, // маркер получения сообщения о невозможности удаления типа/брэнда устройства

  name: null, //поиск товара по имени
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
        isFetchErrorDevice: false,
      };
    case SET_SELECTED_DEVICE:
      return {
        ...state,
        selectedDevice: action.payload,
        isLoadinSelectedDevice: false,
        isFetchErrorSelectedDevice: false,
      };
    case SET_TYPES:
      return {
        ...state,
        types: action.payload,
        isLoadinTypes: false,
        isFetchErrorTypes: false,
      };
    case SET_SELECTED_TYPE:
      return {
        ...state,
        selectedType: action.payload,
        isLoadinSelectedType: false,
        isFetchErrorSelectedType: false,
      };
    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
        isFetchErrorBrands: false,
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
        name: null,
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
    case IS_LOADIN_SELECTED_DEVICE:
      return {
        ...state,
        isLoadinSelectedDevice: action.payload,
      };
    case SET_FETCH_ERROR_DEVICE:
      return {
        ...state,
        isFetchErrorDevice: action.payload,
      };
    case SET_FETCH_ERROR_SELECTED_DEVICE:
      return {
        ...state,
        isFetchErrorSelectedDevice: action.payload,
      };
    case SET_FETCH_ERROR_BRANDS:
      return {
        ...state,
        isFetchErrorBrands: action.payload,
      };
    case IS_LOADIN_TYPES:
      return {
        ...state,
        isLoadinTypes: action.payload,
      };
    case IS_LOADIN_SELECTED_TYPE:
      return {
        ...state,
        isLoadinSelectedType: action.payload,
      };
    case SET_FETCH_ERROR_TYPES:
      return {
        ...state,
        isFetchErrorTypes: action.payload,
      };
    case SET_FETCH_ERROR_SELECTED_TYPE:
      return {
        ...state,
        isFetchErrorSelectedType: action.payload,
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
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
        typeId: null,
        brandId: null,
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
// записывает выбранное устройство
export const setSelectedDevice = (
  data: DeviceType
): setSelectedDeviceActionType => ({
  type: SET_SELECTED_DEVICE,
  payload: data,
});
// записываем типы устройств
export const setTypes = (data: TypeDeviceType[]): setTypesActionType => ({
  type: SET_TYPES,
  payload: data,
});
// записывает выбранный тип устройства
export const setSelectedType = (
  data: TypeDeviceType
): setSelectedTypeActionType => ({
  type: SET_SELECTED_TYPE,
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
export const setIsLoadinSelectedDevice = (
  bul: boolean
): setIsLoadinSelectedDeviceActionType => ({
  type: IS_LOADIN_SELECTED_DEVICE,
  payload: bul,
});
export const setFetchErrorDevice = (
  bul: boolean
): setFetchErrorDeviceActionType => ({
  type: SET_FETCH_ERROR_DEVICE,
  payload: bul,
});
export const setFetchErrorSelectedDevice = (
  bul: boolean
): setFetchErrorSelectedDeviceActionType => ({
  type: SET_FETCH_ERROR_SELECTED_DEVICE,
  payload: bul,
});
export const setIsLoadinTypes = (bul: boolean): setIsLoadinTypesActionType => ({
  type: IS_LOADIN_TYPES,
  payload: bul,
});
export const setIsLoadinSelectedType = (
  bul: boolean
): setIsLoadinSelectedTypeActionType => ({
  type: IS_LOADIN_SELECTED_TYPE,
  payload: bul,
});
export const setFetchErrorTypes = (
  bul: boolean
): setFetchErrorTypesActionType => ({
  type: SET_FETCH_ERROR_TYPES,
  payload: bul,
});
export const setFetchErrorSelectedType = (
  bul: boolean
): setFetchErrorSelectedTypeActionType => ({
  type: SET_FETCH_ERROR_SELECTED_TYPE,
  payload: bul,
});
export const setFetchErrorBrands = (
  bul: boolean
): setFetchErrorBrandsActionType => ({
  type: SET_FETCH_ERROR_BRANDS,
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
export const setAlertMessage = (
  data: string | null
): setAlertMessageActionType => ({
  type: SET_ALERT_MESSAGE,
  payload: data,
});
// запись имени товара(для поиска) в стейт
export const setName = (data: string | null): setNameActionType => ({
  type: SET_NAME,
  payload: data,
});
