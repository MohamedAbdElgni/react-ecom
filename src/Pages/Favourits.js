import { useSelector } from 'react-redux';
import { ProdCard } from '../Components/ProdCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useEffect } from 'react';
export default function Favourits() {
  const Favourits = useSelector(state => state.fav);
  const authContext = useContext(AuthContext);

  useEffect(() => {

    
    if (authContext.currentUser) {
      const users = authContext.users;
      const userIndex = users.findIndex(user => user.email === authContext.currentUser.email);
      users[userIndex] = { ...authContext.currentUser, fav: Favourits };
      authContext.setUsers(users);
      authContext.setCurrentUser({ ...authContext.currentUser, fav: Favourits });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Favourits ]);
  return (
    <div className='row justify-content-center m-0 mt-5 p-0' style={{ minHeight: '100vh' }} >

      {Favourits.length > 0 ? Favourits.map(product => (
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

        <div className='col-12 w-100 animate__animated animate__fadeIn'>
          <h1 className='text-center'>Your Favourits is empty</h1>

          <Link className="w-100" to='/'><button className="btn btn-outline-warning w-100" >Go to Home</button></Link>

        </div>


      }
    </div>
  )
}
