import React from 'react';
import {
  Button,
  Typography,
  Divider,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { DeviceType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import { useHistory } from 'react-router-dom';

//типизация----------------------

type PropsType = {
  item: DeviceType; //типизация  выбранного устройства
  removeDevice: (id: string | undefined) => void; // типизация удаление устройства
};
//---------------------------------

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      padding: '15px 0px 0px 15px',
    },

    content: {
      flex: '1 0 auto',
    },

    media: {
      height: 100,
      cursor: 'pointer',
      marginRight: 10,
    },
    button: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '5px',
    },
  })
);

const DeleteDevice: React.FC<PropsType> = ({ item, removeDevice }) => {
  const { name, picture, price } = item;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <div className={classes.root}>
        <div
          className={classes.media}
          onClick={() => {
            history.push(`/profileDevice/${item._id}`);
          }}
        >
          <img
            src={`${ROOT_URL}/${picture[0]}`}
            style={{ height: '100px', width: 'auto' }}
          />
        </div>

        <div className={classes.content}>
          <Typography component="h5" variant="h5">
            {price} p
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {name}
          </Typography>
        </div>
      </div>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            removeDevice(item._id);
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
