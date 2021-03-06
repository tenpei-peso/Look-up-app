import { Typography } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Products/ProductCard';
import { fetchProducts } from '../reducks/products/operations'

function ProductList(){
    const dispatch = useDispatch();
    const products = useSelector((state) => state.users.product)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <section className="c-section-wrapin">
            <Typography variant="h3" component="h3" style={{marginBottom: '28px', color: '#4dd0e1'}}>
                在庫情報
            </Typography>
            <div className="p-grid__row">
                {products.length > 0 && (products.map(product => (
                    <ProductCard 
                        key={product.id} id={product.id} name={product.name}
                        image={product.images} price={product.price}
                    />
                )))}
            </div>
        </section>
    )
}

export default ProductList
