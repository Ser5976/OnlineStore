import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Container, Button } from '@material-ui/core';
import { getSelectedDevice } from '../action/deviceAction';
import { DeviceType, InfoType } from '../store/reducer/deviceReducer';
import ImageList from '../components/ImageList';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { addProductCart, ProductType } from '../action/basketAction';
import CustomizedSnackbars from '../components/CustomizedSnackbar';
import { useHistory, useLocation } from 'react-router-dom';
import { SetPathActionType, setPath } from '../store/reducer/authReducer';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  selectedDevice: DeviceType;
  isLoadinSelectedDevice: boolean;
  isFetchErrorSelectedDevice: boolean;
  isAuth: boolean;
  errorBasket: boolean;
};
type MapDispathPropsType = {
  getSelectedDevice: (id: string) => void;
  addProductCart: (product: ProductType) => void;
  setPath: (value: string) => SetPathActionType;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
type ParamsType = {
  id: string;
};
//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    marginTop: 15,
  },
  grid_container: {
    marginTop: 25,
  },
  name: {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
    marginTop: 35,
  },
  listImage: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'auto',
    marginTop: 5,
    padding: 5,
  },
  image: {
    height: 50,
    width: 'auto',
    margin: 5,
    cursor: 'pointer',
  },
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
  },
  textTitle: {
    marginTop: '25px',
  },
}));

const ProfileDevice: React.FC<PropsType> = ({
  getSelectedDevice, // запрос на выбранный товар
  addProductCart, // добавить товар в корзину
  setPath, //запись пути последнего клика
  isAuth, //маркер авторизации
  errorBasket, //ошибка при добалении товара в корзину
  selectedDevice, // выбранный товар
  isFetchErrorSelectedDevice, //ошибка
  isLoadinSelectedDevice, //крутилка
}) => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const classes = useStyles();
  //для алерта,который показывает результат добавления товара в корзину
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  //  хук роутера ,который помогает получить значение params
  const { id } = useParams<ParamsType>();
  // console.log(selectedDevice);

  //получаем выбранный товар
  useEffect(() => {
    getSelectedDevice(id);
    // eslint-disable-next-line
  }, []);
  const { name, picture, price, info, description, _id } = selectedDevice;

  // добавление товара в корзину(если ошибка - показываем алерт ошибки,если неавторизирован-авторизация,если всё норм-алерт норм)
  const addToCart = () => {
    if (errorBasket) {
      handleClick(); //запускаем алерт,что есть ошибка
    } else if (isAuth) {
      const product: ProductType = {
        name,
        picture,
        price,
        description,
        id: _id,
      };
      addProductCart(product); // передаем объек товара в базу корзины
      handleClick(); // запускаем алерт,что всё прошло хорошо
    } else {
      history.push('/login');
    }
  };

  let params: InfoType[];
  info ? (params = [...info]) : (params = []);
  //console.log(params[0]);
  let image: string[];
  picture ? (image = [...picture]) : (image = []);
  return (
    <Container maxWidth="lg">
      <Box className={classes.breadcrumb}>
        <ActiveLastBreadcrumb name={name} />
      </Box>

      {isFetchErrorSelectedDevice ? (
        <Typography align="center" color="error" className={classes.textTitle}>
          Что-то пошло не так!
        </Typography>
      ) : isLoadinSelectedDevice ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: window.innerHeight - 65.6 }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography className={classes.name} variant="h3">
            {name}
          </Typography>
          <Grid container spacing={2} className={classes.grid_container}>
            <Grid item xs={12} sm={6}>
              <ImageList image={image} />
              <Typography
                variant="h5"
                component="h6"
                align="center"
                className={classes.bold}
              >
                Цена: {price} p
              </Typography>
              <Grid container spacing={2} style={{ marginTop: '25px' }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: 15, fontSize: 12 }}
                    onClick={() => {}}
                  >
                    Купить
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: 15, fontSize: 12 }}
                    onClick={() => {
                      addToCart();
                      setPath(location.pathname);
                    }}
                  >
                    Добавить в корзину
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              {params.length !== 0 ? (
                <>
                  <Typography variant="h5" component="h6" align="center">
                    Характеристики
                  </Typography>
                  {params.map((item: InfoType, index: number) => {
                    return (
                      <Typography style={{ marginLeft: '25px' }} key={index}>
                        <span className={classes.bold}>{item.title}</span>:
                        <span className={classes.italic}>
                          {' '}
                          {item.description}
                        </span>
                      </Typography>
                    );
                  })}
                </>
              ) : null}
            </Grid>
          </Grid>
        </>
      )}
      <CustomizedSnackbars
        setOpen={setOpen}
        open={open}
        errorBasket={errorBasket}
      />
    </Container>
  );
};

const mapStateToProps = ({
  devices,
  auth,
  basket,
}: RootStateType): MapStateToPropsType => {
  return {
    selectedDevice: devices.selectedDevice,
    isLoadinSelectedDevice: devices.isLoadinSelectedDevice,
    isFetchErrorSelectedDevice: devices.isFetchErrorSelectedDevice,
    isAuth: auth.isAuth,
    errorBasket: basket.errorBasket,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getSelectedDevice, addProductCart, setPath })(
  ProfileDevice
);
