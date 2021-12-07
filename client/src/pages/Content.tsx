import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import TypeBar from '../components/TypeBar';
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
import { DeviceType, TypeDeviceType } from '../store/reducer/deviceReducer'; //типизация данных
import { getDevices, getTypes } from '../action/deviceAction'; //запрос на получение устройств  и типов устройств
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  types: TypeDeviceType[];
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
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
    grid: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
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
  devices,
  types,
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
  const searchPage = useLocation(); // для получения строки запроса
  const history = useHistory(); //для изменения строки запроса
  //console.log(search);
  // пагинация, данные о текущей странице( по умолчанию: 1 или, если есть ,информация о текущей странице в адресной строке )
  const [page, setPage] = useState(
    parseInt(searchPage.search?.split('=')[1] || '1')
  );
  // изменения текущей страницы
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // запрос на сервак для получения устройств(фильтруем устройства по типу и бренду,а также пагинация)
  useEffect(() => {
    getDevices(typeId, brandId, limit, page, setPage, history);
    // eslint-disable-next-line
  }, [typeId, brandId, page]);
  // запрос на сервак для получения типов устройств
  useEffect(() => {
    getTypes();
    // eslint-disable-next-line
  }, []);

  console.log(devices);
  // const { name, picture, price, info } = devices[1];
  // console.log(info);
  return (
    <Grid item container>
      <Grid item xs={12} sm={2} className={classes.grid}>
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
            Пока типов товаров нет!
          </Typography>
        ) : (
          <TypeBar
            types={types}
            setTypeId={setTypeId}
            setBrandId={setBrandId}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={10}>
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
            {!!pageQty && (
              <Pagination
                className={classes.root}
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
          </>
        )}
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    devices: state.devices.devices, //устройства
    types: state.devices.types, //типы устройств
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
