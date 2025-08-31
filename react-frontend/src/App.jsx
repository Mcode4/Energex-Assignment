import {  useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

import LoginPage from './componenets/Login/LoginPage';
import SignupPage from './componenets/Login/SignupPage';

function Layout() {
  const [ cookies ] = useCookies(['user']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cookies.user) {
      if (location.pathname === '/') {
        navigate('/home');
      }
    } else {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [cookies.user, location.pathname, navigate]);

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <h1>Welcome</h1>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/home',
        element: 'home page with posts'
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
