import './App.css'
import {Outlet} from "react-router-dom";
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <ToastContainer />
                <Outlet/>
        </>
    );
}


export default App
