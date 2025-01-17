import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store"
import Homepage from "./pages/Homepage"
import Login from './pages/Login';
import Order from './pages/Order';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductDetail from './pages/ProductDetail';
import Purchase from './pages/Purchase';
import HistoryOrder from './pages/HistoryOrder';
import Register from './pages/Register';
import Shop from "./pages/Shop"
import Sandbox from './pages/Sandbox';
import Carts from './pages/Carts/Carts';
import CartCheckout from './pages/CartCheckout/CartCheckout';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/product/:id",
    element : <ProductDetail/>
  },
  {
    path : "/order/:productId",
    element : <Order/>
  }, 
  {
    path : "/purchase/:id",
    element : <Purchase />
  },
  {
    path: "/orders",
    element : <HistoryOrder />
  },
  {
    path : "/register",
    element : <Register />
  },
  {
    path: "/shop",
    element : <Shop/>
  },
   {
    path: "/sandbox",
    element : <Sandbox />
   },
   {
    path: "/cart",
    element : <Carts/>
   },
   {
    path : "/cart/checkout",
    element : <CartCheckout />
   }
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <UserProvider>
      <CartProvider>
      <Provider store={store}>
        <RouterProvider router={router}>
      </RouterProvider>
      </Provider>
      </CartProvider>
      </UserProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
