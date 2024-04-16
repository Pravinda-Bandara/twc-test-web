import {FormEvent, useContext, useEffect, useState} from 'react';
import Logo from "../component/Logo.tsx";
import {Store} from "../Store.tsx";
import {toast} from "react-toastify";
import {ApiError, getError} from "../utils/ErrorUtil.ts";
import {useNavigate} from "react-router-dom";
import { useRegisterMutation} from "../hooks/userHooks.ts";

export function RegisterPage() {
    const [userName, setuserName] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state
    const navigate = useNavigate()
    const redirect ='/contacts'
    const { mutateAsync: register ,isPending} = useRegisterMutation();


    const handleRegister =async (event: FormEvent) => {
        event.preventDefault();
        try {
            const data = await register({
                userName,
                userPassword,
            })
            navigate('/welcome')
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
        <>
            <div className="flex justify-evenly items-center h-screen">

                    <div>
                        <h1 className="font-bold text-3xl my-5">Register Now!</h1>
                        <form onSubmit={handleRegister}>
                            <div>
                                <input
                                    type="email"
                                    placeholder="e-mail"
                                    value={userName}
                                    onChange={(e) => setuserName(e.target.value)}
                                    required
                                    className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="create password"
                                    value={userPassword}
                                    onChange={(e) => setuserPassword(e.target.value)}
                                    required
                                    className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                                />
                            </div>

                            <div>
                                <button type="submit" disabled={isPending}>Register</button>
                            </div>
                        </form>

                        <div>
                            <button className="underline" type="button" onClick={()=>navigate("/login")}>&lt; Back To Login
                            </button>
                        </div>
                    </div>


                <div className="flex items-center">
                    <Logo textColor="text-black-500"/>
                </div>
            </div>

        </>
    );
}
