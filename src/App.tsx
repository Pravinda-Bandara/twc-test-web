import './App.css'
import {Outlet} from "react-router-dom";
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function App() {
    return (
        <div className="bg-customBlue">
            <ToastContainer />
            <main className="container mx-auto px-12">
                <Outlet/>
            </main>
        </div>
    );
}


export default App
