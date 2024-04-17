
import Logo from "../component/Logo.tsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Store} from "../Store.tsx";

export function WelcomePage() {
    const navigate = useNavigate()
    const redirect ='/login'
    const addNewContact='/addcontact'
    const {dispatch,state } = useContext(Store);
    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' })
        localStorage.removeItem('userInfo')
        navigate(redirect)
    };
    useEffect(() => {
        if (state.userInfo === null ) {
            navigate(redirect);
        }
    }, [state.userInfo, navigate,]);
    return (
        <div className="flex justify-evenly items-center h-screen flex-col">
            <div>
                <Logo textColor="text-white" imageSize="w-10" textSize="text-3xl" />
                <h1 className="font-bold text-4xl my-5 my-10 text-white mb-5 mt-14">Welcome</h1>
                <p className="text-white text-3xl">This is where your contacts will live. Click the button below to add
                    a new contact.</p>
                <button onClick={()=>navigate(addNewContact)} type="button" className="custom-button">Add First Contact
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
