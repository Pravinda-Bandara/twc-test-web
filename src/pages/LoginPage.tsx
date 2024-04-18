import {FormEvent, useContext, useEffect, useState} from 'react';
import Logo from "../component/Logo.tsx";
import {useLoginMutation} from "../hooks/userHooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ApiError, getError} from "../utils/ErrorUtil.ts";
import {Store} from "../Store.tsx";
import {LoginValidationUtil} from "../utils/LoginValidationUtil.ts";


export function LoginPage() {
    const navigate = useNavigate()
    const redirect ='/contacts'
    const { mutateAsync: login ,isPending} = useLoginMutation();
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');



    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    const handleLogin =async (event: FormEvent) => {
        event.preventDefault();
        if (!LoginValidationUtil(userName, userPassword)) {
            return;
        }
        try {
            const data = await login({
                userName,
                userPassword,
            })
            navigate('/contacts')
            dispatch({ type: 'USER_SIGNIN', payload: data.userId })
            localStorage.setItem('userInfo', JSON.stringify(data.userId))
        } catch (err) {
            toast.error(getError(err as ApiError),{
                autoClose:1000
            })
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo])

    return (
        <div className="flex justify-evenly items-center h-screen bg-fixed-cover-2">
            <div className="p-10">
                <h1 className="text-5xl font-bold text-white mb-4">Hi there,</h1>
                <p className="text-white text-2xl mb-10">Welcome to our <br/> contacts portal</p>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="e-mail"
                            className="custom-input"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="password"
                            className="custom-input"
                        />
                    </div>


                    <button type="submit" disabled={isPending} className="custom-button w-1/4">Login</button>
                    <span className="text-white mx-5"> or </span>
                    <button className="underline text-white text-lg mr-7" type="button" onClick={()=>navigate("/register")}>Click here to Register</button>


                </form>
            </div>
            <div className="flex items-center">
                <Logo textColor="text-black" imageSize="w-20" textSize="text-5xl" />
            </div>
        </div>
    );
}
