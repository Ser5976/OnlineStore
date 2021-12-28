import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  Grid,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootStateType } from '../store/store'; //типизиция всего стора
import {
  setTypeId, //запись выбранного типа устройства
  setBrandId, //запись выбранного  брэнда устройства
  setAlertMessage, // изменения маркера получения сообщения о невозможности удаления типа/брэнда устройства
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
  removeDevice, //удаление устройства
  removeType, //удаление типа
  removeBrand, //удаление брэнда
} from '../action/deviceAction';
import DeleteDevice from '../components/DeleteDevice';
import AlertMessage from '../components/AlertMessage';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import TypeBarDelete from '../components/TypeBarDelete';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  types: TypeDeviceType[];
  brands: BrandType[];
  pageQty: number;
  limit: number;
  typeId: string | null;
  brandId: string | null;
  isLoadinDevice: boolean;
  isFetchErrorDevice: boolean;
  isLoadinTypes: boolean;
  isFetchErrorTypes: boolean;
  alertMessage: string | null;
};
type MapDispathPropsType = {
  getDevices: (
    typeId: string | null,
    brandId: string | null,
    limit: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    history: any
  ) => void;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  removeDevice: (id: string | undefined) => void;
  removeType: (id: string) => void;
  removeBrand: (id: string) => void;
  setAlertMessage: (data: string | null) => void;
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

const DeleteContainer: React.FC<PropsType> = ({
  getDevices,
  setTypeId,
  setBrandId,
  removeDevice,
  removeType,
  removeBrand,
  setAlertMessage,
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
  alertMessage,
}) => {
  const classes = useStyles();
  const history = useHistory(); //для изменения строки запроса
  //console.log('история', history);
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

  // запрос на сервак для получения устройств(фильтруем устройства по типу и бренду,а также пагинация)
  useEffect(() => {
    // console.log('рендеринг');
    getDevices(typeId, brandId, limit, page, setPage, history);
    // eslint-disable-next-line
  }, [typeId, brandId, page]);
  // запрос на сервак для получения типов устройств
  useEffect(() => {
    getTypes();
    // eslint-disable-next-line
  }, []);
  //console.log(devices);
  // для изменения категории(все товары,планшеты и т.д...)
  const [category, setCategory] = useState('Все товары');

  return (
    <>
      {alertMessage && (
        <AlertMessage
          setAlertMessage={setAlertMessage}
          alertMessage={alertMessage}
        />
      )}
      <Box style={{ margin: '25px' }}>
        <ActiveLastBreadcrumb name="Удалить  товар" />
      </Box>
      <Container maxWidth="md">
        <Typography component="h1" variant="h5" align="center">
          Удалить товар
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" style={{ marginTop: '115px' }}>
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
              <TypeBarDelete
                types={types}
                brands={brands}
                setTypeId={setTypeId}
                setBrandId={setBrandId}
                removeType={removeType}
                removeBrand={removeBrand}
                setCategory={setCategory}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" style={{ marginTop: '50px' }}>
              {' '}
              {category}
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
                        <DeleteDevice
                          removeDevice={removeDevice}
                          item={item}
                          key={Math.random()}
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
                to={`deleteContainer?page=${item.page}`}
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
    pageQty: state.devices.pageQty, //количества страниц
    limit: state.devices.limit, //сколько устройств на странице
    typeId: state.devices.typeId, // айдишник типа
    brandId: state.devices.brandId, // айдишник брэнда
    isLoadinDevice: state.devices.isLoadinDevice, //крутилка у стройств
    isLoadinTypes: state.devices.isLoadinTypes, //крутилка типов
    isFetchErrorDevice: state.devices.isFetchErrorDevice, //ошибка устройств
    isFetchErrorTypes: state.devices.isFetchErrorTypes, //ошибка типов
    alertMessage: state.devices.alertMessage, // маркер получения сообщения о невозможности удаления типа устройства
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
  removeDevice,
  removeType,
  removeBrand,
  setAlertMessage,
})(DeleteContainer);
