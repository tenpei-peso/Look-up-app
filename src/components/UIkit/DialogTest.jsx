import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import DialogImage from '../Products/DialogImage';
import { Button, DialogActions, DialogTitle } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogTest({open, handleClose, selected}) {
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"お店の商品一覧"}</DialogTitle>
        <DialogTitle>{`Shop Name: ${selected.name}`}</DialogTitle>
        <DialogContent>
          <DialogImage 
            selected={selected}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" fullWidth='true' onClick={() => dispatch(push('/shopPage/' + selected.uid))}>
            お店の詳細ページへ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}