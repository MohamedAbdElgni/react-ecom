const INITAL_VALUE = {
    products: [],
    cats: [],
    product: [],
    cat: [],
    fav: [],
    cart: [],
    wishlist: [],
    search: []
}

export const get_products = (state = INITAL_VALUE, action) => {
    switch (action.type) {
        case 'FEATCH_ALL':
            return {
                ...state,
                products: action.payload
            }
        case 'FEATCH_ONE_CAT':
            return {
                ...state,
                products: action.payload
            }
        case 'FEATCH_CATS':
            return {
                ...state,
                cats: action.payload
            }
        case 'FEATCH_ONE':
            return {
                ...state,
                product: action.payload
            }

        case 'FEATCH_SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'ADD_TO_FAV':
            return {
                ...state,
                fav: action.payload
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: action.payload
            }
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlist: action.payload
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: action.payload
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: action.payload
            }
        case 'REMOVE_FROM_FAV':
            return {
                ...state,
                fav: action.payload
            }

        default:
            return state
    }
}



