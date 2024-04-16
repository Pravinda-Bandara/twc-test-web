import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {NewContentPage} from "./pages/NewContentPage.tsx";
import {ContactListPage} from "./pages/ContentListPage.tsx";
import {WelcomePage} from "./pages/WelcomePage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StoreProvider} from "./Store.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="addcontact" element={<NewContentPage/>}/>
            <Route path="contacts" element={<ContactListPage/>}/>
            <Route path="welcome" element={<WelcomePage/>}/>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StoreProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
        </StoreProvider>
    </React.StrictMode>,
)

