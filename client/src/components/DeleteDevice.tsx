import React from 'react';
import {
  Button,
  Typography,
  Divider,
  createStyles,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { DeviceType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import { useHistory } from 'react-router-dom';

//типизация----------------------

type PropsType = {
  item: DeviceType; //типизация  выбранного устройства
  removeDevice: (
    id: string | undefined,
    showAlert: () => void,
    setRemoteDevice: React.Dispatch<React.SetStateAction<string>>,
    name: string
  ) => void; // типизация удаление устройства
  showAlert: () => void;
  setRemoteDevice: React.Dispatch<React.SetStateAction<string>>;
};
//---------------------------------

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '5px',
    },

    root: {
      padding: 25,
    },

    media: {
      height: 100,
      cursor: 'pointer',
      paddingTop: 50,
    },
  })
);

const DeleteDevice: React.FC<PropsType> = ({
  item, //устройство
  removeDevice, //удаление устройства
  showAlert, // показывает алерт,результат удаления
  setRemoteDevice, // записывает в локальный стейт name(устройства) удалённого товара
}) => {
  const { name, picture, price } = item;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid
          item
          md={3}
          className={classes.media}
          onClick={() => {
            history.push(`/profileDevice/${item._id}`);
          }}
        >
          <img
            src={`${ROOT_URL}/${picture[0]}`}
            style={{ height: '100px', width: 'auto' }}
          />
        </Grid>

        <Grid item md={8}>
          <Typography component="h5" variant="h5">
            {price} p
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ wordWrap: 'break-word' }}
          >
            {name}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (
              window.confirm(`Вы действительно хотите удалить ${item.name}`)
            ) {
              removeDevice(item._id, showAlert, setRemoteDevice, item.name);
            }
          }}
        >
          Удалить
        </Button>
      </div>

      <Divider />
    </div>
  );
};

export default DeleteDevice;
