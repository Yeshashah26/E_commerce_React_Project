import Dashboard from "../src/common/dashboard"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from './auth/login'
import Registration from './auth/registration'
import App from "./App"
import {Cart} from "./components/cart"
import Profile from "./components/profile"
import {Products} from './product/products'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
            {   index:true, 
                element:<Login />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/registration",
                element: <Registration />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    }
])


const Index = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Index;