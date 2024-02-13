
import { ActionTypes } from '../contents/action-types';
import { axiosInstance } from '../../Network/axiosInstance';



export const fetchAll = () => (dispatch) => {
    axiosInstance.get('/?limit=100')
        .then(res => {
            console.log('Allfeatch');
            dispatch({
                type: ActionTypes.FEATCH_ALL,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const fetchOneCat = (name) => (dispatch) => {
    axiosInstance.get(`/category/${name}?limit=100`)
        .then(res => {

            dispatch({
                type: ActionTypes.FEATCH_ONE_CAT,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}



export const fetchCats = () => (dispatch) => {
    axiosInstance.get('/categories')
        .then(res => {

            dispatch({
                type: ActionTypes.FEATCH_CATS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const fetchOne = (id) => (dispatch) => {
    axiosInstance.get(`/${id}`)
        .then(res => {
            // console.log("onefeatch");
            //console.log(res.data);
            dispatch({
                type: ActionTypes.FEATCH_ONE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}



export const fetchSearch = (query) => (dispatch) => {
    axiosInstance.get(`/search?q=${query}`)
        .then(res => {
            dispatch({
                type: ActionTypes.FEATCH_SEARCH,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}


//adding the prouduct object to the fav array
export const addToFavorites = (product) => (dispatch) => {
    dispatch({
        type: ActionTypes.ADD_TO_FAV,
        payload: product
    })
}

//adding the prouduct object to the cart array
export const addToCart = (product) => (dispatch) => {
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: product
    })
}

//adding the prouduct object to the wishlist array
export const addToWishlist = (product) => (dispatch) => {
    dispatch({
        type: ActionTypes.ADD_TO_WISHLIST,
        payload: product
    })
}

//removing the prouduct object from the wishlist array
export const removeFromWishlist = (product) => (dispatch) => {
    dispatch({
        type: ActionTypes.REMOVE_FROM_WISHLIST,
        payload: product
    })
}

//removing the prouduct object from the cart array

export const removeFromCart = (product) => (dispatch) => {
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: product
    })
}
//removing the prouduct object from the fav array
export const removeFromFavorites = (product) => (dispatch) => {
    dispatch({
        type: ActionTypes.REMOVE_FROM_FAV,
        payload: product
    })
}



