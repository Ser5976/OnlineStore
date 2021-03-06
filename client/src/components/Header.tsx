import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Divider from '@material-ui/core/Divider';
import {
  setAuth, //записть авторизации в стор
  setIsAuth, // экшен маркер авторизации
  setLogout, // выход из авторизации
  AuthReducerType, //типизация авторизации
  SetAuthActionType, // типизация экшена авторизации
  SetLogoutActionType, // типизация экшена выхода из авторизации
  SetIsAuthActionType, // типизация экшена маркера типизации
} from '../store/reducer/authReducer';
import {
  TypeDeviceType, //типизация типа
  setTypeIdActionType, //типизация экшена
  setBrandIdActionType, //типтзация экшена
  setNameActionType, // типизация экшен
  setBrandId, //запись в стейт выбранного брэнда
  setTypeId, //запись в стейт выбранного типа
  setName, //запись имени товара(для поиска)
} from '../store/reducer/deviceReducer';
import { getBrands, getTypes } from '../action/deviceAction'; //запрос на получениe типов устройств
import { getProductCart } from '../action/basketAction'; // запрос на получение содержимого корзины
import { checkAuthorization } from '../action/authAction';
import { RootStateType } from '../store/store'; //типизация всего стейта
import {
  setClearCart,
  SetClearCartActionType,
} from '../store/reducer/basketReducer';
import { useHistory } from 'react-router-dom';
import Logo7 from '../img/logo7.png';
import MenuAdmin from './MenuAdmin';
import Logout from './Logout';
import MenuBar from './MenuBar';
import SearchInput from './SearchInput';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  isAuth: boolean;
  auth: AuthReducerType;
  types: TypeDeviceType[];
  isFetchErrorTypes: boolean;
  totalCount: number;
};
type MapDispathPropsType = {
  setAuth: (value: AuthReducerType) => SetAuthActionType;
  setIsAuth: (value: boolean) => SetIsAuthActionType;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  setName: (data: string | null) => setNameActionType;
  setLogout: () => SetLogoutActionType;
  getTypes: () => void;
  getBrands: () => void;
  getProductCart: () => void;
  setClearCart: () => SetClearCartActionType;
  checkAuthorization: (history: any) => void;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------

const useStyles = makeStyles(() => ({
  shoppingIcon: {
    fontSize: '31px',
    color: (isAuth) => {
      if (isAuth) {
        return 'black';
      } else {
        return 'gray';
      }
    },
  },

  toolBar: {
    display: 'block',
    '@media (min-width:600px)': {
      display: 'flex',
    },
  },
}));

const Header: React.FC<PropsType> = ({
  auth,
  isAuth,
  types,
  isFetchErrorTypes,
  totalCount,
  setAuth,
  setLogout,
  setIsAuth,
  getTypes,
  getBrands,
  setBrandId,
  setTypeId,
  setName,
  getProductCart,
  setClearCart, //очистка корзины
  checkAuthorization, //проверка авторизации,получение нового токина или выход из авторизации если токен не валиден
}) => {
  const history = useHistory();
  const classes = useStyles(isAuth);
  /*  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem('token')); //берём токен из sessionStorage и приводим его к булевому значению

    // eslint-disable-next-line
  }, []); */

  useEffect(() => {
    checkAuthorization(history);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // загрузка типов устройств
    getTypes();
    // загрузка брендов
    getBrands();
    // eslint-disable-next-line
  }, []);
  // загрузка корзины
  useEffect(() => {
    if (isAuth) {
      getProductCart();
    }

    // eslint-disable-next-line
  }, [isAuth, auth.email]);
  //войти в корзину
  const shopingCart = () => {
    if (isAuth) {
      history.push('/cart');
    } else {
      history.push('/login');
    }
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ background: '#fff', padding: '0' }}
        elevation={0}
      >
        <Toolbar className={classes.toolBar}>
          <div style={{ marginRight: '300px' }}>
            <img src={Logo7} style={{ height: '100px', width: 'auto' }} />
          </div>
          <SearchInput setName={setName} />

          <MenuAdmin
            setTypeId={setTypeId}
            setBrandId={setBrandId}
            auth={auth}
          />

          <IconButton color="inherit" onClick={shopingCart}>
            <Badge badgeContent={totalCount} color="secondary">
              <ShoppingCartOutlinedIcon className={classes.shoppingIcon} />
            </Badge>
          </IconButton>
          {isAuth ? (
            <Logout setLogout={setLogout} setClearCart={setClearCart} />
          ) : (
            <IconButton onClick={() => history.push('/login')}>
              <PersonAddOutlinedIcon
                style={{ fontSize: '33px', color: 'black' }}
              />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Divider />
      <MenuBar
        types={types}
        setBrandId={setBrandId}
        setTypeId={setTypeId}
        isFetchErrorTypes={isFetchErrorTypes}
      />
    </>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth, //  маркер авторизации
    auth: state.auth.auth, //авторизация для role
    types: state.devices.types, //  типы устройств
    isFetchErrorTypes: state.devices.isFetchErrorTypes, //ошибка загруки типов устройств
    totalCount: state.basket.totalCount, //количества товаров в корзине
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  setAuth,
  setLogout,
  setIsAuth,
  getTypes,
  getBrands,
  setBrandId,
  setTypeId,
  setName,
  getProductCart,
  setClearCart,
  checkAuthorization,
})(Header);
