const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';

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
};

// типизация экшена
export type SetAddProductCartActionType = {
  type: typeof ADD_PRODUCT_CART;
  basket: BasketType[];
  totalCount: number;
  totalPrice: number;
};

export type SetActionType = SetAddProductCartActionType;

//-------------------------------------------

const initialState: InitialStateType = {
  basket: [],
  totalPrice: 0,
  totalCount: 0,
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
