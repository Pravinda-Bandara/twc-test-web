import  { FormEvent, useContext, useEffect, useState } from 'react';
import Logo from '../component/Logo.tsx';
import { Store } from '../Store.tsx';
import { toast } from 'react-toastify';
import { ApiError, getError } from '../utils/ErrorUtil.ts';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../hooks/userHooks.ts';
import { UserValidationUtil } from '../utils/UserValidationUtil.ts';
import InputFieldComponent from "../component/InputFieldComponent.tsx";

export function RegisterPage() {
    const [userName, setuserName] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();
    const redirect = '/contacts';
    const { mutateAsync: register, isPending } = useRegisterMutation();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        if (!UserValidationUtil(userName, userPassword)) {
            return;
        }
        if (userPassword !== confirmPassword) {
            toast.error('Passwords do not match.', {
                autoClose: 1000
            });
            return;
        }

        try {
            const data = await register({
                userName,
                userPassword
            });
            navigate('/welcome');
            dispatch({ type: 'USER_SIGNIN', payload: data.userId });
            localStorage.setItem('userInfo', JSON.stringify(data.userId));
        } catch (err) {
            toast.error(getError(err as ApiError), {
                autoClose: 1000
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo]);

    return (
        <>
            <div className="flex justify-evenly items-center h-screen bg-fixed-cover-2">
                <div className="p-10">
                    <h1 className="font-bold text-5xl my-5 my-10 text-white">Register Now!</h1>
                    <form onSubmit={handleRegister}>
                        <div>
                            <InputFieldComponent // Changed from InputField to InputFieldComponent
                                type="text"
                                placeholder="e-mail"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <InputFieldComponent // Changed from InputField to InputFieldComponent
                                type="password"
                                placeholder="create password"
                                value={userPassword}
                                onChange={(e) => setuserPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <InputFieldComponent // Changed from InputField to InputFieldComponent
                                type="password"
                                placeholder="confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button type="submit" disabled={isPending} className="custom-button w-2/5">
                                Register
                            </button>
                        </div>
                    </form>

                    <div>
                        <button className="underline text-white text-lg" type="button" onClick={() => navigate('/login')}>
                            &lt; Back To Login
                        </button>
                    </div>
                </div>

                <div className="flex items-center">
                    <Logo textColor="text-black" imageSize="w-20" textSize="text-5xl" />
                </div>
            </div>
        </>
    );
}
