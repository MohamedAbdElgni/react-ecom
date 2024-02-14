import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll, fetchCats, fetchOneCat } from '../Store/Actions/Action';
import { ProdCard } from '../Components/ProdCard';
import Loader from '../Components/Loader';
import './prodcat.css';

function Home() {
  const dispatch = useDispatch();
  const cats = useSelector(state => state.cats);
  const products = useSelector(state => state.products.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCats());
    async function fetchData() {
      await dispatch(fetchAll());
      setLoading(false);
    }
    fetchData();
  }, [dispatch]);

  const handleClick = (cat) => {
    dispatch(fetchOneCat(cat));

  };

  return (
    <div className='container-fluid'>
      <div className='cat-bar'>
        <>
          <button key="all" className="cat-btn animate__animated animate__flipInX" onClick={() => dispatch(fetchAll())}>All</button>
          {cats.map(cat => (
            <button key={cat} className="cat-btn animate__animated animate__flipInX" onClick={() => handleClick(cat)}>{cat}</button>
          ))}
        </>
      </div>

      <div className="row justify-content-center" style={{ minHeight: '100vh' }}>
        {loading && <Loader />}
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
