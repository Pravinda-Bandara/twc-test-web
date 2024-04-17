import {FormEvent, useContext, useEffect, useState} from 'react';
import Logo from "../component/Logo.tsx";
import {useLoginMutation} from "../hooks/userHooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ApiError, getError} from "../utils/ErrorUtil.ts";
import {Store} from "../Store.tsx";


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
        <div className="flex justify-evenly items-center h-screen">
            <div >
                <h1 className="text-5xl font-bold text-white mb-4">Hi there,</h1>
                <p className="text-white text-2xl mb-10">Welcome to our <br/> contacts portal</p>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="e-mail"
                            required
                            className="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-96 placeholder-customBlue"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="password"
                            required
                            className="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-96 placeholder-customBlue"
                        />
                    </div>


                    <button type="submit" disabled={isPending} className="px-6 w-1/4 my-10 py-2 rounded bg-customBlue text-white border
                                rounded-2xl border-white hover:bg-white hover:text-customBlue hover:border-customBlue">Login</button>
                    <span className="text-white mx-5"> or </span>
                    <button className="underline text-white text-lg" type="button" onClick={()=>navigate("/register")}>Click here to Register</button>


                </form>
            </div>
            <div className="flex items-center">
                <Logo textColor="text-white"/>
            </div>
        </div>
    );
}
