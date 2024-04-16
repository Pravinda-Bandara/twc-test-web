import { FormEvent, useState } from 'react';
import Logo from "../component/Logo.tsx";
import ButtonOne from "../component/ButtonOne.tsx";

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e-mail"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>


                    <ButtonOne isBlack={true} text="login "/>
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
