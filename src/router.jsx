import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from "./pages/Login";

import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard";

import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import TrashStuff from "./pages/Stuff/TrashStuff";

import User from "./pages/User/Index";
import UserCreate from "./pages/User/Create";
import UserEdit from "./pages/User/Edit";
import TrashUser from "./pages/User/TrashUser";

import Lending from "./pages/Lending/Index";
import LendingCreate from "./pages/Lending/Create";

import Inbound from "./pages/Inbound/Index";
import InboundCreate from "./pages/Inbound/Create";
import LendingReturn from "./pages/Lending/Restoration";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },

    { path: '/login', element: <Login /> },

    { path: '/profile', element: <Profile /> },

    { path: '/dashboard', element: <Dashboard /> },

    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/stuff/trash', element: <TrashStuff />},

    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/edit/:id', element: <UserEdit /> },
    { path: '/user/trash', element: <TrashUser />},

    { path: '/lending', element: <Lending />},
    { path: '/lending/create', element: <LendingCreate />},
    { path: '/lending/restoration/:id', element: <LendingReturn />},

    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate /> },

])