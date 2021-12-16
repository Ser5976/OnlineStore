import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DeviceType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import { AuthReducerType } from '../store/reducer/authReducer';
import { useHistory } from 'react-router-dom';

//типизация----------------------

type PropsType = {
  item: DeviceType;
  auth: AuthReducerType;
  isAuth: boolean;
  removeDevice: (id: string | undefined) => void;
};
//---------------------------------

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 100,
    width: 'auto',
    padding: 15,
    cursor: 'pointer',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const Device: React.FC<PropsType> = ({ item, auth, isAuth, removeDevice }) => {
  const { name, picture, price } = item;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <img
        src={`${ROOT_URL}/${picture[0]}`}
        className={classes.media}
        onClick={() => {
          history.push(`/profile/${item._id}`);
        }}
      />

      <Typography gutterBottom variant="h6" component="div">
        {price} p
      </Typography>
      <Typography variant="body2" color="textSecondary" component="div">
        {name}
      </Typography>

      <div className={classes.cardActions}>
        <Button size="small" color="primary">
          Купить
        </Button>
        {isAuth && auth.role === 'ADMIN' && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              removeDevice(item._id);
            }}
          >
            Удалить
          </Button>
        )}
      </div>
    </div>
  );
};

export default Device;
