import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ROOT_URL } from '../constants/url';
import { Box } from '@material-ui/core';

//типизация----------------------

type PropsType = {
  image: string[];
};
//---------------------------------

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // overflow: 'auto',
    marginTop: 5,
    padding: 5,
  },
  imageBig: {
    height: 150,
    width: 'auto',
    '@media (min-width:600px)': {
      height: 250,
      width: 'auto',
    },
  },
  image: {
    height: 50,
    width: 'auto',
    margin: 5,
    cursor: 'pointer',
  },
}));

const LineImageList: React.FC<PropsType> = ({ image }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0); //для выбора картинки
  return (
    <Box>
      <img
        className={classes.imageBig}
        src={`${ROOT_URL}/${image[index]}`}
        alt="картинка"
      />
      <div className={classes.root}>
        {image.map((item, index) => (
          <img
            key={item}
            src={`${ROOT_URL}/${item}`}
            alt="картинка"
            className={classes.image}
            onClick={() => {
              setIndex(index);
            }}
          />
        ))}
      </div>
    </Box>
  );
};
export default LineImageList;
