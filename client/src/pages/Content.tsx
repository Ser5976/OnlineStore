import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Divider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import TypeBar from '../components/TypeBar';
import ImageContainer from '../components/ImageContainer';
import Device from '../components/Device';
import { RootStateType } from '../store/store'; //типизиция всего стора
import {
  setTypeId, //запись выбранного типа устройства
  setBrandId, //запись выбранного  брэнда устройства
} from '../store/reducer/deviceReducer';
import {
  setTypeIdActionType,
  setBrandIdActionType,
} from '../store/reducer/deviceReducer'; // типизация экшенов
import {
  DeviceType,
  TypeDeviceType,
  BrandType,
} from '../store/reducer/deviceReducer'; //типизация данных
import {
  getDevices, //запрос на получение устройств
  getTypes, //запрос на получение типов
} from '../action/deviceAction';
import { SetPathActionType, setPath } from '../store/reducer/authReducer';
import { addProductCart, ProductType } from '../action/basketAction'; //санка добавления товара в корзину и типизация товара
import byk1 from '../img/byk1.jpg';
import planshet1 from '../img/planshet1.jpg';
import reclama1 from '../img/reclama1.jpg';
import CustomizedSnackbars from '../components/CustomizedSnackbar';
import { setErrorBasket } from '../store/reducer/basketReducer';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  types: TypeDeviceType[];
  name: string | null;
  brands: BrandType[];
  pageQty: number;
  limit: number;
  typeId: string | null;
  brandId: string | null;
  isLoadinDevice: boolean;
  isFetchErrorDevice: boolean;
  isLoadinTypes: boolean;
  isFetchErrorTypes: boolean;
  isAuth: boolean;
  errorBasket: null | string;
};
type MapDispathPropsType = {
  getDevices: (
    typeId: string | null,
    brandId: string | null,
    limit: number,
    page: number,
    name: string | null,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    history: any
  ) => void;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  addProductCart: (product: ProductType) => void;
  setPath: (value: string) => SetPathActionType;
  setErrorBasket: (data: null | string) => void;
};

type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------
const useStyles = makeStyles((theme) =>
  createStyles({
    pagination: {
      '& > *': {
        marginTop: theme.spacing(7),
      },
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: theme.spacing(7),
    },
    textTitle: {
      marginTop: '25px',
    },
  })
);

const Content: React.FC<PropsType> = ({
  getDevices,
  setTypeId,
  setBrandId,
  addProductCart, //добавление товара в корзину
  setPath, //запись пути последнего клика
  setErrorBasket, //удаление ошибки добавления в корзину из стейта
  name,
  devices,
  types,
  pageQty,
  limit,
  isLoadinDevice,
  isFetchErrorDevice,
  isLoadinTypes,
  isFetchErrorTypes,
  isAuth,
  errorBasket,
}) => {
  const classes = useStyles();
  const history = useHistory(); //для изменения строки запроса
  // console.log('история', history);
  const location = useLocation(); // для получения строки запроса
  console.log(location.pathname);
  const searchPage = parseInt(location.search?.split('=')[1] || '1'); // получаем число страницы из строки запроса
  // console.log(searchPage);
  // пагинация, данные о текущей странице( по умолчанию: 1 или, если есть ,информация о текущей странице в адресной строке )

  const [page, setPage] = useState(searchPage);

  // console.log('номер страницы:', page);
  // изменения текущей страницы
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //костыль,чтобы синхронизировать пагинацию и строку запроса
  useEffect(() => {
    if (history.action === 'POP') {
      setPage(searchPage);
    }
    // eslint-disable-next-line
  }, [searchPage]);

  // запрос на сервак для получения устройств(фильтруем устройства по типу и бренду,а также пагинация)
  useEffect(() => {
    // console.log('рендеринг');
    getDevices(null, null, limit, page, null, setPage, history);
    // eslint-disable-next-line
  }, [page, name]);
  // запрос на сервак для получения типов устройств
  useEffect(() => {
    getTypes();
    // eslint-disable-next-line
  }, []);
  //===для алерта,который показывает результат добавления товара в корзину===
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const errorMessage = errorBasket;
  const successMessage = 'Товар добавлен в корзину!';
  //=============================================================================
  return (
    <>
      <ImageContainer />
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} sm={3}>
            <Typography style={{ marginTop: '115px', fontWeight: 'bold' }}>
              {' '}
              Каталог товаров
            </Typography>
            {isFetchErrorTypes ? (
              <Typography
                align="center"
                color="error"
                className={classes.textTitle}
              >
                Что-то пошло не так!
              </Typography>
            ) : isLoadinTypes ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: window.innerHeight - 65.6 }}
              >
                <CircularProgress />
              </Box>
            ) : types.length === 0 ? (
              <Typography align="center" className={classes.textTitle}>
                Пока каталог пуст !
              </Typography>
            ) : (
              <TypeBar
                types={types}
                setTypeId={setTypeId}
                setBrandId={setBrandId}
              />
            )}
            <div style={{ marginBottom: '25px' }}>
              <img
                src={reclama1}
                style={{ height: '200px', width: 'auto', marginTop: '25px' }}
              />
              <img
                src={planshet1}
                style={{ height: '205px', width: 'auto', marginTop: '25px' }}
              />
              <img
                src={byk1}
                style={{ height: '205px', width: 'auto', marginTop: '25px' }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h6" style={{ marginTop: '50px' }}>
              {' '}
              Все товары
            </Typography>
            <Divider />
            {isFetchErrorDevice ? (
              <Typography
                align="center"
                color="error"
                className={classes.textTitle}
              >
                Что-то пошло не так!
              </Typography>
            ) : isLoadinDevice ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: window.innerHeight - 65.6 }}
              >
                <CircularProgress />
              </Box>
            ) : devices.length === 0 ? (
              <Typography align="center" className={classes.textTitle}>
                Пока товаров нет!
              </Typography>
            ) : (
              <>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  {devices &&
                    devices.map((item) => {
                      return (
                        <Device
                          item={item}
                          key={Math.random()}
                          addProductCart={addProductCart}
                          isAuth={isAuth}
                          handleClick={handleClick}
                          setPath={setPath}
                          path={location.pathname}
                        />
                      );
                    })}
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        {!!pageQty && (
          <Pagination
            className={classes.pagination}
            count={pageQty}
            page={page}
            showFirstButton
            showLastButton
            onChange={handleChange}
            // интегрируем роутер
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        <CustomizedSnackbars
          setOpen={setOpen}
          setDeleteError={setErrorBasket}
          open={open}
          mistake={errorBasket}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </Container>
    </>
  );
};
const mapStateToProps = ({
  devices,
  auth,
  basket,
}: RootStateType): MapStateToPropsType => {
  return {
    devices: devices.devices, //устройства
    types: devices.types, //типы устройств
    brands: devices.brands, //брэнды устройств
    name: devices.name, // имя товара, для поиска
    pageQty: devices.pageQty, //количества страниц
    limit: devices.limit, //сколько устройств на странице
    typeId: devices.typeId, // айдишник типа
    brandId: devices.brandId, // айдишник брэнда
    isLoadinDevice: devices.isLoadinDevice, //крутилка у стройств
    isLoadinTypes: devices.isLoadinTypes, //крутилка типов
    isFetchErrorDevice: devices.isFetchErrorDevice, //ошибка устройств
    isFetchErrorTypes: devices.isFetchErrorTypes, //ошибка типов
    isAuth: auth.isAuth, //маркер авторизации
    errorBasket: basket.errorBasket, //ошибка добавления товара в корзину
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  getDevices,
  setTypeId,
  setBrandId,
  addProductCart,
  setPath,
  setErrorBasket,
})(Content);
