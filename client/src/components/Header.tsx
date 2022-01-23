import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Divider from '@material-ui/core/Divider';
import {
  setAuth, //записть авторизации в стор
  setIsAuth, // маркер авторизации
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
import { RootStateType } from '../store/store'; //типизация всего стейта
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
};
type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    /*  title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      }, 
    },*/

    toolBar: {
      display: 'block',
      '@media (min-width:600px)': {
        display: 'flex',
      },
    },
  })
);

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
}) => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem('token')); //берём токен из sessionStorage и приводим его к булевому значению

    const authorizationData: AuthReducerType = {
      //берём данные из sessionStorage и записываем в стор
      token: sessionStorage.getItem('token'),
      email: sessionStorage.getItem('email'),
      role: sessionStorage.getItem('role'),
    };
    setAuth(authorizationData);
    // загрузка типов устройств
    getTypes();
    // загрузка брендов
    getBrands();
    // загрузка корзины
    getProductCart();
    // eslint-disable-next-line
  }, []);

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
          {isAuth && auth.role === 'ADMIN' && (
            <MenuAdmin setTypeId={setTypeId} setBrandId={setBrandId} />
          )}
          {isAuth ? (
            <>
              <IconButton color="inherit" onClick={() => history.push('/cart')}>
                <Badge badgeContent={totalCount} color="secondary">
                  <ShoppingCartOutlinedIcon
                    style={{
                      fontSize: '35px',
                      color: 'black',
                      fontWeight: 'lighter',
                    }}
                  />
                </Badge>
              </IconButton>
              <Logout setLogout={setLogout} />
            </>
          ) : (
            <IconButton onClick={() => history.push('/login')}>
              <PersonAddOutlinedIcon
                style={{ fontSize: '35px', color: 'black' }}
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
})(Header);
