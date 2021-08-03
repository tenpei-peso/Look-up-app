import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../firebase/index"

const useStyles = makeStyles((theme) => ({
    list: {
        height: 128
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
}))

function WishListItem(props) {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const uid = selector.users.uid

    const image = props.product.images[0].path
    const name = props.product.name
    const size = props.product.size
    const price = props.product.price;

    const removeProductFromWish = (id) => {
        return db.collection('users').doc(uid)
                .collection('wish').doc(id)
                .delete()
    }

    return (
        <>
            <ListItem className={classes.list}>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt="商品画像"/>
                </ListItemAvatar>
                <div className={classes.text}>
                    <ListItemText primary={name} secondary={"サイズ：" + size} />
                    <ListItemText primary={"¥" + price} />
                </div>
                <IconButton onClick={() => removeProductFromWish(props.product.wishId)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default WishListItem
