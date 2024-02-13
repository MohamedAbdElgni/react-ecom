import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll, fetchCats, fetchOneCat } from '../Store/Actions/Action';
import { ProdCard } from '../Components/ProdCard';
import './prodcat.css';
function Home() {
  const dispatch = useDispatch();
  const cats = useSelector(state => state.cats);
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchCats());
    dispatch(fetchAll());
  }, [dispatch]);

  const handleClick = (cat) => {
    dispatch(fetchOneCat(cat));
  }

  return (
    <div className='container-fluid p-0'>
      <div className='cat-bar'>

        <>
          <button key="all" className="cat-btn animate__animated animate__flipInX" onClick={(e) => dispatch(fetchAll())}>All</button>
          {cats.map(cat => (
            <button key={cat} className="cat-btn animate__animated animate__flipInX" onClick={() => handleClick(cat)}>{cat}</button>
          ))}
        </>

      </div>
      <div className="row justify-content-center">
        {products && products.map(product => (
          <ProdCard
            key={product.id}
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
