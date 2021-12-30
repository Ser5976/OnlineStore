import React, { useState } from 'react';
import {
  alpha,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { setNameActionType } from '../store/reducer/deviceReducer';

//типизация----------------------------------
type PropsType = {
  setName: (data: string) => setNameActionType;
};
//-------------------------------------------

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },

    /*  title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      }, 
    },*/
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginRight: 300,
      // marginLeft: 200,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'darck',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })
);

const SearchInput: React.FC<PropsType> = ({ setName }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  // извлекаем значение импута
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // записываем значение импута в стейт(после нажатия на кнопку энтер)
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== '') {
      setName(value);
      setValue('');
      console.log('Энтер:', value);
    }
  };

  return (
    <div className={classes.grow}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Название товара…"
          value={value}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={handleInput}
          onKeyPress={pressEnter} //событие на нажатия клавиатуры
          // inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  );
};

export default SearchInput;
