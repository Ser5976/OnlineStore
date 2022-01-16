const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';

// типизация--------------------------------
// типизация стейта
export type ProductType = {
  name: string;
  price: string;
  picture: string;
  _id?: string;
};

export type InitialStateType = {
  product: ProductType[];
  totalPrice: number;
  totalCount: number;
};

// типизация экшена
export type SetAddProductCartActionType = {
  type: typeof ADD_PRODUCT_CART;
  payload: ProductType[];
};
export type SetRemoveCartProductActionType = {
  type: typeof REMOVE_CART_PRODUCT;
  payload: string;
};

export type SetActionType =
  | SetAddProductCartActionType
  | SetRemoveCartProductActionType;

//-------------------------------------------

const initialState: InitialStateType = {
  product: [],
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
        product: action.payload,
      };
    case REMOVE_CART_PRODUCT:
      return {
        ...state,
        product: [
          ...state.product.filter((item) => item._id !== action.payload),
        ],
      };

    default:
      return state;
  }
};

//добавление товара в корзину
export const setAddProductCart = (
  value: ProductType[]
): SetAddProductCartActionType => ({
  type: ADD_PRODUCT_CART,
  payload: value,
});
// удаление товара из корзины
export const setRemuveCartProduct = (
  value: string
): SetRemoveCartProductActionType => ({
  type: REMOVE_CART_PRODUCT,
  payload: value,
});
