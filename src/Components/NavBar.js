import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { faUser, faShoppingCart, faHeart, faSignInAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
const NavBarTop = () => {

    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.currentUser ? true : false;
    const currentUser = authContext.currentUser;
    const logout = () => {
        authContext.logout();
    }
    const cart = useSelector(state => state.cart);
    const wishList = useSelector(state => state.wishlist);
    const favorites = useSelector(state => state.fav);

    useEffect(() => {
    }
        , [cart, wishList, favorites]);




    useEffect(() => {
    }
        , [authContext.currentUser]);

    return (
        <Navbar expand="sm" className="shadow-lg bg-light position-sticky top-0" style={{ zIndex: 50 }}>
            <div className='container'>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className='bg-light'>
                    <Nav className='me-auto'>
                        <li className='nav-item border-bottom border-dark'>
                            <Link className='nav-link' to='/'>
                                {currentUser ? 'Home' : 'Guest'}
                            </Link>
                        </li>
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <li className='nav-item border-dark'>
                                    <Link className='nav-link text-dark' to='/'>
                                        <FontAwesomeIcon icon={faUser} /> {currentUser.name}
                                    </Link>
                                </li>
                                <li className='nav-item border-dark'>
                                    <Link className='nav-link text-dark position-relative' to='/cart'>
                                        <FontAwesomeIcon icon={faShoppingCart} /> Cart
                                        {cart.length > 0 ? <span className='badge-notification' style={{ fontSize: '0.8rem' }}>{cart.length}</span> : null}
                                    </Link>
                                </li>
                                <li className='nav-item border-dark'>
                                    <Link className='nav-link text-dark position-relative'>
                                        <FontAwesomeIcon icon={faHeart} /> WishList
                                        {wishList.length > 0 ? <span className='badge-notification' style={{ fontSize: '0.8rem' }}>{wishList.length}</span> : null}

                                    </Link>
                                </li>
                                <li className='nav-item border-dark'>
                                    <Link className='nav-link text-dark position-relative'>
                                        <FontAwesomeIcon icon={faStar} className='star' style={{ color: favorites.length > 0 ? 'gold' : 'black' }} /> Favorites
                                        {favorites.length > 0 ? <span className='num' style={{ fontSize: '0.8rem' }}>{favorites.length}</span> : null}
                                    </Link>
                                </li>
                                <li className='nav-item border-dark'>
                                    <button className='nav-link text-dark' onClick={logout}>
                                        <FontAwesomeIcon icon={faSignInAlt} /> Log Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item border-dark'>
                                    <Link className='nav-link text-dark' to='/login'>
                                        <FontAwesomeIcon icon={faSignInAlt} /> Log In
                                    </Link>
                                </li>
                                <li className='nav-item border-dark'>
                                    <Link className='nav-link text-dark' to='/signup'>
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavBarTop;