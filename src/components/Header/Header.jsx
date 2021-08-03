import React, {useCallback, useState} from 'react'
import {createStyles, makeStyles}     from '@material-ui/core/styles';
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import HeaderMenu from './HeaderMenu';
import ClosableDrawer from './ClosableDrawer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%'
        },
        iconButtons: {
            margin: '0 0 0 auto'
        },
        title: {
            cursor: 'pointer'
        }
    }),
);

function Header() {
    const classes = useStyles();
    const selector = useSelector(state => state)
    const isSignedIn = selector.users.isSignedIn

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);

    const handleDrawerToggle = useCallback((event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open)
    }, [setOpen, open])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title} onClick={() => dispatch(push('/'))}>
                    Look Up
                </Typography>
                {isSignedIn && (
                    <div className={classes.iconButtons}>
                        <HeaderMenu handleDrawerToggle={handleDrawerToggle}/>
                    </div>
                )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
}

export default Header
