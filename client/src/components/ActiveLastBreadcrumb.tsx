import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {
  setTypeIdActionType,
  setBrandIdActionType,
} from '../store/reducer/deviceReducer'; // типизация экшенов
import { useHistory } from 'react-router-dom';

//типизация----------------------

type PropsType = {
  name: string;
};
//---------------------------------

const ActiveLastBreadcrumb: React.FC<PropsType> = ({ name }) => {
  const history = useHistory();
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    history.push('/');
  }
  // console.log(name);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        Главная
      </Link>
      <Typography color="textPrimary">{name}</Typography>
    </Breadcrumbs>
  );
};
export default ActiveLastBreadcrumb;
