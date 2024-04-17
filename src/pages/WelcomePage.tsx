
import Logo from "../component/Logo.tsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Store} from "../Store.tsx";

export function WelcomePage() {
    const navigate = useNavigate()
    const redirect ='/login'
    const addNewContact='/addcontact'
    const {dispatch } = useContext(Store);
    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' })
        localStorage.removeItem('userInfo')
        navigate(redirect)
    };
    return (
        <div className="flex justify-evenly items-center h-screen flex-col">
            <div>
                <Logo textColor="text-white"/>
                <h1 className="font-bold text-4xl my-5 my-10 text-white mb-5 mt-14">Welcome</h1>
                <p className="text-white text-3xl">This is where your contacts will live. Click the button below to add
                    a new contact.</p>
                <button onClick={()=>navigate(addNewContact)} type="button" className="px-6 w-1/4 my-10 py-2 rounded bg-customBlue text-white border
                                rounded-2xl border-white hover:bg-white hover:text-customBlue hover:border-customBlue">Add First Contact
                </button>
            </div>
            <div className="self-end">
                <button className="underline float-end text-white mx-5 text-xl" type="button"
                        onClick={() => handleLogOut()}> LogOut
                </button>
            </div>

        </div>
    );
}
