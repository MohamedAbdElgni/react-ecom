import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faHeart, faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../AuthContext';
import { Modal, Button } from 'react-bootstrap';


function ProdCard(props) {
    const [isHovered, setIsHovered] = useState(false);
    const context = useContext(AuthContext);
    const fav = useSelector(state => state.fav);
    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishlist);
    const isLoggedIn = context.currentUser ? true : false;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const handleCloseModal = () => setShowModal(false);
    useEffect(() => {

    }, [cart, wishlist, fav]);

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
        } else {
            setShowModal(true);
        }
    }

    const handleRemoveFromFav = (product) => {
        if (isLoggedIn) {
            const updatedFav = fav.filter((item) => item.id !== product.id);
            dispatch({ type: 'REMOVE_FROM_FAV', payload: updatedFav });
        } else {
            setShowModal(true);
        }
    }

    const handleAddToWishlist = (product) => {
        if (isLoggedIn) {
            console.log(product)
            console.log(props.product)
            console.log(wishlist.includes(props.product))
            const updatedWishlist = [...wishlist, product];
            dispatch({ type: 'ADD_TO_WISHLIST', payload: updatedWishlist });
        } else {
            setShowModal(true);
        }
    }

    const handleRemoveFromWishlist = (product) => {
        if (isLoggedIn) {
            const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: updatedWishlist });
        } else {
            setShowModal(true);
        }
    }









    return (
        <div className={`card m-2 rounded-0 border-1 shadow-sm p-0`} id={props.id} discount={props.discount} style={{ width: "18rem", height: "25rem", overflow: "hidden", backgroundColor: "#f9f9f0" }}>
            <div className="position-relative ">
                {!fav.some(fav => fav.id === props.id) ? (
                    <button className="btn btn-outline-warning position-absolute top-0 start-0" onClick={() => handleAddToFav(props.product)}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                ) : (
                    <button className="btn btn-outline-danger position-absolute top-0 start-0" onClick={() => handleRemoveFromFav(props.product)}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                )}



                <img src={props.img} className="card-img-top" alt="..." style={{ height: "10rem", objectFit: "contain" }} />
            </div>
            <div className="card-body text-center" style={{ height: "15rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                    <h5 className={`card-title mb-0 ${isHovered ? 'animate__animated animate__pulse' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <Link to={`/product/${props.id}`} className="text-dark">{props.title}</Link>
                    </h5>

                    {/* Price discount */}
                    <div className="mt-2">
                        <p className="card-text text-secondary"><strong>${props.price}</strong></p>
                        {props.discount > 0 && <p className="card-text text-success mb-1">Save {props.discount}%</p>}
                    </div>
                </div>

                {/* WiSH */}
                <div className="d-flex  align-items-center justify-content-center">
                    {!wishlist.some(wishlist => wishlist.id === props.id) ? (
                        <button className="btn btn-outline-warning" onClick={() => handleAddToWishlist(props.product)}>
                            <FontAwesomeIcon icon={faStar} /> Add to Wishlist
                        </button>
                    ) : (
                        <button className="btn btn-outline-danger" onClick={() => handleRemoveFromWishlist(props.product)}>
                            <FontAwesomeIcon icon={faStar} /> Remove from Wishlist
                        </button>
                    )}

                </div>

                {/* Add to Cart */}
                <div>

                    {!cart.some(cart => cart.id === props.id) ? (
                        <button className="btn btn-success rounded-0" onClick={() => handleAddToCart(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>

                    ) : (
                        <button className="btn btn-danger rounded-0" onClick={() => handleRemoveFromCart(props.product)}>Remove from Cart</button>
                    )}
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to log in to perform this action.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Link to="/login">
                        <Button variant="primary">
                            Log In
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ProdCard;