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

import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import TypeBarDelete from '../components/TypeBarDelete';
import CustomizedSnackbars from '../components/CustomizedSnackbar';
import { useAlert } from '../hooks/alert.hooks'; //свой хук для алерта(показа сообщений об удалении и добавлении)
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  types: TypeDeviceType[];
  brands: BrandType[];
  name: string | null;
  pageQty: number;
  limit: number;
  typeId: string | null;
  brandId: string | null;
  isLoadinDevice: boolean;
  isFetchErrorDevice: boolean;
  isLoadinTypes: boolean;
  isFetchErrorTypes: boolean;
  isFetchErrorBrands: boolean;
  alertMessage: null | string;
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
  removeDevice: (
    id: string | undefined,
    showAlert: () => void,
    setRemoteDevice: React.Dispatch<React.SetStateAction<string>>,
    name: string
  ) => void;
  removeType: (id: string, showAlert: () => void) => void;
  removeBrand: (id: string, showAlert: () => void) => void;
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
  name,
  pageQty,
  limit,
  typeId,
  brandId,
  isLoadinDevice,
  isFetchErrorDevice,
  isLoadinTypes,
  isFetchErrorTypes,
  isFetchErrorBrands,
  alertMessage,
}) => {
  const classes = useStyles();
  const history = useHistory(); //для изменения строки запроса
  const location = useLocation(); // для получения строки запроса
  // console.log('история:', history.location);
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

  //название удалённого товара добавляем в локальный стейт,чтобы добавить в зависимость для получения устройств
  const [remoteDevice, setRemoteDevice] = useState('');

  // запрос на сервак для получения устройств(фильтруем устройства по типу и бренду,а также пагинация)
  useEffect(() => {
    // console.log('рендеринг');
    getDevices(typeId, brandId, limit, page, name, setPage, history);
    // eslint-disable-next-line
  }, [typeId, brandId, page, name, remoteDevice]);
  // запрос на сервак для получения типов устройств
  useEffect(() => {
    getTypes();
    // eslint-disable-next-line
  }, []);
  //console.log(devices);
  // для изменения категории(все товары,планшеты и т.д...)
  const [category, setCategory] = useState('Все товары');

  //===для алерта,который показывает результат удаления===
  const { show, showAlert, setShow } = useAlert();
  //=============================================================================

  return (
    <>
      <Box style={{ margin: '25px' }}>
        <ActiveLastBreadcrumb name="Удалить  товар" />
      </Box>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h5" align="center">
          Удалить товар
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={4}>
            <Typography
              style={{
                marginTop: '115px',
                fontWeight: 'bold',
                padding: '0px 16px',
              }}
            >
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
                isFetchErrorBrands={isFetchErrorBrands}
                showAlert={showAlert}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" style={{ marginTop: '50px' }}>
              {' '}
              {name ? 'результаты поиска' : category}
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
                          setRemoteDevice={setRemoteDevice}
                          showAlert={showAlert}
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
      <CustomizedSnackbars
        setOpen={setShow}
        setDeleteError={setAlertMessage}
        open={show}
        mistake={alertMessage}
        errorMessage={alertMessage}
        successMessage="Удаление произошло успешно"
      />
    </>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    devices: state.devices.devices, //устройства
    types: state.devices.types, //типы устройств
    brands: state.devices.brands, //брэнды устройств
    name: state.devices.name, //имя для поиска товара(поиск товара по названию)
    pageQty: state.devices.pageQty, //количества страниц
    limit: state.devices.limit, //сколько устройств на странице
    typeId: state.devices.typeId, // айдишник типа
    brandId: state.devices.brandId, // айдишник брэнда
    isLoadinDevice: state.devices.isLoadinDevice, //крутилка у стройств
    isLoadinTypes: state.devices.isLoadinTypes, //крутилка типов
    isFetchErrorDevice: state.devices.isFetchErrorDevice, //ошибка устройств
    isFetchErrorTypes: state.devices.isFetchErrorTypes, //ошибка типов
    isFetchErrorBrands: state.devices.isFetchErrorBrands, //ошибка загрузки брэндов
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
