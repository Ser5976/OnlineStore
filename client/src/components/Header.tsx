import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Divider from '@material-ui/core/Divider';
import Logout from './Logout';
import MenuBar from './MenuBar';
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
  setBrandIdActionType, //экшена
  setBrandId, //запись в стейт выбранного типа
  setTypeId, //запись в стейт выбранного ,h'ylf
} from '../store/reducer/deviceReducer';
import { getBrands, getTypes } from '../action/deviceAction'; //запрос на получениe типов устройств
import { RootStateType } from '../store/store'; //типизация всего стейта
import { useHistory } from 'react-router-dom';
import Logo7 from '../img/logo7.png';
import MenuAdmin from './MenuAdmin';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  isAuth: boolean;
  auth: AuthReducerType;
  types: TypeDeviceType[];
  isFetchErrorTypes: boolean;
};
type MapDispathPropsType = {
  setAuth: (value: AuthReducerType) => SetAuthActionType;
  setIsAuth: (value: boolean) => SetIsAuthActionType;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  setLogout: () => SetLogoutActionType;
  getTypes: () => void;
  getBrands: () => void;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    backgroundImage: "url('/images/logo3.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
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
  setAuth,
  setLogout,
  setIsAuth,
  getTypes,
  getBrands,
  setBrandId,
  setTypeId,
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
          <div style={{ flexGrow: 1 }}>
            <img src={Logo7} style={{ height: '100px', width: 'auto' }} />
          </div>

          {/* <Box py={{ xs: 12, sm: 7 }} className={classes.title}></Box> */}

          {isAuth && auth.role === 'ADMIN' && <MenuAdmin />}
          {isAuth ? (
            <>
              <IconButton color="inherit">
                <Badge badgeContent={3} color="secondary">
                  <ShoppingCartOutlinedIcon
                    style={{ fontSize: '35px', color: 'black' }}
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
})(Header);
