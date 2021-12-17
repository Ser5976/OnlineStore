import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Logout from './Logout';
import {
  setAuth, //записть авторизации в стор
  setIsAuth, // маркер авторизации
  setLogout, // выход из авторизации
  AuthReducerType, //типизация авторизации
  SetAuthActionType, // типизация экшена авторизации
  SetLogoutActionType, // типизация экшена выхода из авторизации
  SetIsAuthActionType, // типизация экшена маркера типизации
} from '../store/reducer/authReducer';
import { getBrands, getTypes } from '../action/deviceAction'; //запрос на получениe типов устройств
import { RootStateType } from '../store/store';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

//типизация--------------------------------
type MapStateToPropsType = { isAuth: boolean; auth: AuthReducerType };
type MapDispathPropsType = {
  setAuth: (value: AuthReducerType) => SetAuthActionType;
  setIsAuth: (value: boolean) => SetIsAuthActionType;
  setLogout: () => SetLogoutActionType;
  getTypes: () => void;
  getBrands: () => void;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    //fontStyle: 'italic',
    //fontWeight: 'bold',

    // fontSize: 30,
  },
  subTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    fontSize: 9,
    textAlign: 'center',
  },
  /* login: {
    ...theme.typography.button,
  }, */
}));

const Header: React.FC<PropsType> = ({
  auth,
  isAuth,
  setAuth,
  setLogout,
  setIsAuth,
  getTypes,
  getBrands,
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
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Box className={classes.title}>
          <img
            src="/images/logo2.png"
            style={{ height: '100px', width: 'auto' }}
          />
        </Box>
        {/*  <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            OnlineStore
            <div className={classes.subTitle}>Иртернет магазин</div>
          </Typography> */}

        {isAuth && auth.role === 'ADMIN' && (
          <Button
            color="inherit"
            onClick={() => {
              history.push('/addDevicesContainer');
            }}
          >
            Админ панель
          </Button>
        )}
        {isAuth ? (
          <>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <Logout setLogout={setLogout} />
          </>
        ) : (
          <Button color="inherit" onClick={() => history.push('/login')}>
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth, //  маркер авторизации
    auth: state.auth.auth, //авторизация для role
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, { setAuth, setLogout, setIsAuth, getTypes, getBrands })(
  Header
);
