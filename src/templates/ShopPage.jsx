import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import ProductCard from '../components/Products/ProductCard'
import { db } from '../firebase';

function ShopPage() {
    let id = window.location.pathname.split('/shopPage')[1];
    if (id) {
        id = id.split('/')[1]
    }

    const [products, setProducts] = useState('');

    useEffect(() => {
        if(id) {
            db.collection('maps').doc(id).get().then(snapshot => {
                const product = snapshot.data()
                setProducts(product.products)
            })
        }
    }, [])

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.length > 0 && (products.map(product => (
                    <ProductCard 
                        key={product.id} id={product.id} name={product.name}
                        image={product.images} price={product.price} uid={id}
                    />
                )))}
            </div>
        </section>
    )
}

export default ShopPage
