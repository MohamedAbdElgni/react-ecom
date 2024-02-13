import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOne } from '../Store/Actions/Action';
import { useSelector, useDispatch } from 'react-redux';

export default function Prod() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const prod = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchOne(id));
    }, [id, dispatch]);

    const handleAddToCart = () => {

    };

    const handleAddToWishlist = () => {

    };

    const handleAddToFavorites = () => {

    };

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <>
            {prod.id && (
                <div className='row justify-content-center position-relative' style={{ marginTop: '0px', height: '50vh', width: '100%' }}>
                    <div className='card col-lg-8 col-md-10 col-sm-12'>
                        <div className='card-body position-relative'>
                            <div className='row position-relative' style={{ maxheight: '50%' }}>
                                <div id="carouselExampleControls" className="carousel slide col-md-9" data-bs-ride="carousel">
                                    <div className="carousel-inner" style={{ height: '100%' }}>
                                        {prod.images && prod.images.map((image, index) => (
                                            <div className={`carousel-item ${index === selectedImageIndex ? 'active' : ''}`} key={index}>
                                                <img src={image} className='d-block w-100' alt={`${prod.title} ${index}`} />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div className='col-md-3 overflow-auto' style={{ maxHeight: '100%' }}>
                                    {prod.images && prod.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            className={`d-block w-100 mb-2 ${selectedImageIndex === index ? 'border border-primary' : ''}`}
                                            alt={`${prod.title} ${index}`}
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            onClick={() => handleImageClick(index)}
                                        />
                                    ))}
                                </div>
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
                                    <div className='d-flex align-items-center'>
                                        <button className='btn btn-primary me-2' onClick={handleAddToCart}>Add to Cart</button>
                                        <button className='btn btn-outline-secondary me-2' onClick={handleAddToWishlist}>Add to Wishlist</button>
                                        <button className='btn btn-outline-danger' onClick={handleAddToFavorites}>Add to Favorites</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};
