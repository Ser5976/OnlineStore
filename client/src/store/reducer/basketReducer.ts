const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
const ERROR_BASKET = 'ERROR_BASKET';
const CLEAR_CART = 'CLEAR_CART';

// типизация--------------------------------
// типизация стейта
export type BasketType = {
  name: string;
  price: string;
  picture: string;
  description: string;
  id: string;
  quantity: number;
  _id: string;
};

export type InitialStateType = {
  basket: BasketType[];
  totalPrice: number;
  totalCount: number;
  errorBasket: boolean;
};

// типизация экшена
export type SetAddProductCartActionType = {
  type: typeof ADD_PRODUCT_CART;
  basket: BasketType[];
  totalCount: number;
  totalPrice: number;
};
export type SetErrorBasketActionType = {
  type: typeof ERROR_BASKET;
  payload: boolean;
};
export type SetClearCartActionType = {
  type: typeof CLEAR_CART;
};

export type SetActionType =
  | SetAddProductCartActionType
  | SetErrorBasketActionType
  | SetClearCartActionType;

//-------------------------------------------

const initialState: InitialStateType = {
  basket: [],
  totalPrice: 0,
  totalCount: 0,
  errorBasket: false,
};

export const basketReducer = (
  state = initialState,
  action: SetActionType
): InitialStateType => {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      return {
        ...state,
        basket: action.basket,
        totalCount: action.totalCount,
        totalPrice: action.totalPrice,
      };
    case CLEAR_CART:
      return {
        ...state,
        basket: [],
        totalCount: 0,
        totalPrice: 0,
      };
    case ERROR_BASKET:
      return {
        ...state,
        errorBasket: action.payload,
      };

    default:
      return state;
  }
};

//добавление товара в корзину
export const setAddProductCart = (
  basket: BasketType[],
  totalCount: number,
  totalPrice: number
): SetAddProductCartActionType => ({
  type: ADD_PRODUCT_CART,
  basket,
  totalCount,
  totalPrice,
});
//очистить корзину
export const setClearCart = (): SetClearCartActionType => ({
  type: CLEAR_CART,
});
//ошибка при добавлении товара в корзину
export const setErrorBasket = (value: boolean): SetErrorBasketActionType => ({
  type: ERROR_BASKET,
  payload: value,
});
