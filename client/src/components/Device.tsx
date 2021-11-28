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

//типизация----------------------

type PropsType = {
  item: DeviceType;
};
//---------------------------------

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Device: React.FC<PropsType> = ({ item }) => {
  const { name, picture, price } = item;
  const classes = useStyles();

  return (
    <Card className={classes.root} raised={false}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${ROOT_URL}/${picture[0]}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Купить
        </Button>
      </CardActions>
    </Card>
  );
};

export default Device;
