import React from 'react';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    },
    fontSize: {
        fontSize: '24px'
    }
})

const SizeTable = ({size, addProduct}) => {
    const classes = useStyles()

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" className={classes.fontSize}>SIZE: {size}</TableCell>
                                {/* <TableCell className={classes.iconCell}>
                                        <IconButton
                                            className={classes.iconCell}
                                        >
                                            <ShoppingCartIcon />
                                        </IconButton>
                                </TableCell> */}
                                <TableCell className={classes.iconCell}>
                                    <IconButton className={classes.iconCell} onClick={() => addProduct(size)}>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SizeTable;
