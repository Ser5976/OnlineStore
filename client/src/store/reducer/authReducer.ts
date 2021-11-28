const SET_AUTH = 'SET_AUTH';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_IS_AUTH = 'SET_IS_AUTH';

// типизация--------------------------------
// типизация стейта
export type AuthReducerType = {
  email: string | null;
  token: string | null;
  role?: string | null;
};

export type InitialStateType = {
  auth: AuthReducerType;
  isAuth: boolean;
  errorMessage: string | null;
};

// типизация экшена
export type SetAuthActionType = {
  type: typeof SET_AUTH;
  payload: AuthReducerType;
};
export type SetIsAuthActionType = {
  type: typeof SET_IS_AUTH;
  payload: boolean;
};
export type SetErrorMessageActionType = {
  type: typeof SET_ERROR_MESSAGE;
  payload: string;
};
export type SetLogoutActionType = {
  type: typeof SET_LOGOUT;
};

export type SetActionType =
  | SetAuthActionType
  | SetErrorMessageActionType
  | SetLogoutActionType
  | SetIsAuthActionType;

//-------------------------------------------

const initialState: InitialStateType = {
  auth: { email: null, token: null, role: null }, //авторизация
  errorMessage: null, // ошибка авторизации
  isAuth: false, // булевое значение для авторизации
};

export const authReducer = (
  state = initialState,
  action: SetActionType
): InitialStateType => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
        errorMessage: null,
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SET_LOGOUT:
      return {
        ...state,
        auth: { ...state.auth, email: null, token: null },
        isAuth: false,
      };

    default:
      return state;
  }
};

//запись авторизация
export const setAuth = (value: AuthReducerType): SetAuthActionType => ({
  type: SET_AUTH,
  payload: value,
});
// маркер авторизации
export const setIsAuth = (value: boolean): SetIsAuthActionType => ({
  type: SET_IS_AUTH,
  payload: value,
});
// данные об ошибки
export const setErrorMessage = (data: string): SetErrorMessageActionType => ({
  type: SET_ERROR_MESSAGE,
  payload: data,
});
// выход из аторизации
export const setLogout = (): SetLogoutActionType => ({
  type: SET_LOGOUT,
});
