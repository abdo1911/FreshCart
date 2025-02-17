import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast';
import BrandDetails from './components/BrandDetails/BrandDetails'
import AllOrders from './components/AllOrders/AllOrders'
import CheackOut from './components/CheackOut/CheackOut'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import ResetPage from './components/ResetPage/ResetPage'



function App() {

  const queryClient = new QueryClient()


  let routes = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
      { path: "products", element: <ProtectedRoutes> <Products /></ProtectedRoutes> },
      { path: "categories", element: <ProtectedRoutes> <Categories /> </ProtectedRoutes> },
      { path: "brands", element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
      { path: "login", element: <ProtectedAuth> <Login /> </ProtectedAuth> },
      { path: "register", element: <ProtectedAuth> <Register /> </ProtectedAuth> },
      { path: "cart", element: <ProtectedRoutes>  <Cart /> </ProtectedRoutes> },
      { path: "ProductDetails/:id/:category", element: <ProtectedRoutes>  <ProductDetails /> </ProtectedRoutes> },
      { path: "BrandDetails/:id/", element: <ProtectedRoutes>  <BrandDetails /> </ProtectedRoutes> },
      { path: "CategoriesDetails/:id/", element: <ProtectedRoutes>  <CategoriesDetails /> </ProtectedRoutes> },
      { path: "allorders", element: <ProtectedRoutes>  <AllOrders /> </ProtectedRoutes> },
      { path: "checkout", element: <ProtectedRoutes>  <CheackOut /> </ProtectedRoutes> },
      { path: "forget", element: <ForgetPassword /> },
      { path: "reset", element: <ResetCode /> },
      { path: "resetPage", element: <ResetPage /> },


      { path: "*", element: <NotFound /> },

    ]

  }])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </QueryClientProvider>
    </>
  )
}

export default App
