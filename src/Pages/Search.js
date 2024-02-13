
import React from 'react'
import { useSelector } from 'react-redux';
import { ProdCard } from '../Components/ProdCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Search() {
    const products = useSelector(state => state.search.products);

    return (

        <div className='row justify-content-center mt-5'>
            {products.length > 0 ? products.map(product => (
                <ProdCard
                    product={{ ...product, qnt: 1 }}
                    id={product.id}
                    img={product.images[0]}
                    title={product.title}
                    price={product.price}
                    discount={product.discountPercentage}
                />
            )) :
                <div className='col-12 w-100'>
                    <h1 className='text-center'>No products found</h1>

                    <Link className="w-100" to='/'><button className="btn btn-outline-warning w-100" >Go to Home</button></Link>

                </div>

            }
        </div>
    )
}

export default Search