import { useSelector } from 'react-redux';
import { ProdCard } from '../Components/ProdCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default function WishList() {
    const wishList = useSelector(state => state.wishlist);
    return (
        <div className='row justify-content-center m-0 mt-5 ' style={{ minHeight: '100vh' }}>
            {wishList.length > 0 ? wishList.map(product => (
                <ProdCard
                    key={product.id}
                    product={{ ...product, qnt: 1 }}
                    id={product.id}
                    img={product.images[0]}
                    title={product.title}
                    price={product.price}
                    discount={product.discountPercentage}
                />
            )) :
                <div className='col-12 w-100'>
                    <h1 className='text-center'>Your wishlist is empty</h1>

                    <Link className="w-100" to='/'><button className="btn btn-outline-warning w-100" >Go to Home</button></Link>

                </div>

            }
        </div>
    )
}

