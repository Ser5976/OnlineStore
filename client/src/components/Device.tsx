import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DeviceType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import { AuthReducerType } from '../store/reducer/authReducer';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutline } from '@material-ui/icons';
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
    maxWidth: 'auto',
    '&:hover': {
      boxShadow: '0 3px 10px rgb(0 0 0/0.2)',
    },
  },

  media: {
    height: 150,

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
    <Card elevation={0} className={classes.root}>
      <CardMedia
        children={
          <img
            src={`${ROOT_URL}/${picture[0]}`}
            style={{ height: '150px', width: 'auto' }}
          />
        }
        className={classes.media}
        title={name}
        onClick={() => {
          history.push(`/profileDevice/${item._id}`);
        }}
      />
      <CardHeader
        action={
          isAuth &&
          auth.role === 'ADMIN' && (
            <IconButton
              onClick={() => {
                removeDevice(item._id);
              }}
            >
              <DeleteOutline />
            </IconButton>
          )
        }
        title={`${price} p`}
        subheader={name}
      />
    </Card>
    /*  <div className={classes.root}>
      <img
        src={`${ROOT_URL}/${picture[0]}`}
        className={classes.media}
        onClick={() => {
          history.push(`/profileDevice/${item._id}`);
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
    </div> */
  );
};

export default Device;
