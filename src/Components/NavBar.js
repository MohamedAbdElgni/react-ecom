import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { faUser, faShoppingCart, faHeart, faSignInAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearch } from '../Store/Actions/Action';
const NavBarTop = () => {

    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.currentUser ? true : false;
    const currentUser = authContext.currentUser;

    const cart = useSelector(state => state.cart);
    const wishList = useSelector(state => state.wishlist);
    const favorites = useSelector(state => state.fav);
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const logout = () => {
        authContext.logout();
        dispatch({ type: 'ADD_TO_CART', payload: [] });
        dispatch({ type: 'ADD_TO_FAV', payload: [] });
        dispatch({ type: 'ADD_TO_WISHLIST', payload: [] });
    }
    useEffect(() => {
    }
        , [cart, wishList, favorites]);




    useEffect(() => {
    }
        , [authContext.currentUser]);


    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(e.target.value);
        dispatch(fetchSearch(keyword));
    }
    return (
        <Navbar bg="light" expand="lg" className="mt-0 pt-0" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container-fluid shadow-lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <li className="nav-item border-bottom border-dark ms-lg-2 align-content-center">
                            <Link to="/" className="nav-link text-dark ">
                                {currentUser ? 'Home' : 'Guest'}
                            </Link>
                        </li>
                    </Nav>
                    <Nav>
                        <li className='nav-item  border-dark'>
                            <Form className=" d-grid gap-2 d-md-flex justify-content-md-end align-items-md-center">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                                <Link to={`/search/${keyword}`}><button className="btn btn-outline-dark" type="submit">Search</button></Link>
                            </Form>
                        </li>

                    </Nav>

                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item border-dark">
                                    <Link className="nav-link text-dark" to="/">
                                        <FontAwesomeIcon icon={faUser} /> {currentUser.name}
                                    </Link>
                                </li>
                                <li className="nav-item border-dark">
                                    <Link className="nav-link text-dark position-relative" to="/cart">
                                        <FontAwesomeIcon icon={faShoppingCart} /> Cart
                                        {cart.length > 0 ? (
                                            <span className="badge-notification" style={{ fontSize: '0.8rem' }}>
                                                {cart.length}
                                            </span>
                                        ) : null}
                                    </Link>
                                </li>
                                <li className="nav-item border-dark">
                                    <Link className="nav-link text-dark position-relative" to="/wishlist">
                                        <FontAwesomeIcon icon={faHeart} /> WishList
                                        {wishList.length > 0 ? (
                                            <span className="badge-notification" style={{ fontSize: '0.8rem' }}>
                                                {wishList.length}
                                            </span>
                                        ) : null}
                                    </Link>
                                </li>
                                <li className="nav-item border-dark">
                                    <Link className="nav-link text-dark position-relative" to="/fav">
                                        <FontAwesomeIcon icon={faStar} className="star" style={{ color: favorites.length > 0 ? 'gold' : 'black' }} /> Favorites
                                        {favorites.length > 0 ? (
                                            <span className="num" style={{ fontSize: '0.8rem' }}>
                                                {favorites.length}
                                            </span>
                                        ) : null}
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
        </Navbar >
    )

}

export default NavBarTop