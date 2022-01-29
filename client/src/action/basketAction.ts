import axios from 'axios';
import { ThunkAction } from 'redux-thunk'; // для типизации санки
import { RootStateType } from '../store/store'; //типизация всего стора
import { ModelUrls } from '../constants/url';
import {
  setAddProductCart,
  SetActionType,
  setErrorBasket,
} from '../store/reducer/basketReducer';
//типизация товара добавляемого в карзину
export type ProductType = {
  name: string;
  price: number | null;
  picture: string[];
  description: string | undefined;
  id: string | undefined;
};
// типизация санки
export type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown, //extraArgument
  SetActionType //типизация экшенов корзины
>;
// запрос на корзину
export const getProductCart = (): ThunkType => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(ModelUrls.BASKET, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      dispatch(
        setAddProductCart(data.basket, data.totalCount, data.totalPrice)
      );
      dispatch(setErrorBasket(false));
      // console.log(data);
    } catch (e: any) {
      console.log(e);
      dispatch(setErrorBasket(true));
    }
  };
};

// добавление товара
export const addProductCart = (product: ProductType): ThunkType => {
  return async (dispatch) => {
    try {
      await axios.post(ModelUrls.BASKET, product, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      dispatch(getProductCart());
    } catch (e: any) {
      console.log(e);
    }
  };
};

//удаление товара из корзины
export const deleteProductCart = (id: string): ThunkType => {
  return async (dispatch) => {
    try {
      await axios.delete(`${ModelUrls.BASKET}/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      dispatch(getProductCart());
    } catch (e: any) {
      console.log(e);
    }
  };
};
