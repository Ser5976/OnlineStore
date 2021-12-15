import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    padding: 25,
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
    <Card className={classes.root} raised={false}>
      <CardActionArea
        onClick={() => {
          history.push(`/profile/${item._id}`);
        }}
      >
        <img src={`${ROOT_URL}/${picture[0]}`} className={classes.media} />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {price}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
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
      </CardActions>
    </Card>
  );
};

export default Device;
