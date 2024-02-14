import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from './AuthContext.js';

const CompEffect = () => {
    const authContext = useContext(AuthContext);
    const fav = useSelector(state => state.fav);
    const wishLists = useSelector(state => state.wishlist);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if (authContext.isLoggedIn) {
            const users = authContext.users;
            const userIndex = users.findIndex(user => user.email === authContext.currentUser.email);
            users[userIndex] = { ...authContext.currentUser, fav: fav, wishLists: wishLists, cart: cart };
            authContext.setUsers(users);
            authContext.setCurrentUser({ ...authContext.currentUser, fav: fav, wishLists: wishLists, cart: cart });
        }
    }
        // eslint-disable-next-line
        , [fav, wishLists, cart]);
    return null;
}
export default CompEffect;