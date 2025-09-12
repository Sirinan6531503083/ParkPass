import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Collect from './components/Collect.jsx';
import Scan from './components/Scan.jsx';
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Diary from './components/Diary.jsx';
import Mission from './components/Mission.jsx';
import ParksInfo from './components/ParksInfo.jsx';
import Home from './components/Home.jsx';
import protectedRouter from './auth/protectedRouter.jsx';
import Profile from './components/Profile.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/collect",
    element: <Collect />,
  },
  {
    path: "/scan",
    element: <Scan />,
  },
  {
    path: "/Mission",
    element: <Mission />,
  },
  {
    path: "/parks-info",
    element: <ParksInfo />,
  },
  {
    path: "/Diary",
    element: <Diary />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
  element: (
    <protectedRouter>
      <Home />
    </protectedRouter>
    ),
},
{
  path: "/profile",
  element: (
    <protectedRouter>
      <Profile />
    </protectedRouter>
  ),
},
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </StrictMode>
);
