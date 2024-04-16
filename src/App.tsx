import './App.css'
import {Outlet} from "react-router-dom";
import './index.css'





function App() {


    return (
        <>
            {/*<ButtonOne isBlack={true} text="Add new content" />
        <ButtonOne isBlack={false} text="Add new content" />*/}

            <main className="container mx-auto px-12">
                <Outlet/>
            </main>
        </>
    )
}

export default App
