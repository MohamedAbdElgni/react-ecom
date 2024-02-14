import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Pages/Home';
import logIn from './Pages/Auth/LogIn';
import SignUp from './Pages/Auth/SignUp';
import NavBarTop from './Components/NavBar';
import Prod from './Pages/Prod';
import WishList from './Pages/WishList';
import Favourits from './Pages/Favourits';
import Search from './Pages/Search';
import Error from './Pages/Error';
import Cart from './Pages/Cart';
import 'animate.css';
import Footer from './Components/Footer';


function App() {
  return (
    <div className="container-fluid p-0 App">
      <BrowserRouter>
        <NavBarTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={Prod} />
          <Route exact path="/wishlist" component={WishList} />
          <Route exact path="/fav" component={Favourits} />
          <Route exact path="/search/:keyword" component={Search} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={logIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={Error} path="*" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;