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
import DeviceContainer from '../components/DeviceContainer';
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

import byk1 from '../img/byk1.jpg';
import planshet1 from '../img/planshet1.jpg';
import reclama1 from '../img/reclama1.jpg';
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
  name,
  devices,
  types,
  brands,
  pageQty,
  limit,
  typeId,
  brandId,
  isLoadinDevice,
  isFetchErrorDevice,
  isLoadinTypes,
  isFetchErrorTypes,
}) => {
  const classes = useStyles();
  const history = useHistory(); //для изменения строки запроса
  // console.log('история', history);
  const location = useLocation(); // для получения строки запроса
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
    getDevices(null, null, limit, page, name, setPage, history);
    // eslint-disable-next-line
  }, [page, name]);
  // запрос на сервак для получения типов устройств
  useEffect(() => {
    getTypes();
    // eslint-disable-next-line
  }, []);

  //console.log(devices);

  // console.log(info);
  // console.log('рендеринг');

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
                <DeviceContainer devices={devices} />
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
      </Container>
    </>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    devices: state.devices.devices, //устройства
    types: state.devices.types, //типы устройств
    brands: state.devices.brands, //брэнды устройств
    name: state.devices.name, // имя для поиска
    pageQty: state.devices.pageQty, //количества страниц
    limit: state.devices.limit, //сколько устройств на странице
    typeId: state.devices.typeId, // айдишник типа
    brandId: state.devices.brandId, // айдишник брэнда
    isLoadinDevice: state.devices.isLoadinDevice, //крутилка у стройств
    isLoadinTypes: state.devices.isLoadinTypes, //крутилка типов
    isFetchErrorDevice: state.devices.isFetchErrorDevice, //ошибка устройств
    isFetchErrorTypes: state.devices.isFetchErrorTypes, //ошибка типов
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
})(Content);
