import React from 'react';
import { useSelector } from 'react-redux';
import './cart.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../Store/Actions/Action';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();


    const CalculateTotal = (i) => {

        const total = i.price * i.qnt;
        return total;
    }

    const handelDelete = (item) => {

        if (item) {
            dispatch(removeFromCart(cart.filter((i) => i.id !== item.id)));
        }

    }

    const handelIncqnt = (item) => {
        if (item) {
            dispatch(addToCart(cart.map((i) => i.id === item.id ? { ...i, qnt: i.qnt + 1 } : i)));
        }
    }

    const handelDecqnt = (item) => {
        if (item) {

            if (item.qnt === 1) {
                dispatch(removeFromCart(cart.filter((i) => i.id !== item.id)));
            } else {
                dispatch(addToCart(cart.map((i) => i.id === item.id ? { ...i, qnt: i.qnt - 1 } : i)));
            }
        }
    }
    const [carSumarry, setCartsum] = useState({
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    });
    const calculateCartSummary = () => {
        let subtotal = 0;
        let shipping = 15;
        let tax = 14;

        cart.map((item) => {
            return subtotal += CalculateTotal(item) * (1 - item.discountPercentage / 100);
        });
        console.log(subtotal);
        setCartsum({
            subtotal: Math.round(subtotal),
            shipping: shipping,
            tax: tax,
            total: Math.round(subtotal + shipping + Math.round(subtotal * tax / 100))
        });
    }



    useEffect(() => {
        calculateCartSummary(cart)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    return (
        <div>
            {cart.length !== 0 ? (
                <div className="container-fluid">
                    <div className='row'>

                        <div className='col-md-8 '>
                            {cart.map((item, index) => (
                                <div key={index} className='row mb-2 shadow-lg p-2'>
                                    <div className='col-md-4 '>
                                        <img src={item.images[0]} alt={item.name} className='img-item img-fluid' />
                                    </div>
                                    <div className='col-md-4 text-center'>
                                        <div className='row p-2'>
                                            <h5>{item.title}</h5>
                                        </div>
                                        <div className='row p-2'>
                                            <p className='text-decoration-line-through text-danger ' >${item.price}</p>
                                            <p className='text-success'>${Math.round(item.price * (1 - item.discountPercentage / 100))}</p>
                                        </div>
                                    </div>
                                    <div className='col-md-4 text-center'>
                                        <div className='row text-right justify-content-end'>
                                            <button className='text-center btn btn-close' onClick={() => handelDelete(item)}></button>
                                        </div>
                                        <div className='row'>
                                            <p>Total <span>{Math.round(CalculateTotal(item) * (1 - item.discountPercentage / 100))}</span></p>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <button className='btn btn-dark' onClick={() => handelIncqnt(item)}>+</button>
                                            </div>
                                            <div className='col-4'>
                                                <p>{item.qnt}</p>
                                            </div>
                                            <div className='col-4'>
                                                <button className='btn btn-warning' onClick={() => handelDecqnt(item)} >-</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='col-md-4 text-center'>
                            <div className='row mb-1 p-1'>
                                <div className='col-12'>
                                    <h3>Cart Summary</h3>
                                </div>
                            </div>
                            <div className='row mb-1 p-1'>
                                <div className='col-12'>
                                    <h5>Subtotal:<span className='text-success'>$</span>{carSumarry.subtotal} </h5>
                                </div>
                            </div>
                            <div className='row mb-1 p-1'>
                                <div className='col-12'>
                                    <h5>Shipping: <span className='text-success'>$</span>{carSumarry.shipping} </h5>
                                </div>
                            </div>
                            <div className='row mb-1 p-1'>
                                <div className='col-12'>
                                    <h5>Tax: <span className='text-success'>%</span>{carSumarry.tax} </h5>
                                </div>
                            </div>
                            <div className='row mb-1 p-1'>
                                <div className='col-12'>
                                    <h5>Total: <span className='text-success'>$</span>{carSumarry.total} </h5>
                                </div>
                            </div>
                            <div className='row mb-1 p-1'>
                                <div className='col-12'>

                                    <Link to='/' className='btn btn-dark rounded-0'>Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className='col-12 w-100'>
                    <h1 className='text-center'>Your Cart is empty</h1>

                    <Link className="w-100" to='/'><button className="btn btn-outline-warning w-100" >Go to Home</button></Link>

                </div>
            )}
        </div>
    )
}
