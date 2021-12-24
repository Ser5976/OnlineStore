import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Button } from '@material-ui/core';
import { getSelectedDevice } from '../action/deviceAction';
import { DeviceType, InfoType } from '../store/reducer/deviceReducer';
import ImageList from '../components/ImageList';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  selectedDevice: DeviceType;
};
type MapDispathPropsType = {
  getSelectedDevice: (id: string) => void;
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
}));

const ProfileDevice: React.FC<PropsType> = ({
  getSelectedDevice,
  selectedDevice,
}) => {
  const classes = useStyles();
  const { id } = useParams<ParamsType>(); //  хук роутера ,который помогает получить значение params
  console.log(selectedDevice);
  useEffect(() => {
    getSelectedDevice(id);
    // eslint-disable-next-line
  }, []);
  const { name, picture, price, info } = selectedDevice;

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
                onClick={() => {}}
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
                    <span className={classes.italic}> {item.description}</span>
                  </Typography>
                );
              })}
            </>
          ) : null}
        </Grid>
      </Grid>
      <hr />
    </Container>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    selectedDevice: state.devices.selectedDevice,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getSelectedDevice })(ProfileDevice);
