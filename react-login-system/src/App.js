import "./App.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Cart from "./components/Cart";
import HomePage from "./components/Home";
import Login from "./components/Login";
import Layout from "./layout";
import { AuthorizeUser } from "./middleware/auth";
import Product from "./components/Product";
import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <AuthorizeUser>
              <HomePage />
            </AuthorizeUser>
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
]);

function App() {
  return (
    <AnimatePresence>
      <div className="mainContainer">
        <RouterProvider router={router} />
      </div>
    </AnimatePresence>
  );
}

export default App;
