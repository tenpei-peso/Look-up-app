import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Products/ProductCard';
import { fetchProducts } from '../reducks/products/operations'

function ProductList(){
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.list.length > 0 && (products.list.map(product => (
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
