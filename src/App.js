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
import 'animate.css';


function App() {
  return (
    <div className='container-fluid m-0 p-0 h-100 main app'>
      <BrowserRouter>
        <NavBarTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={Prod} />
          <Route exact path="/wishlist" component={WishList} />
          <Route exact path="/fav" component={Favourits} />
          <Route exact path="/login" component={logIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;