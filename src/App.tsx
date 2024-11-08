import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import "./index.css"
import useUserStore from './store/userStore';
//pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from './pages/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Header from './components/Header';

const ProtectedRoute = () => {
  const authenticate = useUserStore((state) => state.isAuthenticated)
  return authenticate ? <Home /> : <Navigate to="/" replace />
}

const AuthRoute = ({ element }: { element: JSX.Element }) => {
  const authenticate = useUserStore((state) => state.isAuthenticated)
  return !authenticate ? element : <Navigate to="/home" replace />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<AuthRoute element={<Login />} />} />
      <Route path='register' element={<AuthRoute element={<Register />} />} />
      <Route path="home" element={<ProtectedRoute />} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App