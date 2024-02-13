import { useSelector } from 'react-redux';
import ProdCard from '../Components/ProdCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default function Favourits() {
    const Favourits = useSelector(state => state.fav);
  return (
    <div className='row justify-content-center mt-5'>
      {Favourits.length > 0 ? Favourits.map(product => (
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
      <h1 className='text-center'>Your Favourits is empty</h1>
          
      <Link className="w-100"  to='/'><button className="btn btn-outline-warning w-100" >Go to Home</button></Link>
          
      </div>

      }
    </div>
  )
}