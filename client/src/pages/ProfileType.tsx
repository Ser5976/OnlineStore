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
import { ROOT_URL } from '../constants/url';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { RootStateType } from '../store/store'; //типизиция всего стора

import {
  setTypeId, //запись выбранного типа устройства
  setBrandId, //запись выбранного  брэнда устройства
  setTypeIdActionType, // типизация экшенов
  setBrandIdActionType,
  DeviceType,
  TypeDeviceType,
  BrandType, //типизация данных
} from '../store/reducer/deviceReducer';
import {
  getDevices, //запрос на получение устройств
  getSelectedType, //запрос на получение выбранного типа устройства
} from '../action/deviceAction';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  devices: DeviceType[];
  selectedType: TypeDeviceType;
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
  getSelectedType: (id: string) => void;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
};

type PropsType = MapDispathPropsType & MapStateToPropsType;
type ParamsType = {
  id: string;
};
//-----------------------------------------
const useStyles = makeStyles((theme) =>
  createStyles({
    breadcrumb: {
      marginTop: 15,
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
      margin: '25px',
      cursor: 'pointer',
    },

    root: {
      maxWidth: 'auto',
    },
    media: {
      height: 200,
      width: 'auto',
      padding: 15,
      cursor: 'pointer',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

const ProfileType: React.FC<PropsType> = ({
  getDevices,
  getSelectedType,
  setTypeId,
  setBrandId,
  devices,
  selectedType,
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
  const { id } = useParams<ParamsType>(); //  хук роутера ,который помогает получить значение params(это выбранный typeId)
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
  // запрос на сервак для получения выбранного типа с брэндами
  useEffect(() => {
    getSelectedType(id);
    setTypeId(id);
    // eslint-disable-next-line
  }, [id]);
  //удаление выбранного брэнда
  const removeBrand = () => {
    setBrandId(null);
  };

  console.log(selectedType);

  return (
    <>
      <Container maxWidth="lg">
        <Box className={classes.breadcrumb}>
          <ActiveLastBreadcrumb
            name={selectedType.name}
            setTypeId={setTypeId}
            setBrandId={setBrandId}
          />
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          className={classes.textTitle}
          onClick={removeBrand}
        >
          {selectedType.name}
        </Typography>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h5">Производители</Typography>
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
          </Grid>

          <Grid item container xs={12} spacing={2} sm={9}>
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
              <Typography align="center" className={classes.textTitle}>
                Пока товаров нет!
              </Typography>
            ) : (
              <>
                {devices &&
                  devices.map((item) => {
                    return (
                      <Grid item xs={12} sm={4} key={item._id}>
                        <div className={classes.root}>
                          <img
                            src={`${ROOT_URL}/${item.picture[0]}`}
                            className={classes.media}
                            onClick={() => {
                              history.push(`/profileDevice/${item._id}`);
                            }}
                          />

                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            align="center"
                          >
                            {item.price} p
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </Grid>
                    );
                  })}
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
                to={`/profileType/${id}?page=${item.page}`}
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
    selectedType: state.devices.selectedType, //выбранный тип устройства
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
  getSelectedType,
  setTypeId,
  setBrandId,
})(ProfileType);

{
  /*
   <Grid item container xs={12} sm={9}>
            
   
{ devices&&devices.map((item) => {
              return (
                <Grid item xs={12} sm={4} key={item._id}>
                  <div className={classes.root}>
                    <img
                      src={`${ROOT_URL}/${item.picture[0]}`}
                      className={classes.media}
                      onClick={() => {
                        history.push(`/profileDevice/${item._id}`);
                      }}
                    />

                    <Typography gutterBottom variant="h6" component="div">
                      {item.price} p
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                    >
                      {item.name}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
         

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
      )} */
}
