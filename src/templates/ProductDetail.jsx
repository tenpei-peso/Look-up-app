import { makeStyles } from '@material-ui/core';
import HTMLReactParser from 'html-react-parser';
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ImageSwiper from '../components/Products/ImageSwiper';
import SizeTable from '../components/Products/SizeTable';
import { db, FirebaseTimestamp } from '../firebase';
import { addProductWish } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        }
    },
    detail: {
        textAline: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 'auto',
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        }
    },
    price: {
        fontSize: 36
    }
}))

const returnCodeToBr = (text) => {
    if (text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
    }
}

function ProductDetail() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const path = useSelector(state => state.router.location.pathname)
    const uid = path.split('/')[2];
    const id = path.split('/')[3];
    
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        db.collection('maps').doc(uid).get().then(snapshot => {
            const data = snapshot.data()
            const filterData = data.products.filter(value => value.id === id)
            setProduct(...filterData)
        })
    }, [])

    const addProduct = useCallback((selectedSize) => {
        const timestamp = FirebaseTimestamp.now();
        dispatch(addProductWish({
            added_at: timestamp,
            description: product.description,
            gender: product.gender,
            images: product.images,
            name: product.name,
            price: product.price,
            productId: product.id,
            size: selectedSize
        }))
    }, [product])

    return (
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>¥{product.price}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable size={product.size} addProduct={addProduct}></SizeTable>
                        <div className="module-spacer--small"/>
                        <p>{product.description}</p>
                    </div>
                </div>
            )}

        </section>
    )
}

export default ProductDetail
