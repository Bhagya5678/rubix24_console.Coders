import Navbar from "./components/Navbar"
import './App.css';
import SignUp from "./pages/Signup";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from 'react-router-dom'
import { AppProvider } from "./Context";
import ProductFullscreen from '../src/Fullscreen/ProductFullscreen';
import Cards from "./components/Cards";
import TransportationList from "./category/Transportation";
// import Restaurant from "./category/RestaurantList"
import RestaurantList from "./category/RestaurantList";
import RestaurantFullScreen from "./Fullscreen/RestaurantCard";
import PasswordGenerator from "./components/Searchbar";
import Footer from "./components/Footer";
import AccomodationList from "./category/AccomodationList";
import AccomodationCard from "./Fullscreen/AccomodationCard";
import ShoppingList from "./category/ShoppingList";
import ShoppingCard from "./Fullscreen/ShoppingCard";
import TouristList from "./category/TouristList";
import Searchbar from "./components/Searchbar";
import Sos from "./components/SOS";
import Vendor from "./pages/Vendor";
import DatePicker from "./components/DatePicker";
import Vendorcreatetransport from "./pages/vendorcreatetransport";
import RestaurantForm from "./pages/vendorcreaterstaurant";
function App() {
  
  return (
    <div>
      <React.StrictMode>
      <Router>
      <Navbar />  
    
    
          <Routes>
            
        <Route exact path="/" element={<PasswordGenerator/>}/>
        <Route exact path="/sos" element={<Sos/>}/>
        <Route exact path="/login" element={<SignUp isSignedinvar={false} />}/>
        <Route exact path="/searchbar" element={<Searchbar/>}/>
        <Route exact path="/category" element={<Cards/>}/>
        <Route exact path="/category/transportation" element={<TransportationList/>}/>
        <Route exact path="/category/transportation/:id" element={<ProductFullscreen/>}/>
        <Route exact path="/category/restaurant" element={<RestaurantList/>}/>
        <Route exact path="/category/restaurant/:id" element={<RestaurantFullScreen/>}/>
        <Route exact path="/category/accomodation" element={<AccomodationList/>}/>
        <Route exact path="/category/accomodation/:id" element={<AccomodationCard />}/>
        <Route exact path="/category/Shopping" element={<ShoppingList/>}/>
        <Route exact path="/category/Shopping/:id" element={<ShoppingCard />}/>
        <Route exact path="/category/Tourist" element={<TouristList/>}/>
        <Route exact path="/category/Tourist/:id" element={<ShoppingCard />}/>

        <Route exact path="/vendor/:vendorId" element={<Vendor/>}/>
        <Route exact path="/vendorcreatetransport/:vendorId" element={<Vendorcreatetransport/>}/>
        <Route exact path="/vendorcreaterestaurant/:vendorId" element={<RestaurantForm/>}/>
      </Routes>
    </Router>
    </React.StrictMode> 
    <Footer/>
  </div>
  );
}

export default App;
