import { Marker } from '@react-google-maps/api';
import React, { useState } from 'react'
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import DialogTest from '../UIkit/DialogTest';


function PlaceInfo() {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const mapsData = useSelector(state => state.maps.map)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = useCallback(() => {
        setOpen(false)
    }, [open])
    

    return (
        <>
            {mapsData.map((marker) => (
                <Marker 
                    key={`${marker.locate.lat * marker.locate.lng}`}
                    position={{
                        lat: marker.locate.lat,
                        lng: marker.locate.lng,
                    }}
                    onClick={() => {
                        setSelected(marker);
                        // マウスオーバーで<InfoWindow>が描画されます。
                        handleClickOpen()
                    }}
                />
            ))}

            {selected ? (
                <DialogTest 
                    handleClose={handleClose}
                    open={open}
                    selected={selected}
                />
            ) : null}
        </>
    )
}

export default PlaceInfo
