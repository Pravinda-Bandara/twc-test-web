import {useState, FormEvent, useContext, useEffect} from 'react';
import Logo from "../component/Logo.tsx";
import { Store } from "../Store.tsx";
import {Gender, useSignupMutation} from "../hooks/contactHooks.ts";
import {useNavigate} from "react-router-dom";

export function NewContentPage() {
    const navigate = useNavigate()
    const redirect ='/login'
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');

    const { state, dispatch } = useContext(Store);
    const userID: string|undefined = state.userInfo;
    const signupMutation = useSignupMutation();

    const handleAddContent = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const newUser = await signupMutation.mutateAsync({
                user: userID!,
                name: fullName,
                number: phoneNumber,
                email: email,
                gender: gender as Gender
            });
        } catch (error) {
            console.error('Error adding new user:', error);
        }
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setGender('');
    };
    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' })
        localStorage.removeItem('userInfo')
        navigate(redirect)
    };
    useEffect(() => {
        if (state.userInfo === null ) {
            navigate(redirect);
        }
    }, [state.userInfo, navigate]);

    return (
        <>
            <div className="flex justify-evenly items-center h-screen">
                <div>
                    <Logo textColor="text-black-500" />
                    <h1 className="text-3xl font-bold py-10">New Content</h1>
                    <form onSubmit={handleAddContent} className="grid grid-cols-2 gap-4 items-center">
                        <div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="full name"
                                required
                                className="border-black border-2 rounded-3xl h-10 p-5 my-2"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e-mail"
                                required
                                className="border-black border-2 rounded-3xl h-10 p-5 my-2"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="phone number"
                                required
                                className="border-black border-2 rounded-3xl h-10 p-5 my-2"
                            />
                        </div>
                        <div className="flex justify-between">
                            <label>Gender:</label>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={() => setGender('male')}
                                    required
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={() => setGender('female')}
                                    required
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                        <button type="submit" >
                            add contact
                        </button>
                    </form>
                    <button className="underline float-end" type="button" onClick={() => handleLogOut()}> LogOut
                    </button>
                </div>
            </div>
        </>
    );
}
