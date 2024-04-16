import {FormEvent, useState} from 'react';
import Logo from "../component/Logo.tsx";
import ButtonOne from "../component/ButtonOne.tsx";

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (event: FormEvent) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    const handleBackToLogin = () => {
        console.log('Navigate back to login page');
    };

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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


                        </form>
                        <div>
                            <ButtonOne isBlack={true} text="register"/>
                        </div>
                        <div>
                            <button className="underline" type="button" onClick={handleBackToLogin}>&lt; Back To Login
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
