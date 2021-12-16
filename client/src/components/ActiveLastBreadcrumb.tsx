import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
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
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        Главная
      </Link>

      <Link
        color="textPrimary"
        href="/components/breadcrumbs/"
        onClick={(e) => e.preventDefault()}
        aria-current="page"
      >
        {name}
      </Link>
    </Breadcrumbs>
  );
};
export default ActiveLastBreadcrumb;
