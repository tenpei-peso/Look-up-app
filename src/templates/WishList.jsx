import { List } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import WishListItem from '../components/Products/WishListItem';

function WishList() {
    const productInWish = useSelector(state => state.users.wish);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                ほしい物リスト
            </h2>
            <List>
                {productInWish.length > 0 && (
                    productInWish.map(product => <WishListItem key={product.wishId} product={product} />))}
            </List>
            <div className="module-spacer--medium"></div>
        </section>
    )
}

export default WishList
