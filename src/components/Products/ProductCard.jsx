import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteProduct } from '../../reducks/products/operations';


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
        margin: 8,
        width: 'calc(50% - 16px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)'
    }
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16
  }
}));

export default function ProductCard({image, name, price, id}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = (image.length > 0) && image
  const prices = price.toLocaleString()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={images[0].path}
          onClick={() => dispatch(push('/product/' + id))}
        />
        <CardContent className={classes.content}>
          <div>
            <Typography color="textSecondary" content="p">
              {name}
            </Typography>
            <Typography component="p" className={classes.price}>
              ¥{prices}
            </Typography>
          </div>
                  {/* menuバー */}
          <IconButton
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
              <MenuItem onClick={() => {
                  dispatch(push('/product/edit/' + id))
                  handleClose()
              }}>
                編集する
              </MenuItem>
              <MenuItem onClick={() => {
                  dispatch(deleteProduct(id))
                  handleClose()
              }}>
                削除する
              </MenuItem>
          </Menu>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}