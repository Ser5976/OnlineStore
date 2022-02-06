import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootStateType } from '../store/store'; //типизиция всего стора
import { DeviceType } from '../store/reducer/deviceReducer'; //типизация данных
import {
  getDevices, //запрос на получение устройств
} from '../action/deviceAction';
import Device from '../components/Device';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { addProductCart, ProductType } from '../action/basketAction';
import { SetPathActionType, setPath } from '../store/reducer/authReducer';
import CustomizedSnackbars from '../components/CustomizedSnackbar';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  name: string | null;
  pageQty: number;
  limit: number;
  typeId: string | null;
  brandId: string | null;
  isLoadinDevice: boolean;
  isFetchErrorDevice: boolean;
  isAuth: boolean;
  errorBasket: boolean;
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
  addProductCart: (product: ProductType) => void;
  setPath: (value: string) => SetPathActionType;
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
      marginTop: '50px',
      marginBottom: '50px',
    },
  })
);

const DeleteContainer: React.FC<PropsType> = ({
  devices,
  name,
  pageQty,
  limit,
  typeId,
  brandId,
  isLoadinDevice,
  isFetchErrorDevice,
  isAuth,
  errorBasket,
  getDevices,
  addProductCart, //санка добавление продукта в корзину
  setPath, //запись пути последнего клика
}) => {
  const classes = useStyles();
  const history = useHistory(); //для изменения строки запроса
  const location = useLocation(); // для получения строки запроса
  const searchPage = parseInt(location.search?.split('=')[1] || '1'); // получаем номер страницы из строки запроса
  // console.log(searchPage);
  // пагинация, данные о текущей странице( по умолчанию: 1 или, если есть ,информация о текущей странице в адресной строке )
  const [page, setPage] = useState(searchPage);
  // console.log('номер страницы:', page);
  // изменения текущей страницы
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //костыль,чтобы синхронизировать пагинацию и иторию строки запроса(назад, вперёд)
  useEffect(() => {
    if (history.action === 'POP') {
      setPage(searchPage);
    }
    // eslint-disable-next-line
  }, [searchPage]);

  // запрос на сервак для получения устройств(фильтруем устройства по типу и бренду,а также пагинация,поиск)

  useEffect(() => {
    getDevices(
      typeId,
      brandId,
      limit,
      page,
      name ? name : sessionStorage.getItem('name'),
      setPage,
      history
    );
    // eslint-disable-next-line
  }, [typeId, brandId, page, name]);
  //для алерта,который показывает результат добавления товара в корзину
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Box style={{ margin: '25px' }}>
        <ActiveLastBreadcrumb name="Результат поиска" />
      </Box>
      <Container maxWidth="md">
        <Typography component="h1" variant="h5" align="center">
          Результат поиска
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
            Ничего не найдено!
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
                      errorBasket={errorBasket}
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
                to={`searchPage?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        <CustomizedSnackbars
          setOpen={setOpen}
          open={open}
          errorBasket={errorBasket}
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
    isLoadinDevice: devices.isLoadinDevice, //крутилка у стройств
    isFetchErrorDevice: devices.isFetchErrorDevice, //ошибка устройств
    name: devices.name, //имя для поиска
    pageQty: devices.pageQty, //количества страниц
    limit: devices.limit, //сколько устройств на странице
    typeId: devices.typeId, // айдишник типа
    brandId: devices.brandId, // айдишник брэнда
    isAuth: auth.isAuth, //маркер авторизации
    errorBasket: basket.errorBasket, //ошибка добавления товара в корзину
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, { getDevices, addProductCart, setPath })(DeleteContainer);
