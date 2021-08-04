import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { fetchProductsInWish } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

const HeaderMenu = ({handleDrawerToggle}) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.users)
    let UsersWish = selector.wish
    const uid = selector.uid
    

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('wish')
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    
                    switch (change.type) {
                        case 'added':
                            UsersWish.push(product)
                            break;
                        case 'modified':
                            const index = UsersWish.findIndex(product => product.wishId === change.doc.id)
                            UsersWish[index] = product
                            break;
                        case 'removed':
                            UsersWish = UsersWish.filter(product => product.wishId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                })
                if(UsersWish.length > 0) {
                    dispatch(fetchProductsInWish(UsersWish))
                }
            })
            return () => unsubscribe()
    },[])

    return (
        <>
            <IconButton onClick ={() => dispatch(push('/wish'))}>
                <Badge badgeContent={UsersWish && UsersWish.length} color="secondary">
                    <FavoriteBorderIcon />
                </Badge>
            </IconButton>
            <IconButton onClick={(event) => handleDrawerToggle(event)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default HeaderMenu
