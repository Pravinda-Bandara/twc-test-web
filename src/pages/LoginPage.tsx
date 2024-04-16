import { FormEvent, useState } from 'react';
import Logo from "../component/Logo.tsx";
import {useLoginMutation} from "../hooks/userHooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ApiError, getError} from "../utils/ErrorUtil.ts";


export function LoginPage() {
    const navigate = useNavigate()
    const { mutateAsync: login ,isPending} = useLoginMutation();
    const [userName, setuserName] = useState('');
    const [userPassword, setuserPassword] = useState('');

    const handleLogin =async (event: FormEvent) => {
        event.preventDefault();
        try {
            const data = await login({
                userName,
                userPassword,
            })
        console.log(data.userId);
            navigate('/contacts')
            /*localStorage.setItem('userInfo', JSON.stringify(data))*/


        } catch (err) {
            toast.error(getError(err as ApiError),{
                autoClose:1000
            })
        }
    };

    return (
        <div className="flex justify-evenly items-center h-screen">
            <div >
                <h1 className="text-3xl font-bold">Hi there,</h1>
                <p>Welcome to our contacts portal</p>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            placeholder="e-mail"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={userPassword}
                            onChange={(e) => setuserPassword(e.target.value)}
                            placeholder="password"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>


                    <button type="submit" disabled={isPending}>Login</button>
                    <span> or </span>
                    <button className="underline" type="button">Click here to Register</button>


                </form>
            </div>
            <div className="flex items-center">
                <Logo textColor="text-black-500"/>
            </div>
        </div>
    );
}
