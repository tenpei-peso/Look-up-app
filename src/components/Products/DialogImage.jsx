import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function DialogImage({selected}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageList key="Subheader" cols={2} style={{ height: 'auto' }}>
          {/* <ListSubheader component="div" style={{ fontSize: '15px' }}>{'Shop Name'}</ListSubheader>
          <ListSubheader component="div" style={{ fontSize: '40px' }}>{selected.name}</ListSubheader> */}
        </ImageList>
        {selected.products.map((item) => (
          <ImageListItem key={item.images[0].id}>
            <img src={item.images[0].path} alt={item.name} />
            <ImageListItemBar
              title={item.name}
              actionIcon={
                <IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}