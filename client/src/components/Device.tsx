import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DeviceType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutline } from '@material-ui/icons';
//типизация----------------------

type PropsType = {
  item: DeviceType;
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
});

const Device: React.FC<PropsType> = ({ item }) => {
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
      <CardHeader title={`${price} p`} subheader={name} />
    </Card>
  );
};

export default Device;
