import { useSelector } from 'react-redux';
import { ProdCard } from '../Components/ProdCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useEffect } from 'react';
export default function WishList() {
    const wishList = useSelector(state => state.wishlist);
    const authContext = useContext(AuthContext);

    
    useEffect(() => {


        if (authContext.currentUser) {
            const users = authContext.users;
            const userIndex = users.findIndex(user => user.email === authContext.currentUser.email);
            users[userIndex] = { ...authContext.currentUser, wishLists: wishList };
            authContext.setUsers(users);
            authContext.setCurrentUser({ ...authContext.currentUser, wishLists: wishList });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishList]);
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

