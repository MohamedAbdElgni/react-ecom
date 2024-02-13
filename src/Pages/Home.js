import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll, fetchCats, fetchOneCat } from '../Store/Actions/Action';
import {ProdCard} from '../Components/ProdCard';

function Home() {
  const dispatch = useDispatch();
  const cats = useSelector(state => state.cats);
  const products = useSelector(state => state.products.products);
  const isLoading = useSelector(state => state.products.loading);

  useEffect(() => {
    dispatch(fetchCats());
    dispatch(fetchAll());
  }, [dispatch]);

  const handleClick = (cat) => {
    dispatch(fetchOneCat(cat));
  }

  return (
    <div className='container-fluid'>
      <div className='cat-bar'>
        {isLoading ? (
          <p>Loading categories...</p>
        ) : (
          <>
            <button className="cat-btn animate__animated animate__flipInX" onClick={(e) => dispatch(fetchAll())}>All</button>
            {cats.map(cat => (
              <button key={cat} className="cat-btn animate__animated animate__flipInX" onClick={() => handleClick(cat)}>{cat}</button>
            ))}
          </>
        )}
      </div>
      <div className="row justify-content-center">
        {products && products.map(product => (
          <ProdCard
            product={{ ...product, qnt: 1 }}
            id={product.id}
            img={product.images[0]}
            title={product.title}
            price={product.price}
            discount={product.discountPercentage}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
