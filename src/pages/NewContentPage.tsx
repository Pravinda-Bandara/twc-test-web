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
            await signupMutation.mutateAsync({
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
            <div className="flex justify-evenly items-center h-screen flex-col">
                <div>
                    <Logo textColor="text-white"/>

                    <h1 className="text-4xl text-white font-bold py-10">New Content</h1>
                    <form onSubmit={handleAddContent} className="grid grid-cols-2 gap-4 items-center">
                        <div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="full name"
                                required
                                className="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-96 placeholder-customBlue"

                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e-mail"
                                required
                                className="rounded-3xl h-10 py-6 px-8 my-2  text-customBlue w-96 placeholder-customBlue"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="phone number"
                                required
                                className="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-96 placeholder-customBlue"
                            />
                        </div>
                        <div className="flex justify-between">
                            <label className="text-white">Gender:</label>
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
                                <label htmlFor="male" className="text-white px-2">Male</label>
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
                                <label htmlFor="female" className="text-white px-2">Female</label>
                            </div>
                        </div>
                        <button type="submit"
                                className="px-6 w-3/5 my-10 py-2 rounded bg-customBlue text-white border
                                rounded-2xl border-white hover:bg-white hover:text-customBlue hover:border-customBlue"
                        >
                            Add Contact
                        </button>
                    </form>
                </div>
                <div className="self-end">
                    <button className="underline float-end text-white mx-5 text-xl" type="button"
                            onClick={() => handleLogOut()}> LogOut
                    </button>
                    <button className="underline float-end text-white text-xl" type="button"
                            onClick={() => navigate("/contacts")}> Show My Contact
                    </button>
                </div>

            </div>
        </>
    );
}
