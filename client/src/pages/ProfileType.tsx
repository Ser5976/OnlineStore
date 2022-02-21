import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box, Container } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation, useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import Device from '../components/Device';
import { SetPathActionType, setPath } from '../store/reducer/authReducer';
import { RootStateType } from '../store/store'; //типизиция всего стора

import {
  setTypeId, //запись выбранного типа устройства
  setBrandId, //запись выбранного  брэнда устройства
  setTypeIdActionType, // типизация экшенов
  setBrandIdActionType,
  DeviceType,
  TypeDeviceType,
} from '../store/reducer/deviceReducer';
import {
  getDevices, //запрос на получение устройств
  getSelectedType, //запрос на получение выбранного типа устройства
} from '../action/deviceAction';
import { addProductCart, ProductType } from '../action/basketAction';
import { setErrorBasket } from '../store/reducer/basketReducer';
import CustomizedSnackbars from '../components/CustomizedSnackbar';
import { useAlert } from '../hooks/alert.hooks'; //свой хук для алерта(показа сообщений об удалении и добавлении)
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  selectedType: TypeDeviceType;
  pageQty: number;
  limit: number;
  name: string | null;
  typeId: string | null;
  brandId: string | null;
  isLoadinDevice: boolean;
  isFetchErrorDevice: boolean;
  isLoadinSelectedType: boolean;
  isFetchErrorSelectedType: boolean;
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
  getSelectedType: (id: string) => void;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  addProductCart: (product: ProductType) => void;
  setPath: (value: string) => SetPathActionType;
  setErrorBasket: (data: null | string) => void;
};

type PropsType = MapDispathPropsType & MapStateToPropsType;
type ParamsType = {
  id: string;
};
//-----------------------------------------
const useStyles = makeStyles((theme) =>
  createStyles({
    breadcrumb: {
      margin: 15,
    },
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
      cursor: 'pointer',
    },

    root: {
      maxWidth: 'auto',
      '&:hover': {
        boxShadow: '0 3px 10px rgb(0 0 0/0.2)',
      },
      cursor: 'pointer',
    },
  })
);

const ProfileType: React.FC<PropsType> = ({
  getDevices,
  getSelectedType,
  setTypeId,
  setBrandId,
  addProductCart, //санка для добавления продукта в корзину
  setPath, //запись пути последнего клика
  setErrorBasket, //удаление ошибки добавления в корзину из стейта
  devices,
  selectedType,
  pageQty,
  name,
  limit,
  typeId,
  brandId,
  isLoadinDevice,
  isFetchErrorDevice,
  isLoadinSelectedType,
  isFetchErrorSelectedType,
  isAuth,
  errorBasket,
}) => {
  const classes = useStyles();
  const { id } = useParams<ParamsType>(); //  хук роутера ,который помогает получить значение params(это выбранный typeId)

  const history = useHistory(); //для изменения строки запроса
  const location = useLocation(); // для получения строки запроса
  const searchPage = parseInt(location.search?.split('=')[1] || '1'); // получаем число страницы из строки запроса
  //console.log(search);
  // пагинация, данные о текущей странице( по умолчанию: 1 или, если есть ,информация о текущей странице в адресной строке )
  const [page, setPage] = useState(searchPage);
  // изменения текущей страницы
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //костыль,чтобы синхронизировать пагинацию и строку запроса
  useEffect(() => {
    console.log('костыль');
    if (history.action === 'POP') {
      setPage(searchPage);
    }
    // eslint-disable-next-line
  }, [searchPage]);

  // запрос на сервак для получения выбранного типа с брэндами
  useEffect(() => {
    getSelectedType(id);
    setTypeId(id);
    setBrandId(null);
    console.log('id:', id);
    // eslint-disable-next-line
  }, [id]);

  // запрос на сервак для получения устройств(фильтруем устройства по типу и бренду,а также пагинация)
  useEffect(() => {
    // setPage(searchPage); //костыль,чтобы синхронизировать пагинацию и строку запроса
    getDevices(typeId, brandId, limit, page, name, setPage, history);

    // eslint-disable-next-line
  }, [typeId, brandId, page, name]);

  //удаление выбранного брэнда
  const removeBrand = () => {
    setBrandId(null);
  };
  //===для алерта,который показывает результат добавления товара в корзину===
  /* const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  }; */
  const { show, showAlert, setShow } = useAlert();
  const successMessage = 'Товар добавлен в корзину!';
  //=============================================================================

  return (
    <>
      <Box className={classes.breadcrumb}>
        <ActiveLastBreadcrumb name={selectedType.name} />
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} sm={3}>
            <Typography style={{ marginTop: '115px', fontWeight: 'bold' }}>
              {' '}
              Производители
            </Typography>
            {isFetchErrorSelectedType ? (
              <Typography
                align="center"
                color="error"
                style={{ marginTop: '25px' }}
              >
                Что-то пошло не так!
              </Typography>
            ) : isLoadinSelectedType ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: window.innerHeight - 65.6 }}
              >
                <CircularProgress />
              </Box>
            ) : selectedType.brands.length === 0 ? (
              <Typography align="center" style={{ margin: '100px' }}>
                Пока производителей нет!
              </Typography>
            ) : (
              <List component="nav">
                {selectedType.brands &&
                  selectedType.brands.map((brand) => {
                    return (
                      <div key={brand._id}>
                        <ListItem button onClick={() => setBrandId(brand._id)}>
                          <ListItemText primary={brand.name} />
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
              </List>
            )}
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography
              variant="h6"
              className={classes.textTitle}
              onClick={removeBrand}
            >
              {selectedType.name}
            </Typography>
            <Divider />
            {isFetchErrorDevice ? (
              <Typography
                align="center"
                color="error"
                style={{ marginTop: '25px' }}
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
              <Typography align="center" style={{ margin: '100px' }}>
                Пока товаров нет!
              </Typography>
            ) : (
              <Box style={{ display: 'flex', flexDirection: 'column' }}>
                {devices &&
                  devices.map((item) => {
                    return (
                      <Device
                        item={item}
                        key={Math.random()}
                        addProductCart={addProductCart}
                        isAuth={isAuth}
                        showAlert={showAlert}
                        setPath={setPath}
                        path={location.pathname}
                      />
                    );
                  })}
              </Box>
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
                to={`/profileType/${id}?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        <CustomizedSnackbars
          setOpen={setShow}
          setDeleteError={setErrorBasket}
          open={show}
          mistake={errorBasket}
          errorMessage={errorBasket}
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
    name: devices.name, // имя для поиска
    selectedType: devices.selectedType, //выбранный тип устройства
    pageQty: devices.pageQty, //количества страниц
    limit: devices.limit, //сколько устройств на странице
    typeId: devices.typeId, // айдишник типа
    brandId: devices.brandId, // айдишник брэнда
    isLoadinDevice: devices.isLoadinDevice, //крутилка у стройств
    isLoadinSelectedType: devices.isLoadinSelectedType, //крутилка типов
    isFetchErrorDevice: devices.isFetchErrorDevice, //ошибка устройств
    isFetchErrorSelectedType: devices.isFetchErrorSelectedType, //ошибка типов
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
  getSelectedType,
  setTypeId,
  setBrandId,
  addProductCart,
  setPath,
  setErrorBasket,
})(ProfileType);
