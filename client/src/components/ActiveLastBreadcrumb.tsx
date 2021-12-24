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
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
};
//---------------------------------

const ActiveLastBreadcrumb: React.FC<PropsType> = ({
  name,
  setTypeId,
  setBrandId,
}) => {
  const history = useHistory();
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTypeId(null); //обнуление типа.Это для того, чтобы правильно отрабатывала главная страница без перезагрузки
    setBrandId(null); //обнуление брэнда.
    history.push('/');
  }
  console.log(name);
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
