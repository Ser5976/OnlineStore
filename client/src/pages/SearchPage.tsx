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
import FoundDevice from '../components/FoundDevice';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
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
  getDevices,
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
    console.log('рендеринг');
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

  return (
    <>
      <Box style={{ margin: '25px' }}>
        <ActiveLastBreadcrumb name="Результат поиска" />
      </Box>
      <Container maxWidth="sm">
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
                  return <FoundDevice item={item} key={Math.random()} />;
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
      </Container>
    </>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    devices: state.devices.devices, //устройства
    isLoadinDevice: state.devices.isLoadinDevice, //крутилка у стройств
    isFetchErrorDevice: state.devices.isFetchErrorDevice, //ошибка устройств
    name: state.devices.name, //имя для поиска
    pageQty: state.devices.pageQty, //количества страниц
    limit: state.devices.limit, //сколько устройств на странице
    typeId: state.devices.typeId, // айдишник типа
    brandId: state.devices.brandId, // айдишник брэнда
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, { getDevices })(DeleteContainer);
