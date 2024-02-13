import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../AuthContext';
import { Modal, Button } from 'react-bootstrap';
import { fetchOne } from '../Store/Actions/Action';
import { useParams } from 'react-router-dom';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './prod.css';



function Prod() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const context = useContext(AuthContext);
    const prod = useSelector(state => state.product);
    const fav = useSelector(state => state.fav);
    const cart = useSelector(state => state.cart);
    const [showModal, setShowModal] = useState(false);
    const wishlist = useSelector(state => state.wishlist);
    const isLoggedIn = context.currentUser ? true : false;


    useEffect(() => {
        dispatch(fetchOne(id));
    }, [id, dispatch]);


    const handleAddToCart = (product) => {
        if (isLoggedIn) {
            const updatedCart = [...cart, product];
            dispatch({ type: 'ADD_TO_CART', payload: updatedCart });

        } else {
            setShowModal(true);

        }

    }

    const handleRemoveFromCart = (product) => {
        if (isLoggedIn) {

            const updatedCart = cart.filter((item) => item.id !== product.id);
            dispatch({ type: 'REMOVE_FROM_CART', payload: updatedCart });

        } else {
            setShowModal(true);
        }
    }

    const handleAddToFav = (product) => {
        if (isLoggedIn) {
            const updatedFav = [...fav, product];
            dispatch({ type: 'ADD_TO_FAV', payload: updatedFav });
        }
        else {
            setShowModal(true);
        }
    }

    const handleRemoveFromFav = (product) => {
        if (isLoggedIn) {
            const updatedFav = fav.filter((item) => item.id !== product.id);
            dispatch({ type: 'REMOVE_FROM_FAV', payload: updatedFav });
        }
        else {
            setShowModal(true);
        }
    }

    const handleAddToWishlist = (product) => {
        if (isLoggedIn) {
            const updatedWishlist = [...wishlist, product];
            dispatch({ type: 'ADD_TO_WISHLIST', payload: updatedWishlist });
        }
        else {
            setShowModal(true);
        }
    }

    const handleRemoveFromWishlist = (product) => {
        if (isLoggedIn) {
            const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: updatedWishlist });
        }
        else {
            setShowModal(true);
        }
    }



    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <>
            {prod.id && (
                <div className="container prouduct-card   shadow-lg">
                    <div className='row'>
                        <div className='left-big-image col-md-6'>
                            <img src={prod.images[selectedImageIndex]} alt={prod.name} className='img-fluid' style={{ height: '400px' }} />
                        </div>
                        <div className='right-small-images col-md-6'>
                            <div className='row'>
                                {prod.images.map((image, index) => (
                                    <div className='col-3' key={index}>
                                        <img src={image} alt={prod.name} className='img-fluid border-1 border border-black' style={{ height: '100px' }} onClick={() => handleImageClick(index)} />
                                    </div>
                                ))}
                            </div>
                            <div className='row'>
                                <div className='col-lg-8 col-md-8 col-sm-12'>
                                    <h5 className='card-title'>{prod.title}</h5>
                                    <p className='card-text'>{prod.description}</p>
                                    <p className='card-text'>
                                        <span className='fw-bold'>Price: </span>
                                        {prod.discountPercentage ? (
                                            <>
                                                <span className="text-success"><span>$</span>{Math.round(prod.price * (1 - prod.discountPercentage / 100))}</span>
                                                <span className="text-danger"> ({prod.discountPercentage}% off)</span>
                                                <span className="text-decoration-line-through me-2">${prod.price}</span>
                                            </>
                                        ) : (
                                            <span>{prod.price}</span>
                                        )}
                                    </p>
                                    <div className='d-sm-flex justify-content-center align-items-sm-center'>
                                        {!wishlist.some(wishlist => wishlist.id === prod.id) ? (
                                            <button className="btn btn-warning border-black" onClick={() => handleAddToWishlist(prod)}>
                                                <FontAwesomeIcon icon={faStar} /> Add to Wishlist
                                            </button>
                                        ) : (
                                            <button className="btn btn-outline-danger" onClick={() => handleRemoveFromWishlist(prod)}>
                                                <FontAwesomeIcon icon={faStar} /> Remove from Wishlist
                                            </button>
                                        )}
                                        {!fav.some(fav => fav.id === prod.id) ? (
                                            <button className="btn btn-warning border-black" onClick={() => handleAddToFav(prod)}>
                                                <FontAwesomeIcon icon={faHeart} /> Add to Favourites
                                            </button>
                                        ) : (
                                            <button className="btn btn-outline-danger" onClick={() => handleRemoveFromFav(prod)}>
                                                <FontAwesomeIcon icon={faHeart} /> Remove from Favourites
                                            </button>
                                        )}
                                        {!cart.some(cart => cart.id === prod.id) ? (
                                            <button className="btn btn-warning border-black" onClick={() => handleAddToCart(prod)}>
                                                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                                            </button>
                                        ) : (
                                            <button className="btn btn-outline-danger" onClick={() => handleRemoveFromCart(prod)}>
                                                <FontAwesomeIcon icon={faCartPlus} /> Remove from Cart
                                            </button>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Please Log In</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You need to log in to perform this action.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Link to="/login">
                                <Button variant="dark">
                                    Log In
                                </Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </>
    )

}

export default Prod;
